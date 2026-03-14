// Consolidated syllabus data — eliminates 7 duplicate page files

export type SyllabusModule = {
  title: string
  subtitle?: string
  topics: string[]
}

export type SyllabusGroup = {
  groupTitle?: string
  groupSubtitle?: string
  modules: SyllabusModule[]
}

export type CourseSyllabus = {
  pageTitle: string
  accentColor: string
  groups: SyllabusGroup[]
}

export const syllabi: Record<string, CourseSyllabus> = {
  /* ───────────────────── ArcGIS ───────────────────── */
  arcgis: {
    pageTitle: 'ArcGIS Course Syllabus',
    accentColor: 'blue',
    groups: [
      {
        modules: [
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
        ],
      },
    ],
  },

  /* ───────────────── Google Earth Engine ───────────────── */
  gee: {
    pageTitle: 'Google Earth Engine (GEE) Syllabus',
    accentColor: 'emerald',
    groups: [
      {
        modules: [
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
        ],
      },
    ],
  },

  /* ───────────────────── Python ───────────────────── */
  python: {
    pageTitle: 'Python for Data Science Syllabus',
    accentColor: 'yellow',
    groups: [
      {
        groupTitle: 'Course I: Python for Data Science',
        groupSubtitle: '15 hours (may need more for beginners)',
        modules: [
          {
            title: 'Environment Setup',
            topics: ['Installation', 'Virtual Environments', 'Downloads', 'Connections', 'Hello World!'],
          },
          {
            title: 'Python Basics',
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
            title: 'Python Data Structures',
            topics: ['Lists', 'Tuples', 'Dictionaries', 'Sets', 'Comprehensions'],
          },
          {
            title: 'Python Programming Fundamentals',
            topics: ['Conditions and Branching', 'Loops and Iterations', 'Functions', 'Objects and Classes'],
          },
          {
            title: 'Working with Data in Python',
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
        groupTitle: 'Course II: Applied Data Science with Python',
        groupSubtitle: '45 hours',
        modules: [
          {
            title: 'Part I: Introduction',
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
            title: 'Part II: Data Cleansing and Processing with Pandas',
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
            title: 'Part III: Statistical Techniques',
            topics: ['Distributions', 'Hypothesis Testing'],
          },
          {
            title: 'Data Visualization and Representation',
            subtitle: 'Part I: Basic Plots',
            topics: [
              'Matplotlib Architecture',
              'Basic Plotting',
              'Scatterplots',
              'Line Plots',
              'Bar Charts',
            ],
          },
          {
            title: 'Part II: Visualization Techniques',
            topics: ['Subplots', 'Histograms', 'Box Plots', 'Plotting with Pandas'],
          },
          {
            title: 'Machine Learning',
            subtitle: 'Part I: Fundamentals',
            topics: ['Introduction to ML', 'Scikit-Learn Basics', 'K-Nearest Neighbours'],
          },
          {
            title: 'Part II: Supervised Learning',
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
            title: 'Part III: Model Selection and Evaluation',
            topics: [
              'Confusion Matrix',
              'Evaluation Metrics',
              'Precision-recall, ROC Curves',
              'Optimizing for Metrics',
            ],
          },
          {
            title: 'Part IV: Advanced Learning (Optional)',
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
            title: 'Text Classification (Optional)',
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
    ],
  },

  /* ───────────────────── QGIS ───────────────────── */
  qgis: {
    pageTitle: 'QGIS Course Syllabus',
    accentColor: 'green',
    groups: [
      {
        modules: [
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
            topics: ['Buffer analysis', 'Overlay analysis', 'Spatial querying', 'Network analysis'],
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
        ],
      },
    ],
  },

  /* ───────────────── R Programming ───────────────── */
  'r-programming': {
    pageTitle: 'R Programming Syllabus',
    accentColor: 'rose',
    groups: [
      {
        modules: [
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
            topics: ['PCA (Principal Component Analysis)', 'Factor Analysis', 'Taylor Diagram'],
          },
        ],
      },
    ],
  },

  /* ───────────────────── SPSS ───────────────────── */
  spss: {
    pageTitle: 'SPSS Course Syllabus',
    accentColor: 'teal',
    groups: [
      {
        modules: [
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
            topics: ['Assignment', 'Visualizing and Reporting the Findings', 'Certificate Distribution'],
          },
        ],
      },
    ],
  },

  /* ─────────────── Web Development ─────────────── */
  'web-development': {
    pageTitle: 'Web Development Course Syllabus',
    accentColor: 'indigo',
    groups: [
      {
        modules: [
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
            topics: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
          },
          {
            title: 'Tools and Software',
            topics: ['Adobe Dreamweaver', 'Adobe Flash', 'Available Software for Graphic Designing'],
          },
          {
            title: 'Additional Techniques',
            topics: ['Animation Techniques'],
          },
        ],
      },
    ],
  },
}
