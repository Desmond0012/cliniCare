import React from 'react'
import { FaMoneyBillWave } from 'react-icons/fa'

export default function Payment() {
  return (
    <>
    <li className="flex items-center gap-3 p-5 rounded-lg cursor-pointer hover:bg-gray-100">
          <FaMoneyBillWave size={18} />
            <span>Payments</span>        </li>
    </>
  )
}
