import React from 'react'

const Input = ({ value, name, type="text", onChange, label, className }) => {
  return (
    <div className={`w-full ${className}`} >
      <div className="mt-1 border-b w-full focus-within:border-slate-400">
        <input
          type={type}
          name={name}
          className="block w-full border-0 border-b border-black bg-slate-50 focus:border-slate-400 focus:ring-0 sm:text-sm p-2"
          onChange={onChange}
          value={value}
        />
      </div>
      <label htmlFor={name} className="block font-medium">
        {label}
      </label>
    </div>
  );
};

export default Input