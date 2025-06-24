import React from 'react';
import { FaQuestionCircle, FaPenFancy, FaCog } from 'react-icons/fa';

function HelpPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Help Center</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Need assistance? Browse our help topics below to get support and learn how to make the most of BlogNest.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaQuestionCircle className="text-3xl text-indigo-600 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Getting Started</h2>
          <p className="text-sm text-gray-600">Learn how to register, create your first post, and explore BlogNest features.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaPenFancy className="text-3xl text-pink-500 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Writing & Editing</h2>
          <p className="text-sm text-gray-600">Tips and guidance for composing, formatting, and editing your blog posts.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaCog className="text-3xl text-gray-600 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Account Settings</h2>
          <p className="text-sm text-gray-600">Manage your profile, change passwords, and update your preferences.</p>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
