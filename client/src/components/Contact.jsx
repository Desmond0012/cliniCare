import { NavLink } from "react-router";

export default function Contact() {
  return (
    <NavLink to="/Contact_Us" className={({isActive}) => 
        isActive ? "text-blue-500" : "text-black"
    }>
        Contact Us
    </NavLink>
  )
}
