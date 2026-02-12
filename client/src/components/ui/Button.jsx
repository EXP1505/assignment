import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex justify-center items-center";

    const variants = {
        primary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/50",
        secondary: "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600",
        danger: "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-red-500/50",
        ghost: "bg-transparent hover:bg-white/10 text-white border border-transparent hover:border-white/20",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
