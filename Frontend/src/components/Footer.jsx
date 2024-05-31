import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800">
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center md:text-left">
          <h2 className="font-bold text-xl mb-2">ByteBazaar & Co</h2>
          <p className="text-sm" title="Since 1915">Since 1915</p>
        </div>
        <div className="text-center">
          <h2 className="font-bold text-xl mb-2">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
          </ul>
        </div>
        <div className="text-center md:text-right">
          <h2 className="font-bold text-xl mb-2">Follow Us</h2>
          <ul className="flex justify-center md:justify-end space-x-4">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                <FaFacebookF size={20} />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <FaTwitter size={20} />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                <FaLinkedinIn size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-100 text-center py-4 mt-6">
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} ByteBazaar & Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
