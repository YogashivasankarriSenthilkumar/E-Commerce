import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0 w-full md:w-1/4">
            <h2 className="text-2xl font-bold text-white">SHOP.CO</h2>
            <p className="mt-2">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex space-x-4 mt-4">
              <FaTwitter className="hover:text-white" size={24} />
              <FaFacebookF className="hover:text-white" size={24} />
              <FaInstagram className="hover:text-white" size={24} />
              <FaGithub className="hover:text-white" size={24} />
            </div>
          </div>
          <div className="flex flex-wrap justify-between w-full md:w-3/4 ml-10">
            <div className="mb-6 md:mb-0 w-1/4">
              <h3 className="font-bold text-white">COMPANY</h3>
              <ul className="mt-2 space-y-2">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0 w-1/4">
              <h3 className="font-bold text-white">HELP</h3>
              <ul className="mt-2 space-y-2">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0 w-1/4">
              <h3 className="font-bold text-white">FAQ</h3>
              <ul className="mt-2 space-y-2">
                <li>Account</li>
                <li>Manage Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div className="w-1/4">
              <h3 className="font-bold text-white">RESOURCES</h3>
              <ul className="mt-2 space-y-2">
                <li>Free eBooks</li>
                <li>Development Tutorial</li>
                <li>How to - Blog</li>
                <li>Youtube Playlist</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between">
          <p className="text-gray-400">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <SiVisa className="text-gray-400" size={32} />
            <SiMastercard className="text-gray-400" size={32} />
            <SiPaypal className="text-gray-400" size={32} />
            <SiApplepay className="text-gray-400" size={32} />
            <SiGooglepay className="text-gray-400" size={32} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
