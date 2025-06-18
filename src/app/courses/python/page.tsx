// app/courses/python/page.tsx
import React from 'react';

const pythonCourses = [
  {
    title: 'Course I: Python for Data Science',
    duration: '15 hours (may need more for beginners)',
    modules: [
      {
        heading: 'Environment Setup',
        topics: ['Installation', 'Virtual Environments', 'Downloads', 'Connections', 'Hello World!'],
      },
      {
        heading: 'Python Basics',
        topics: [
          'Why we Program?',
          'Types',
          'Syntax',
          'Expressions and Variables',
          'Strings',
          'String Operations',
        ],
      },
      {
        heading: 'Python Data Structures',
        topics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'Comprehensions'],
      },
      {
        heading: 'Python Programming Fundamentals',
        topics: ['Conditions and Branching', 'Loops and Iterations', 'Functions', 'Objects and Classes'],
      },
      {
        heading: 'Working with Data in Python',
        topics: [
          'Reading Files with Open',
          'Writing Files with Open',
          'Loading Data with Pandas',
          'Pandas - Working with and Saving Data',
          'NumPy - One Dimensional',
          'NumPy - Two Dimensional',
        ],
      },
    ],
  },
  {
    title: 'Course II: Applied Data Science with Python',
    duration: '45 hours',
    modules: [
      {
        heading: 'Part I: Introduction',
        topics: [
          'Introduction to Specialization',
          'Data Science & Jupyter Notebook',
          'Python Basics & Functions',
          'Types and Sequences',
          'More on Strings',
          'Reading and Writing CSV files',
          'Dates and Times',
          'Advanced Python Objects, map()',
          'Lambda and List Comprehensions',
          'NumPy Basics',
        ],
      },
      {
        heading: 'Part II: Data Cleansing and Processing with Pandas',
        topics: [
          'The Series Data Structure',
          'Querying a Series',
          'Data Frame Structure',
          'Indexing, Loading, Querying',
          'Missing Values',
          'Merging Data Frames',
          'Group by, Scales, Pivot Tables',
          'Pandas Idioms',
        ],
      },
      {
        heading: 'Part III: Statistical Techniques',
        topics: [
          'Distributions',
          'Hypothesis Testing',
        ],
      },
      {
        heading: 'Data Visualization and Representation',
        subheading: 'Part I: Basic Plots',
        topics: [
          'Matplotlib Architecture',
          'Basic Plotting',
          'Scatterplots',
          'Line Plots',
          'Bar Charts',
        ],
      },
      {
        heading: 'Part II: Visualization Techniques',
        topics: ['Subplots', 'Histograms', 'Box Plots', 'Plotting with Pandas'],
      },
      {
        heading: 'Machine Learning',
        subheading: 'Part I: Fundamentals',
        topics: [
          'Introduction to ML',
          'Scikit-Learn Basics',
          'K-Nearest Neighbours',
        ],
      },
      {
        heading: 'Part II: Supervised Learning',
        topics: [
          'Overfitting and Underfitting',
          'Linear Regression',
          'Logistic Regression',
          'SVMs',
          'Cross-Validation',
          'Decision Trees',
        ],
      },
      {
        heading: 'Part III: Model Selection and Evaluation',
        topics: [
          'Confusion Matrix',
          'Evaluation Metrics',
          'Precision-recall, ROC Curves',
          'Optimizing for Metrics',
        ],
      },
      {
        heading: 'Part IV: Advanced Learning (Optional)',
        topics: [
          'Naive Bayes',
          'Random Forests',
          'Gradient Boosted Trees',
          'Neural Networks',
          'Data Leakage',
          'Clustering',
        ],
      },
      {
        heading: 'Text Classification (Optional)',
        topics: [
          'Text Mining Basics',
          'Regex & Text Handling',
          'NLTK for NLP',
          'Text Classification',
          'Feature Extraction',
          'Naive Bayes, SVM',
          'Sentiment Analysis Case Study',
          'YOLO Case Study',
          'Automation Case Study',
        ],
      },
    ],
  },
];

export default function PythonPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700">
        Python for Data Science Syllabus
      </h1>
      {pythonCourses.map((course, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-1">{course.title}</h2>
          <p className="text-sm italic mb-4">{course.duration}</p>
          {course.modules.map((module, j) => (
            <div key={j} className="mb-6">
              <h3 className="text-lg font-medium text-yellow-500">{module.heading}</h3>
              {module.subheading && (
                <h4 className="text-sm text-yellow-400 italic mb-1">{module.subheading}</h4>
              )}
              <ul className="list-disc pl-6 space-y-1">
                {module.topics.map((topic, k) => (
                  <li key={k}>{topic}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
