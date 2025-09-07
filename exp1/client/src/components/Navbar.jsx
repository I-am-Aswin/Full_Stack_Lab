import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="w-full  px-8 py-3 pt-4 text-md flex items-center justify-center gap-8">
            <ul className="flex items-center justify-evenly w-[45%]">
                <li><Link to="#" className="inline-block transform hover:scale-125 hover:font-semibold transition duration-150">About</Link></li>
                <li><Link to="#" className="inline-block transform hover:scale-125 hover:font-semibold transition duration-150">Skills</Link></li>
                <li><Link to="#" className="inline-block transform hover:scale-125 hover:font-semibold transition duration-150">Projects</Link></li>
                <li><Link to="#" className="inline-block transform hover:scale-125 hover:font-semibold transition duration-150">Contact</Link></li>
            </ul>
        </div>
     );
}
 
export default Navbar;