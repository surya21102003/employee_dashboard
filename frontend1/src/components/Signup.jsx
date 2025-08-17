import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import back from "../images/back1.png";
import left from "../images/leftside.png";
import right from "../images/rightside.png";
import logo from "../images/logo.pg.png";

import google from "../images/google.png";
import facebook from "../images/face.png";
export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      alert("Signup success. Please login");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };
  
  const handleGoogleLogin = () => {
    window.location.href = 'https://employee-dashboard-1-7v32.onrender.com/api/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'https://employee-dashboard-1-7v32.onrender.com/api/auth/facebook';
  };


  return (
    <div className="flex items-center justify-center w-500 h-200  bg-softBg" style={{ backgroundImage: `url(${back})`,backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="bg-white rounded-xl shadow-lg w-200 h-130 flex overflow-hidden ">
        <div className="w-1/2 p-10">
          <div className="flex items-center mb-6">
            <img src={logo} alt="Left Side" className=" h-8 w-8 mr-2" />
            <h4 className="text-3xl  font-bold mb-6">workflow</h4>

          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="flex flex-col gap-3">
            <input name="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-50 h-7 ml-15 border p-3 rounded" />
            <input name="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-50 h-7 ml-15 border p-3 rounded" />
            <input name="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Password" type="password" className="w-50 h-7 ml-15 border p-3 rounded" />
            <select name="role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-50 h-7 ml-15 border p-3 rounded">
              <option>Employee</option>
              <option>Admin</option>
              <option>Intern</option>
            </select>
            </div>
            <div className="flex">
              <img src={left} alt="Right Side" className=" ml-0  mt-5  h-50 w-30" />
              <button className="w-25 h-10 bg-blue-500 mb-2 text-white p-3 rounded">Sign up</button>
            </div>

          </form>

        </div>
        <div className="w-1/2 bg-white  flex flex-col items-center justify-center">
          <div className="mt-23 ">
            <h2 className="text-blue mr-9 mb-3"> already have an account?</h2>
            <Link className="md-20 mt-5" to="/"><button className="rounded-md  ml-5 text-white bg-blue-600"><h3 className="ml-10 mt-2 mb-2 mr-10">login</h3></button></Link>
            <div className="flex items-center mr-8 justify-center mt-4">
              <hr className="flex-grow border-t border-gray-300" />
              <h2 className="mx-4">or</h2>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

          </div>
          <div className="flex gap-4 mr-10">
            
            <button onClick={handleGoogleLogin}><img src={google} alt="Google logo" style={{ height: "50px" }} /></button>
            <button onClick={handleFacebookLogin}><img src={facebook} alt="Facebook logo" style={{ height: "50px" }} /></button>


          </div>
          <div className="flex">
            <button className="mt-4 ml-25 rounded-md w-80 h-10 bg-blue-600 text-white text-sm "><h3 className="ml-10 mt-2 mb-2 mr-10">contact support</h3></button>
            <img src={right} alt="Right Side" className="mt-20 m-5 h-50 w-30 mr-5" />

          </div>
        </div>
      </div>
    </div>
  );
}

