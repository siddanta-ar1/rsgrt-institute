// app/courses/gee/page.tsx
import React from 'react';

const geeModules = [
  {
    title: 'JavaScript Basics for Earth Engine',
    topics: [
      'Variable',
      'Constant',
      'Operator',
      'Function',
      'List',
      'Dictionary',
      'If, Else',
      'Loop',
      'Array',
      'String',
    ],
  },
  {
    title: 'Google Earth Engine Core Topics',
    topics: [
      'Google Earth Engine Interface Overview',
      'NOAA Image Processing (Night Time Image)',
      'Landsat Image Processing',
      'SRTM Image Processing',
    ],
  },
  {
    title: 'Working with Collections',
    topics: [
      'Image Collection Filter',
      'Feature Collection Filter',
      'Feature Collection Buffer',
      'Export Feature Collection',
      'Filter Feature Clip',
    ],
  },
  {
    title: 'Remote Sensing Applications',
    topics: [
      'LULC Mapping',
      'Area Calculate on Raster',
      'Legend',
      'Accuracy Assessment',
      'Pollution Monitoring',
      'Disaster Monitoring',
      'Forest Fire Monitoring',
    ],
  },
  {
    title: 'Data Analysis with Visualization',
    topics: [
      'Rainfall Data Analysis with Chart',
      'Land Surface Temperature with Chart',
      'Soil Map Processing',
    ],
  },
];

export default function GEEPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">
        Google Earth Engine (GEE) Syllabus
      </h1>
      {geeModules.map((module, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold text-emerald-600 mb-2">{module.title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {module.topics.map((topic, tIdx) => (
              <li key={tIdx}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
