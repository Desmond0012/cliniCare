import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'

export default function Logout() {
  return (
    <>
{/* className="btn" */}
      <button
        className="flex items-center gap-2 text-red-500 font-semibold "
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        
        <FaSignOutAlt /> Logout
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className=" flex gap-4">
            <button className="btn">Cancel</button>
            <button className="btn">Logout</button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>


    </>
  )
}
