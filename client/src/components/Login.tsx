import React from "react";
import { useState } from "react";
import { SoftBackdrop } from "./SoftBackdrop";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const Login = () => {
    const [state, setState] = useState("login");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <>
            <SoftBackdrop />
            <Navbar />
            <div className="min-h-screen flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="w-full sm:w-[400px] text-center bg-white/6 border border-white/10 rounded-2xl px-8 py-8"
                >
                    <h1 className="text-white text-3xl mt-4 font-medium">
                        {state === "login" ? "Login" : "Sign up"}
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                        Please sign in to continue
                    </p>

                    {state !== "login" && (
                        <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
                            />
                        </div>
                    )}

                    <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email id"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
                        />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="bg-transparent text-white placeholder-gray-400 outline-none flex-1"
                        />
                    </div>

                    <div className="text-right mt-4">
                        <a href="#" className="text-green-400 text-sm hover:underline">
                            Forget password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white h-12 rounded-full font-medium transition-colors"
                    >
                        {state === "login" ? "Login" : "Sign up"}
                    </button>

                    <p className="text-gray-400 text-sm mt-6">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setState(state === "login" ? "signup" : "login")}
                            className="text-green-400 hover:underline"
                        >
                            click here
                        </button>
                    </p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;