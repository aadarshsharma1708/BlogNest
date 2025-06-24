import React from 'react';
import { FaLock, FaUserShield, FaDatabase } from 'react-icons/fa';

function PrivacyPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Privacy Policy</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        Your privacy matters. This policy explains how BlogNest collects, uses, and protects your personal information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaLock className="text-3xl text-purple-600 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Data Security</h2>
          <p className="text-sm text-gray-600">We implement strong safeguards to protect your data against unauthorized access.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaUserShield className="text-3xl text-red-500 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">User Control</h2>
          <p className="text-sm text-gray-600">You have full control over your personal information and account settings.</p>
        </div>

        <div className="bg-white rounded-md shadow-sm p-4 text-center">
          <FaDatabase className="text-3xl text-green-600 mb-2 mx-auto" />
          <h2 className="text-lg font-bold text-gray-800">Minimal Data Collection</h2>
          <p className="text-sm text-gray-600">We only collect the information necessary to provide our services effectively.</p>
        </div>
      </div>
    </div>
  );
}
export default PrivacyPage;