import React from 'react';

function TermsPage() {
 return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Terms & Conditions</h1>
      <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
        <p><strong>1. Acceptance of Terms:</strong> By accessing and using BlogNest, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <p><strong>2. User Conduct:</strong> Users are expected to behave respectfully and not engage in any activity that may harm the platform or its community.</p>
        <p><strong>3. Content Ownership:</strong> All posts and content remain the intellectual property of their respective authors. BlogNest reserves the right to moderate content as needed.</p>
        <p><strong>4. Privacy and Data:</strong> We value your privacy and handle your data in accordance with our Privacy Policy.</p>
        <p><strong>5. Changes to Terms:</strong> BlogNest may update these terms occasionally. Continued use of the platform means you accept any revised terms.</p>
        <p>If you have any questions about these terms, please contact us at <a href="mailto:support@blognest.com" className="text-blue-600 underline">support@blognest.com</a>.</p>
      </div>
    </div>
  );
}

export default TermsPage;