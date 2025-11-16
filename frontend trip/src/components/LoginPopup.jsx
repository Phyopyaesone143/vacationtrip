import React, { useState } from "react";
import { assets } from "../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 grid place-items-center animate-fadeIn">
      <form className="bg-white w-[min(90%,400px)] rounded-lg p-6 flex flex-col gap-6 shadow-lg text-gray-600 text-[14px]">
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
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              required
              className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            required
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="border border-gray-300 rounded px-3 py-2 outline-none focus:border-tomato"
          />
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
