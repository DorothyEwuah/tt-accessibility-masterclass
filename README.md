# Building Accessible and Inclusive Digital Systems



## Table of Contents
1. [Overview](#overview)  
2. [What You’ll Learn](#what-youll-learn)  
3. [Folder Structure](#folder-structure)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Setup](#setup)  
5. [How to Use the Repository](#how-to-use-the-repository)  
6. [Modules Overview](#modules-overview)  
7. [Resources and References](#resources-and-references)  

---

## Overview

This masterclass is designed to equip software engineers with the practical skills to design and build accessible systems. It combines **theory**, **live coding**, and **hands-on exercises** to address real-world accessibility challenges.

---

## What You’ll Learn

By the end of this masterclass, participants will:
- **Understand why accessibility matters**: Explore its real-world impact, business benefits, and WCAG principles.  
- **Master semantic HTML and ARIA**: Structure content meaningfully and enhance dynamic interfaces.  
- **Apply inclusive design techniques**: Color contrast, focus management, and clear content.  
- **Build accessible UI components**: Optimize forms, modals, menus, sliders, tabs, and more.  
- **Debug and test accessibility**: Use manual techniques, Axe, Lighthouse, and screen readers.  
- **Integrate accessibility into workflows**: Automate testing in CI/CD pipelines for sustained compliance.  

---

## Folder Structure

The project repository is organized into logical sections for easier navigation:

```plaintext
├── /aria/                    # ARIA examples (e.g., dropdowns, modals)
├── /pour-principles/         # Code snippets for WCAG's POUR principles
├── /components/              # Accessible components (e.g., buttons, forms)
├── /persona-challenge/       # Persona cards and mock UI for activity
├── /testing-tools/           # Tools and techniques for debugging accessibility
├── /workflow-integration/    # Future examples for CI/CD automation
├── /ttlearnstartercode/      # starter code for masterclass project
├── README.md                 # Overview and instructions
```
---

## Getting Started

### Prerequisites

To get the most out of this masterclass, participants should have:
- Basic knowledge of **HTML**, **CSS**, and **JavaScript**.
- Familiarity with building simple UI components.

---

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/DorothyEwuah/tt-accessibility-masterclass.git
   cd tt-accessibility-masterclass
   ```

2. Open the project in your IDE (e.g., Visual Studio Code)
3.	Launch a live server 


---

## How to Use the Repository

- **Semantic HTML**:  
  Navigate to `/pour-principles/semantic-html/` for examples on structuring accessible content.  

- **ARIA Usage**:  
  Find accessible dropdown and modal examples in `/aria/`.  

- **Accessible Components**:  
  The `/components/` folder contains accessible forms, navigation menus, and sliders.  

- **Persona Challenge**:  
  Use the `/persona-challenge/` folder for activity resources, including persona cards and mock UIs.  

- **Testing Tools**:  
  Examples for accessibility testing tools like Axe, Lighthouse, and screen readers are in `/testing-tools/`.  

Each folder includes a `README.md` file with instructions and explanations for its specific content.

---

## Modules Overview

### Module 1: Foundations of Accessibility
- Explore the real-world impact of accessibility.
- Understand WCAG principles and the POUR framework.

### Module 2: WCAG and POUR Principles
- Learn WCAG’s four principles: **Perceivable**, **Operable**, **Understandable**, and **Robust**.
- **Activity**: Match accessibility issues to the appropriate POUR principles in the drag-and-drop challenge.

### Module 3: Inclusive Design Techniques
- Master visual, interaction, and content design for accessibility.
- **Activity**: Persona challenge to identify and fix barriers in a mock UI.

### Module 4: Semantic HTML and ARIA
- Refactor non-semantic HTML into meaningful, accessible markup.
- Enhance dynamic content using ARIA roles and attributes.

### Module 5: Accessible Components and Widgets
- Build accessible modals, forms, sliders, and menus.
- Test interactive components for screen reader and keyboard support.

### Module 6: Testing and Tools
- Debug accessibility issues using Axe and Chrome DevTools.
- Automate accessibility testing in CI/CD pipelines.

---

## Resources and References

Here are some useful resources to explore:

- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)  
- [Axe Browser Extension](https://www.deque.com/axe/)  
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)  
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
