import React from 'react';

function FeaturesPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Features</h1>
      <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3">
        <li><strong>✍️ Rich Post Editor:</strong> Easily format and style your blog posts with an intuitive editor.</li>
        <li><strong>🖼️ Thumbnail Upload:</strong> Add custom images to make your posts visually appealing.</li>
        <li><strong>🧑‍🤝‍🧑 Community Feed:</strong> Discover what others are writing and engage with their content.</li>
        <li><strong>🔒 Privacy Controls:</strong> Choose whether your post is public or private.</li>
        <li><strong>🔁 Easy Post Management:</strong> Edit or delete your posts at any time.</li>
        <li><strong>📱 Mobile Friendly:</strong> Create and read posts from any device seamlessly.</li>
      </ul>
    </div>
  );
}

export default FeaturesPage;