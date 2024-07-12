import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" bg-[#2C3E50]">
      <header className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex w-full mx-4 border-b-2 lg:border-b-0 justify-between items-center p-4 lg:p-0">
          <h1 className="flex text-xl lg:text-2xl text-[#ECF0F1] lg:ml-8">Crop Predict</h1>
          <ul className="lg:hidden flex flex-col justify-center items-stretch space-y-1" onClick={toggleNavbar}>
            <li className="bg-[#ECF0F1] h-1 w-8 rounded-xl"></li>
            <li className="bg-[#ECF0F1] h-1 w-8 rounded-xl"></li>
            <li className="bg-[#ECF0F1] h-1 w-8 rounded-xl"></li>
          </ul>
        </div>

        <nav className={isOpen ? 'visible' : 'hidden lg:block'}>
          <ul className="flex flex-col p-4 space-y-4 lg:space-y-0 items-center lg:flex-row lg:space-x-4 lg:p-5 lg:mr-8">
            <li>
              <Link className="p-4 text-[#ECF0F1] hover:text-[#3498DB] hover:bg-white hover:p-2 hover:rounded-lg" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="p-4 text-[#ECF0F1] hover:text-[#3498DB]  hover:bg-white hover:p-2 hover:rounded-lg" to="/predict">
                Predict
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
