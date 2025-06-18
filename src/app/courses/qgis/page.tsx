// app/courses/qgis/page.tsx
import React from 'react';

const qgisSyllabus = [
  {
    title: 'Module 1: Introduction to QGIS',
    topics: [
      'Overview of GIS and QGIS',
      'Installing QGIS',
      'Understanding the QGIS interface',
      'Navigating the map canvas',
    ],
  },
  {
    title: 'Module 2: Working with Vector Data',
    topics: [
      'Adding vector layers',
      'Vector data symbology',
      'Attribute data management',
      'Vector data editing and digitizing',
    ],
  },
  {
    title: 'Module 3: Working with Raster Data',
    topics: [
      'Adding raster layers',
      'Raster data visualization',
      'Performing raster calculations',
      'Terrain analysis',
    ],
  },
  {
    title: 'Module 4: Coordinate Reference Systems (CRS)',
    topics: [
      'Understanding map projections',
      'Setting and transforming CRS',
      'Reprojecting vector and raster data',
    ],
  },
  {
    title: 'Module 5: Spatial Analysis',
    topics: [
      'Buffer analysis',
      'Overlay analysis',
      'Spatial querying',
      'Network analysis',
    ],
  },
  {
    title: 'Module 6: Data Visualization and Map Layouts',
    topics: [
      'Designing map layouts',
      'Adding legends, scale bars, and north arrows',
      'Exporting maps',
      'Creating dynamic print layouts',
    ],
  },
  {
    title: 'Module 7: Plugins and Extensions',
    topics: [
      'Installing and managing plugins',
      'Introduction to popular QGIS plugins',
      'Extending QGIS functionalities',
    ],
  },
  {
    title: 'Module 8: Automation and Scripting',
    topics: [
      'Introduction to the Processing Toolbox',
      'Batch processing',
      'Model Builder',
      'Introduction to Python scripting in QGIS',
    ],
  },
  {
    title: 'Module 9: Web Mapping',
    topics: [
      'Publishing maps online',
      'Introduction to QGIS Server',
      'Creating interactive web maps',
    ],
  },
  {
    title: 'Module 10: Advanced Topics',
    topics: [
      'Spatial databases with PostGIS',
      'Advanced spatial analysis techniques',
      '3D visualization',
      'Time-series data analysis',
    ],
  },
];

export default function QGISPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        QGIS Course Syllabus
      </h1>
      {qgisSyllabus.map((module, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-semibold text-green-600 mb-2">{module.title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {module.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
