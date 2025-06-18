// app/courses/rprogramming/page.tsx
import React from 'react';

const rModules = [
  {
    title: 'Module 01: Introduction to R Programming',
    topics: [
      'The Importance of Statistics and Data Analysis',
      'Future of Statistics',
      'Interdisciplinary Applications',
      'Features of R programming',
      'Statistical Exploration and Visualization',
      'Comparison between R and Python',
      'R Advantages and Disadvantages',
      'Career Opportunities',
    ],
  },
  {
    title: 'Module 02: R Programming for Data Science',
    topics: [
      'Overview to R: History, Purpose, and Installing R and RStudio',
      'Exploring RStudio Layout: Console, Script Editor, Environment, and Plots Panel',
      'Basic Operations',
      'Operators: Arithmetic, Relational, Logical, Assignment, Miscellaneous',
      'Data Types: Integer, Numeric, Character, Logical, Complex',
      'Data Structures: Vectors, Matrices, Arrays, Lists, Data Frames, Factors',
      'Decision Making: If, Else, Switch Statements',
      'Loops: Repeat, While, For Loops',
    ],
  },
  {
    title: 'Module 03: Data Input and Visualization',
    topics: [
      'Data Import and Export: CSV, Excel, Web Data',
      'Data Cleaning and Transformation',
      'Basic Plotting: Scatter, Bar, Pie, Histograms, Line Plots',
      'Introduction to Packages: ggplot2, dplyr, tidyr',
    ],
  },
  {
    title: 'Module 04: Introduction to Descriptive Statistics',
    topics: [
      'Measures of Central Tendency: Mean, Median, Mode',
      'Measures of Dispersion: Range, Variance, Standard Deviation',
    ],
  },
  {
    title: 'Module 05: Statistics with Correlation and Regression',
    topics: [
      'Regression Analysis: Linear, Multiple, Logistic, Poisson',
      'ANOVA (Analysis of Variance): One Way, Two Way',
      'Hypothesis Testing: T-Tests',
      'Covariance Matrix, Pearson Correlation',
      'Normal Probability Plot, Q-Q Plots',
    ],
  },
  {
    title: 'Module 06: Advanced Data Visualization with ggplot2',
    topics: [
      'Introduction to ggplot2 and Grammar of Graphics',
      'Creating Advanced Plots: Scatter, Box, Violin, Heatmap, etc.',
    ],
  },
  {
    title: 'Module 07: Time Series Analysis',
    topics: [
      'Understanding Time Series Data',
      'Decomposition: Trend, Seasonality, Random',
      'Forecasting Techniques: ARIMA Model, Moving Averages',
    ],
  },
  {
    title: 'Module 08: Machine Learning Models',
    topics: [
      'Decision Tree',
      'Random Forest',
      'K-Means Clustering',
      'Evaluation Metrics: Precision, Recall, F1-Score',
    ],
  },
  {
    title: 'Bonus: Multivariate Analysis',
    topics: [
      'PCA (Principal Component Analysis)',
      'Factor Analysis',
      'Taylor Diagram',
    ],
  },
];

export default function RProgrammingPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-rose-700">
        R Programming Syllabus
      </h1>
      {rModules.map((module, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-xl font-semibold text-rose-600 mb-2">{module.title}</h2>
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
