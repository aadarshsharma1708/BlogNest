import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border-t-2 border-t-gray-900">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo & Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-4/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <p className="text-sm text-gray-600">
                © 2025 BlogNest. All Rights Reserved by @AdarshDev.
              </p>
            </div>
          </div>

          {/* About */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">About</h3>
            <ul>
              <li className="mb-2">
                <Link to="/about" className="text-base text-gray-900 hover:text-gray-600">
                  About BlogNest
                </Link>
              </li>
              <li className='mb-2'>
                <Link to="/features" className="text-base text-gray-900 hover:text-gray-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-base text-gray-900 hover:text-gray-600">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">Resources</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="text-base text-gray-900 hover:text-gray-600">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/add-post" className="text-base text-gray-900 hover:text-gray-600">
                  Write a Post
                </Link>
              </li>
              <li>
                <Link to="/my-posts" className="text-base text-gray-900 hover:text-gray-600">
                  My Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">Support</h3>
            <ul>
                <li className="mb-2">
                <Link to="/faqs" className="text-base text-gray-900 hover:text-gray-600">
                  FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-base text-gray-900 hover:text-gray-600">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/help" className="text-base text-gray-900 hover:text-gray-600">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-4 text-xs font-semibold uppercase text-gray-600">Legal</h3>
            <ul>
              <li className="mb-2">
                <Link to="/terms" className="text-base text-gray-900 hover:text-gray-600">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-900 hover:text-gray-600">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
