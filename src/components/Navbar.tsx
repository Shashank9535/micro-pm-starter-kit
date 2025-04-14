
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-micropm-soft-gray py-4 px-6 md:px-10 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-micropm-purple flex items-center justify-center">
            <span className="text-white font-bold text-lg">μ</span>
          </div>
          <span className="font-playfair font-bold text-xl">MicroPM</span>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 hover:text-micropm-purple"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-micropm-purple">
            Home
          </Link>
          <Link to="/tools" className="text-gray-700 hover:text-micropm-purple">
            Tools
          </Link>
          <Link to="/pricing" className="text-gray-700 hover:text-micropm-purple">
            Pricing
          </Link>
          <Button className="micropm-btn">Get Started</Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-micropm-soft-gray shadow-lg md:hidden animate-fade-in">
            <div className="flex flex-col space-y-4 p-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-micropm-purple py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tools" 
                className="text-gray-700 hover:text-micropm-purple py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tools
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-micropm-purple py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Button className="micropm-btn w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
