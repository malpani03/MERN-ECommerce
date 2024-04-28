import Logo from "./Logo";
import SearchBox from "./SearchBox";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="h-20 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo/>
          </Link>
        </div>
        <SearchBox />
        <div className="flex items-center gap-7">
          <div className="text-2xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <div className="text:3xl relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600  text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
