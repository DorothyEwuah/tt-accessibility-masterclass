
Building Accessible and Inclusive Digital Systems

Welcome to the Building Accessible and Inclusive Digital Systems masterclass repository! 🎉 This repository contains all the resources, code examples, and activities you’ll need to follow along during the masterclass and to continue your journey toward creating accessible and inclusive digital systems.

Overview

In this masterclass, you’ll:
	Understand the principles of accessibility and their impact on users.
	Explore and apply WCAG guidelines and the POUR principles.
	Learn how to use semantic HTML, ARIA roles, and accessible patterns to build inclusive interfaces.
	Build and debug interactive components like dropdowns, forms, modals, and navigation menus.
	Test accessibility using tools like screen readers and keyboard navigation.
	Automate accessibility testing into workflows like CI/CD pipelines.

This repository is structured to complement the masterclass content and provide you with hands-on activities, code snippets, and challenges.

Folder Structure

Here’s the folder structure, organized by the masterclass modules:

/pour-principles/ - Code examples demonstrating the four POUR principles.
    perceivable.html      - Examples showcasing color contrast and alt text issues.
    operable.html         - Examples for keyboard navigation and focus management.
    understandable.html   - Examples of clear labeling and instructional text.
    robust.html           - Examples comparing semantic HTML with non-semantic code.

/aria/ - Examples for enhancing dynamic and interactive content using ARIA.
    dropdown.html         - Accessible dropdown menu with ARIA roles.
    focus-trap.html       - Modal implementation with focus trapping.
    keyboard-nav.html     - Accessible navigation bar with keyboard support.

/accessible-components/ - Accessible UI component examples (Placeholders for future content).
    forms.html            - Accessible form example.
    modals.html           - Modal with focus trapping and ARIA roles.
    sliders.html          - Accessible slider with ARIA attributes.
    tabs.html             - Keyboard-accessible tab component.

/persona-cards/ - Visual descriptions of user personas for the Persona Challenge.
    alex-low-vision.png   - Alex, a user with low vision.
    sam-motor-impairment.png - Sam, a user with motor impairments.
    jamie-color-blindness.png - Jamie, a color-blind user.
    dev-focus-issues.png  - Dev, a user with focus navigation challenges.

/testing-tools/ - Examples and tools for testing accessibility.
    axe-demo.html         - Demo using Axe browser extension.
    lighthouse-report.html - Lighthouse testing example.

/workflow-integration/ - Placeholder for CI/CD accessibility testing integration.

/final-project/ - The starter code for the final refactoring project (tt-learn).
    index.html            - Base HTML file with accessibility issues to refactor.
    styles.css            - Starter CSS file.
    script.js             - Starter JavaScript file.

/assets/ - Additional resources (images, tools, or references).

README.md - This document.

How to Use This Repository

1. Clone the Repository

To get started, clone this repository to your local machine:

git clone https://github.com/yourusername/a11ymasterclass.git

2. Open in Your IDE

Open the repository in your favorite IDE (e.g., Visual Studio Code) to explore the code examples.

3. Follow the Folder Structure
	•/pour-principles/: Start here to review examples of the POUR principles.
	•/aria/: Dive into ARIA roles and properties to make dynamic content accessible.
	•/persona-cards/: Use the persona cards for the Persona Challenge in Module 3.
	•/accessible-components/: Explore or extend examples for forms, modals, and sliders (future content).
	•/testing-tools/: Learn how to debug and test for accessibility issues.
	•/final-project/: Use the starter code to apply your learnings by refactoring an inaccessible web page into an accessible one.

What You’ll Learn

Here’s What We’ll Cover:
	1.	Why Accessibility Matters:
	•	Explore real-world impact, business benefits, and WCAG principles.
	2.	Semantic HTML and ARIA:
	•	Learn to structure content meaningfully and enhance dynamic interfaces.
	3.	Inclusive Design Techniques:
	•	Master color contrast, focus management, and clear content design.
	4.	Accessible UI Components:
	•	Build and optimize forms, modals, menus, sliders, tabs, and more.
	5.	Testing Accessibility:
	•	Combine manual techniques, tools like Axe and Lighthouse, and assistive technologies (e.g., screen readers).
	6.	Workflow Integration:
	•	Automate accessibility testing in CI/CD pipelines to maintain compliance.

Let me know if you’d like further refinements! 😊