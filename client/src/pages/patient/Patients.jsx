import React from 'react'
import { FaUsers } from 'react-icons/fa'

export default function Patients() {
  return (
    <>
     <li className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
            <FaUsers size={18} />
            <span>Patients</span>
          </li>
    
    </>
  )
}
