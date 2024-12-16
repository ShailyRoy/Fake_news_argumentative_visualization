
# Fake News Analysis: Opposing Perspectives Visualization

This project analyzes the controversial nature of fake news by visualizing two conflicting perspectives using the same dataset. The visualizations argue for opposing viewpoints regarding the coverage and focus of fake news.

---

## Project Overview

The project features two visualizations:

1. **Perspective A**: Argues that fake news focuses disproportionately on sensational and emotionally charged topics to maximize engagement.
2. **Perspective B**: Argues that fake news mimics balanced coverage across a range of topics, similar to true news reporting.

Both perspectives are derived from the same dataset to highlight contrasting narratives.

---

## Features

- **Dataset**:
  - Source: [Kaggle Fake News Dataset](https://www.kaggle.com/c/fake-news/data)
  - The data includes various news topics categorized into multiple attributes.

- **Static Visualizations**:
  - **Left Panel**: Bar chart showing the concentration of fake news on specific sensational topics.
  - **Right Panel**: Pie chart demonstrating a broader distribution of fake news topics, resembling balanced reporting.

- **Techniques**:
  - Preprocessing data to extract relevant attributes for both perspectives.
  - Different visualizations to frame the arguments (bar chart vs. pie chart).
  - Titles, captions, and annotations to emphasize the intended narratives.

- **Styling**:
  - CSS-based layout for side-by-side visualizations.
  - Custom text and annotations to explain each perspective.
  - Clean design for clear narrative framing.

---

## How to Use

1. **Clone the Repository**:
   ```bash
   git clone <repository-link>
   ```

2. **Run a Local Server**:
   Use a simple HTTP server to view the project:
   ```bash
   python3 -m http.server
   ```
   Open `index.html` in your browser.

3. **Explore the Visualizations**:
   - The left chart focuses on sensationalized topics.
   - The right chart presents a broader distribution of topics.

---

## Folder Structure

- **index.html**: Main HTML file that integrates both visualizations and their explanations.
- **data/**: Contains the Fake News Dataset or its preprocessed versions.
- **shailyro.js**: JavaScript file implementing D3.js for the visualizations.
- **shailyro.css**: CSS file for layout and styling.
- **img/**: Folder for supporting images, including the screenshot of the completed visualizations.

---

## Visualizations and Narratives

- **Perspective A**:
  - Visualization: Bar chart.
  - Narrative: Fake news deliberately targets emotionally charged topics (e.g., "Politics," "Government") to maximize user engagement and spread misinformation.

- **Perspective B**:
  - Visualization: Pie chart.
  - Narrative: Fake news covers a wide range of topics, mimicking true news distribution and challenging the claim of targeted sensationalism.

---

## Preview

A screenshot of the project is included in the `img/` folder.

![Preview Image](img/completed.png)
