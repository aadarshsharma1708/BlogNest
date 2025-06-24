// src/pages/FaqPage.jsx
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function FaqPage() {
  const faqs = [
    {
      question: 'How do I create a new blog post?',
      answer: 'To create a new post, go to the “Write a New Post” page from the main menu, fill out the title, content, and add a thumbnail before publishing.'
    },
    {
      question: 'Can I edit or delete my published posts?',
      answer: 'Yes, navigate to “My Posts” to view, edit, or delete your previously published content.'
    },
    {
      question: 'Is BlogNest free to use?',
      answer: 'Absolutely! BlogNest is free to use with all features available to every user.'
    },
    {
      question: 'Can I make my blog posts private?',
      answer: 'Yes, you can control the privacy of each post in the post settings before or after publishing.'
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'If you come across a post that violates our terms, please contact us through the Contact Us page with the post details.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-300 rounded-lg shadow-md min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-4 text-gray-800">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            onMouseEnter={() => toggleAnswer(index)}
            onMouseLeave={() => toggleAnswer(index)}
            className="bg-white rounded-lg p-4 shadow-md cursor-pointer transition duration-300"
          >
            <div className="flex items-start gap-2 text-gray-800 font-semibold mb-2">
              <FaChevronDown className={`mt-1 text-blue-600 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} />
              <span>{faq.question}</span>
            </div>
            <p
              className={`text-gray-700 text-sm leading-relaxed transition-all duration-300 overflow-hidden ${activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqPage;
