


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API, { setAuthToken } from "../services/api";
import google from "../images/google.png";
import facebook from "../images/face.png";
import back from "../images/back1.png";
import left from "../images/leftside.png";
import right from "../images/rightside.png";
import logo from "../images/logo.pg.png";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = 'https://employee-dashboard-1-7v32.onrender.com/api/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = 'https://employee-dashboard-1-7v32.onrender.com/api/auth/facebook';
  };


  return (
    
    <div className=" flex items-center bg-rose justify-center w-500 h-200  bg-softBg   " style={{ backgroundImage: `url(${back})`, backgroundSize: 'cover',backgroundRepeat: "no-repeat",}}>
      <div className="bg-white rounded-xl shadow-lg w-200 h-130  flex overflow-hidden " >
        <div className="w-1/2 p-10">
          <div className="flex items-center top-0 mb-6">
            <img src={logo} alt="Logo" className="w-15 h-15 mb-4 mr-2" />

            <h2 className="text-3xl font-bold mb-6">workflow</h2>
          </div >

          <form onSubmit={login} className="space-y-4">
            <div className="flex flex-col gap-3">
            <input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-50 ml-20 h-7 border p-3 rounded" />
            <input name="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-50 ml-20 h-7 border p-3 rounded" />
           </div>
            <div className="flex-col items-center  justify-between">
              <div className="item-center"><input className="ml-25" type="checkbox" id="remember" /><label htmlFor="remember" className="ml-2 text-sm"> Remember</label></div>
              <button className="w-50 h-11 mt-4 ml-20 bg-blue-500 text-white p-3 rounded">Login</button><br></br>
              <a className="text-sm ml-30 text-blue-600">Forgot Password?</a>
              <img src={left} alt="Left Side" className=" h-50 w-20" />
            </div>


          </form>
        </div>

      

        <div className="w-1/2  mt-28 p-10 flex flex-col items-center justify-center">
          <Link to="/signup"><button className="rounded-md   text-white bg-blue-600"><h3 className="ml-10 mt-2 mb-2 mr-10">Sign Up</h3></button></Link>
          <div className="flex items-center  justify-center mt-4">
            <hr className="flex-grow border-t border-gray-300" />
            <h2 className="mx-4">or</h2>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <h3 className="text-lg font-semibold mt-2 mb-4">connect with</h3>

          <div className="flex-col gap-4">
            <div className="flex gap-4 ml-25">
              <button onClick={handleGoogleLogin}><img src={google} alt="Google logo" style={{ height: "50px" }} /></button>
              <button onClick={handleFacebookLogin}><img src={facebook} alt="Facebook logo" style={{ height: "50px" }} /></button>

            </div>
            <img src={right} alt="Right Side" className="mt-5 ml-60 h-50 w-30" />

          </div>

        </div>
      </div>
    </div>
    
  );
}


