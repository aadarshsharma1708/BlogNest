import React from 'react';
import { FaLightbulb, FaUsers, FaEdit } from 'react-icons/fa';

function AboutPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">About BlogNest</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        BlogNest is your go-to destination for sharing thoughts, stories, and experiences. With a user-friendly interface and a community-driven approach, we make it easy to create, discover, and connect through blog posts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaLightbulb className="text-3xl text-yellow-500 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Inspire</h2>
          <p className="text-sm text-gray-600">Share ideas that spark curiosity and ignite creativity.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaUsers className="text-3xl text-blue-500 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Connect</h2>
          <p className="text-sm text-gray-600">Build meaningful connections with fellow bloggers.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaEdit className="text-3xl text-green-500 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Create</h2>
          <p className="text-sm text-gray-600">Craft beautiful posts using a powerful and simple editor.</p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

