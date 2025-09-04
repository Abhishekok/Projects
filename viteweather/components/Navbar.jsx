import React from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-blue-300 text-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <h1 className="text-xl font-bold">Weather App</h1>

        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="hover:text-gray-200 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>


        <button className="md:hidden px-2 py-1 border rounded-lg hover:bg-blue-700">
          ☰
        </button>
      </div>
    </nav>
  );
}
