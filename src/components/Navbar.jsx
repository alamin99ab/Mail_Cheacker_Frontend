import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900/90 backdrop-blur-md border-b border-gray-700 fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-green-400 flex items-center gap-2">
            <span>AI Guard</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-2 py-1 transition duration-200 ${
                  isActive ? "text-green-400 font-bold" : "text-white hover:text-green-300"
                }`
              }
            >
              Home
              {({ isActive }) =>
                isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 rounded"></span>
                )
              }
            </NavLink>
            <NavLink
              to="/analyzer"
              className={({ isActive }) =>
                `relative px-2 py-1 transition duration-200 ${
                  isActive ? "text-green-400 font-bold" : "text-white hover:text-green-300"
                }`
              }
            >
              Email Analyzer
              {({ isActive }) =>
                isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 rounded"></span>
                )
              }
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "block text-green-400 font-bold" : "block text-white hover:text-green-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/analyzer"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "block text-green-400 font-bold" : "block text-white hover:text-green-300"
            }
          >
            Email Analyzer
          </NavLink>
        </div>
      )}
    </nav>
  );
}
