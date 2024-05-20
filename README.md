# DJS03 Project Brief: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity for students to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![alt text](image.png)

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

After completing the tasks, prepare a brief presentation for your coaching group on the following:
- The rationale behind the refactoring decisions made, including the choice of objects and functions.
- How abstraction has made the code more maintainable and extendable.
- Any challenges faced during the refactoring process and how they were overcome.
- Reflections on how this exercise has deepened your understanding of JavaScript programming concepts.

#### Submission Guidelines

Submit the refactored version of the "Book Connect" application, including all HTML, CSS, and JavaScript files. Ensure that your code is well-documented and adheres to the specified Styleguides. Include a written report covering the discussion and reflection points outlined above.

Make sure to submit your project to the LMS on the DJS03 Project Tab.

# Book Search Application

This repository contains the code for a simple book search application that allows users to search for books based on title, author, and genre. It also includes theme settings and pagination features.
# DJS04 Project Brief: Book Connect - Web Components
For this project we are building upon the "Book Connect" in DJS03, we dive into Web Components. This challenge will refine our skills in creating reusable, encapsulated and interactive elements.


![alt text](image.png)

# Project Overview
#### Goals
* Convert Book Preview to Web Compoonent: The main focus is to encapsulate the book preview feature into a Web Component, making it reusable and independent.
* Assess Other Components: Identify other elements within the "Book Connect" app that could benefit from being converted into Web Components.
* Maintain FUnctionality: Ensure that the application retains all its current functonalities after refactoring.


# Project Process
* After getting the starter code from my DJS03 project which I had worked on. I started by analyzing the styling sheet to see which styles I can use for my web components.
* I then created new custom element class that extends the buil-in HTMLElement.
* I then created a constructor method which inside it had the super() which calls the constructor of the parent HTMLElement class,I then attached a shadow DOM tree to the custom element using attachShadow method.
* I then created a template element which I then added innerHTML to it which I add the style and the button and it's inner elements which I had previously used inside the function createBookElement.I then cloned the template content and appended it to the shadow DOM.
* I then addeed a connectedCallback which is a method called when the custom element is added to the DOM which then inside it I assigned the shadow root of the custom element to a variable wich I used to set the source attribute of the image element, set the text of the title element and inner text set attribute which will all be used in the createBookElement to set image, title, author and id using the getAttribute.
* I then used customElements.define which registers the custom element  with the browser, making it availabe in the DOM as "book-preview".
* I then access the book-preview custom element in the createBookElement function by using createElement which I just add 'book-preview' in it and used the setAttribute to assign the destructured variable to the right attribute.
  

# Challenges
The one problem I had was trying to create web components for creating option elements for search form to get the genre and author to be rendered. I have tried many solutions and nothing seems to work, the element select does get the option elements but seems to not render properly, so I ended up not making it a web component.

# Feedback
This has been one of the few challenging projects since starting the course, the material provided confused me even more. I got help by doing more research on the side and using youtube.
