import React from 'react'

const Form = ({ label , placeholder}) => {
  return (
    <div className='flex flex-col gap-2 '>
      <label className='' htmlFor={label}>{label}</label>

      <input className="!px-1 !py-1  border-b-2 !border-gray-300 flex-1 min-w-0 bg-transparent outline-none text-white placeholder-white/50 text-sm" 
      type="text" 
      name={label} 
      id={label} 
      placeholder={placeholder} 
      required/>
    </div>
  )
}

export default Form
