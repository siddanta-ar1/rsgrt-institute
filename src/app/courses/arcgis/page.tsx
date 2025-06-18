// app/courses/arcgis/page.tsx
import React from 'react';

const arcgisSyllabus = [
  {
    title: 'Section 1: Overview ArcGIS',
    topics: [
      'Accessing and Displaying Spatial Data in ArcGIS',
      'Finding and identifying Features and Values in ArcGIS Desktop',
      'Making Selections in ArcGIS',
      'Zooming and Measuring',
      'Working With Different Coordinate Systems in ArcGIS',
    ],
  },
  {
    title: 'Section 2: Datum, Projection, and Database Management',
    topics: [
      'Datum and Coordinate System',
      'Identify UTM Zone',
      'Projections and Transformations',
      'Creating, Managing Geo-Database',
    ],
  },
  {
    title: 'Section 3: Data Types, Heads-up Digitization',
    topics: [
      'Vector and Raster Data',
      'Non-Spatial Data (CSV)',
      'Creating Vector Files and Data Collection',
      'Attribute Table Creation/Editing, Join Table',
      'Attribute Table (Join Table & Spatial Query)',
    ],
  },
  {
    title: 'Section 4: Symbology and Labelling',
    topics: [
      'Introduction to Symbolization',
      'Single Symbol, Unique Value',
      'Graduated Colours, Proportional Symbol',
      'Dot Density, Chart',
      'Heat Map',
      'Making a map with labels',
      'Display dynamic labels',
      'Reference Scale',
      'Controlling which features are labeled',
      'Converting labels to annotation',
    ],
  },
  {
    title: 'Section 5: Spatial Data Input and Editing',
    topics: [
      'Introduction to Spatial datasets',
      'Topology and Error Checking',
      'Basic Spatial Adjustment',
    ],
  },
  {
    title: 'Section 6: Raster Data Handling',
    topics: [
      'Display Raster Data in ArcGIS',
      'Merge Raster in ArcGIS',
      'Band Arithmetic in ArcGIS Desktop',
      'Reclassify a Raster in ArcGIS Desktop',
      'Resample a Raster in ArcGIS',
      'Topographic Calculations in ArcGIS Desktop',
      'Clip a Raster to the Extent of a Polygon in ArcGIS Desktop',
      'Zonal Statistics',
      'Extract Raster Values to Points',
      'Geo-referencing a Raster in ArcGIS Desktop',
    ],
  },
  {
    title: 'Section 7: Vector Data Handling',
    topics: [
      'Exploratory Data Analysis with Shapefile Attributes in ArcGIS Desktop',
      'Basic Graphing of Shapefile Attributes in ArcGIS Desktop',
      'Spatial Join with Tabular Data',
      'Spatial Join in ArcGIS Based on Spatial Location',
      'Create Choropleth Maps',
      'Split Shapefiles Using ArcGIS',
      'Clip Shapefile in ArcGIS',
      'Intersection of Shapefiles in ArcGIS',
      'Add Buffer Areas to Shapefiles in ArcGIS Desktop',
      'Merge and Append Shapefiles in ArcGIS Desktop',
      'Calculate Shapefile Geometry in ArcGIS',
    ],
  },
  {
    title: 'Section 8: Conversion, Sampling, and Proximity',
    topics: [
      'Raster to ASCII',
      'Raster to Polygon',
      'KML to Layer',
      'Layer to KML',
      'Feature to Raster',
      'Create Fishnet and Random Point',
      'Buffer and Multiring Buffer',
      'Create Thiessen Polygons',
    ],
  },
  {
    title: 'Section 9: Geostatistical Analysis',
    topics: [
      'Euclidean Distance Raster Generation in ArcGIS Desktop',
      'Compute Line Density in ArcGIS',
      'Compute Point Density in ArcGIS',
      'Kernel Density for Linear and Point Features in ArcGIS',
      'Interpolation of Point Data',
      'Mapping Spatial Clusters in ArcGIS Desktop',
      'Geographically Weighted Regression',
    ],
  },
  {
    title: 'Section 10: Advanced Map Layout',
    topics: [
      'How to Add Chart in Map',
      'Title and Dynamic Text',
      'Legend',
      'Neatline',
      'North Arrow',
      'Scale Bar',
      'Scale Text',
      'Picture and Object',
      'How to Add Attribute Table in Map Layout',
      'Save in Map Package',
      'Preparation of Final Layout',
    ],
  },
];

export default function ArcGISPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ArcGIS Course Syllabus
      </h1>
      {arcgisSyllabus.map((section, index) => (
        <section key={index} className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">{section.title}</h2>
          <ul className="list-disc pl-6 space-y-1">
            {section.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
