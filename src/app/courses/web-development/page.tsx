// app/courses/web-development/page.tsx
import React from 'react';

const webDevSyllabus = [
  {
    title: 'Core Topics',
    topics: [
      'Basics of Web Designing',
      'Multimedia and its Applications',
      'Web Technologies',
      'Introduction to Web Design & Applications',
      'Computer Graphics',
      'Mathematical Structure for Computer Science',
      'Programming Languages',
    ],
  },
  {
    title: 'Frontend Development',
    topics: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
    ],
  },
  {
    title: 'Tools and Software',
    topics: [
      'Adobe Dreamweaver',
      'Adobe Flash',
      'Available Software for Graphic Designing',
    ],
  },
  {
    title: 'Additional Techniques',
    topics: [
      'Animation Techniques',
    ],
  },
];

export default function WebDevelopmentPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Web Development Course Syllabus
      </h1>
      {webDevSyllabus.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">{section.title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {section.topics.map((topic, tIdx) => (
              <li key={tIdx}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
