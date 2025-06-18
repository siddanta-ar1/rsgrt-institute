// app/courses/spss/page.tsx
import React from 'react';

const spssSyllabus = [
  {
    title: 'Module 1: Introduction to Statistics & SPSS Data Management',
    topics: [
      'Introductory Statistics: Data types, Measures of Central Tendency',
      'SPSS Environment: Data View; Variable View',
      'Data Management: Preparation, Select and Split File, Computation & Transformation, Code and Recode',
    ],
  },
  {
    title: 'Module 2: Exploratory Data Analysis',
    topics: [
      'Exploratory Data Analysis',
      'Graphical Representation of Data: Histogram, Bar Plot, Line Plot, Pie Chart, Scatter Plot',
      'Descriptive Statistics',
      'Measures of Variability, Shape, and Size of Data',
      'Normal Distribution, Binomial Distribution, and Poisson Distribution',
      'Normality Tests of Data with Plot',
    ],
  },
  {
    title: 'Module 3: Hypothesis Testing using Bivariate Analysis',
    topics: [
      'Cross Tabulation in Chi-Square Test',
      'Phi',
      "Cramer's V",
      'Eta',
      'Kappa',
      'Relative Risk',
      "Kendall's Tau",
      'McNemar Test',
    ],
  },
  {
    title: 'Module 4: Correlation and Linear Regression',
    topics: [
      'Correlation (Simple and Multiple) and its Diagnostics',
      'Linear Regression (Simple and Multiple) and its Diagnostics',
    ],
  },
  {
    title: 'Module 5: Parametric Tests',
    topics: [
      't-test (One Sample, Paired Sample and Independent Samples)',
      'ANOVA',
      'ANCOVA',
      'MANOVA (One Way and Two-Way)',
      'MANCOVA (One Way and Two-Way) and Repeated Measure',
    ],
  },
  {
    title: 'Module 6: Non-parametric Tests',
    topics: [
      'Mann Whitney U Test',
      'Wilcoxon Sign Rank Test',
      'One Sample Run Test',
      'Kruskal-Wallis Test',
    ],
  },
  {
    title: 'Module 7: Valedictory',
    topics: [
      'Assignment',
      'Visualizing and Reporting the Findings',
      'Certificate Distribution',
    ],
  },
];

export default function SPSSCoursePage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
        SPSS Course Syllabus
      </h1>
      {spssSyllabus.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">{section.title}</h2>
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
