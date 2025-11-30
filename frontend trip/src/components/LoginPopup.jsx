import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {

  const { setUser } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currState === "Login") {
      // LOGIN API REQUEST တောင်း
      try {
        const res = await axios.post("http://localhost:8000/api/login/", {
          username: username,
          password: password,
        });

        setUser({
          username: res.data.username,
          email: res.data.email,
        });

        alert(res.data.message);
        // setUser(res.data);
        setShowLogin(false);

      } catch (err) {
        console.log(err.response?.data);
        alert(err.response?.data?.error || "Login failed");
      }
    }

    if (currState === "Sign Up") {
      if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await axios.post("http://localhost:8000/api/register/", {
          username: username,
          email: email,
          password: password,
          password_confirm: passwordConfirm,
        });

        alert(res.data.message);
        setCurrState("Login"); // login သို့ ချိန်း

      } catch (err) {
        console.log("Register error:", err.response?.data);
        alert(err.response?.data?.error || "Registration failed");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center animate-fadeIn">
      <form onSubmit={handleSubmit} className="bg-white w-[min(90%,400px)] rounded-lg p-6 flex flex-col gap-6 shadow-lg text-gray-600 text-[14px]">
        {/* Title */}
        <div className="flex items-center justify-between text-black">
          <h2 className="text-2xl font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
            className="w-4 h-4 cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          
            <input
              type="text"
              placeholder={currState === "Sign Up" ? "Your Name" : "Username"}
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
            />
          {currState === "Sign Up" && (
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
          />
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
          />
          {currState === "Sign Up" && (
          <input
            type="password"
            placeholder="Confrimed Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
          />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[tomato] text-white py-2 rounded-md text-[15px] hover:opacity-90 transition cursor-pointer"
        >
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-1 accent-[tomato]" />
          <p className="text-[13px] leading-tight">
            By continuing, I agree to the{" "}
            <span className="text-[tomato] cursor-pointer font-medium">
              terms of use
            </span>{" "}
            &{" "}
            <span className="text-[tomato] cursor-pointer font-medium">
              privacy policy
            </span>
            .
          </p>
        </div>

        {/* Switch Login / Sign Up */}
        {currState === "Login" ? (
          <p className="text-center text-[14px]">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-[tomato] font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center text-[14px]">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-[tomato] font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
