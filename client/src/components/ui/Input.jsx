import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false, ...props }) => {
    return (
        <div className="mb-4 relative">
            <label className="block text-sm font-medium text-slate-300 mb-1 ml-1">
                {label} {required && <span className="text-brand-danger">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all duration-300"
                {...props}
            />
        </div>
    );
};

export default Input;
