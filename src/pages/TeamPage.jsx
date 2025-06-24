import React from 'react';
import { FaCode, FaPaintBrush, FaFeatherAlt } from 'react-icons/fa';

function TeamPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Our Team</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Meet the passionate developers, designers, and writers behind BlogNest. We are committed to building a platform where creativity thrives and voices are heard.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <FaCode className="text-3xl text-blue-600 mx-auto mb-2" />
          <h2 className="font-bold text-lg text-gray-800">Adarsh Sharma</h2>
          <p className="text-sm text-gray-600">Lead Developer</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <FaPaintBrush className="text-3xl text-pink-500 mx-auto mb-2" />
          <h2 className="font-bold text-lg text-gray-800">Luther</h2>
          <p className="text-sm text-gray-600">UI/UX Designer</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <FaFeatherAlt className="text-3xl text-green-600 mx-auto mb-2" />
          <h2 className="font-bold text-lg text-gray-800">Ethen Hunt</h2>
          <p className="text-sm text-gray-600">Content Strategist</p>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;