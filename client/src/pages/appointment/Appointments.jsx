import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

export default function Appointments() {
  return (
    <>
    <div className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
           <FaCalendarAlt size={18} />
            <h1 className='text-2xl font-bold'>Appointments</h1>
            
          </div>
    </>
  )
}
