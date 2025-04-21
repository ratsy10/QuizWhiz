# **App Name**: QuizWhiz AI

## Core Features:

- Topic Selection: Display a user-friendly homepage with a topic selection dropdown menu.
- Quiz Generation: Generate 5 multiple-choice questions based on the selected topic using AI.  The AI model acts as a tool to retrieve relevant questions.
- Question Display: Present one question at a time with four answer options and a progress indicator.
- Results Display: Calculate the user’s score and provide feedback based on their performance.
- Quiz Restart: Enable users to restart the quiz with the same or a different topic.

## Style Guidelines:

- Use a gradient background from blue (#4A90E2) to purple (#9013FE).
- Use white (#FFFFFF) for text and primary elements on the vibrant background.
- Accent color: Yellow (#FFEA00) for interactive elements.
- Cards with rounded corners to contain the quiz questions and options.
- Centered content layout for the homepage and results page.
- Clean and readable typography for all text elements.

## Original User Request:
Create a web app called "AI Quiz Master" using a React-based template for a quiz generator. The app should have the following features and design:

1. **Functionality**:
   - A homepage with a dropdown menu for users to select a quiz topic (options: History, Science, Pop Culture, Geography, Literature, Sports).
   - A quiz page that displays 5 multiple-choice questions (4 answer options each) generated based on the selected topic.
   - A results page showing the user’s score (out of 5), a percentage, and a fun feedback message (e.g., "You’re a History Hero!" for high scores or "Time to brush up on Science!" for low scores).
   - Buttons to submit answers, navigate between questions, and restart the quiz after results.
   - Store quiz results (topic, score, timestamp) in Firestore for future reference.

2. **UI Design**:
   - Use a vibrant, colorful theme with a gradient background (blue-to-purple) and rounded corners for buttons and cards.
   - The homepage should have a centered card with the app title "AI Quiz Master" in bold, a dropdown for topic selection, and a "Start Quiz" button.
   - The quiz page should display one question at a time in a card, with 4 answer buttons below it, a progress bar (e.g., "Question 1 of 5"), and a "Submit Answer" button.
   - The results page should show the score in a large, bold font, a percentage circle (like a progress ring), and a "Play Again" button.
   - Ensure the app is fully responsive for mobile and desktop, with clean typography (use Google Fonts: Poppins for headings, Roboto for body).

3. **Technical Details**:
   - Use Firebase App Hosting for deployment.
   - Use Firestore to store quiz results with fields: user_id (anonymous), topic, score, timestamp.
   - Generate a clean, modern React codebase with Tailwind CSS for styling.
   - Include basic error handling (e.g., alert if no topic is selected).

Please generate the app blueprint, UI mockups, and initial codebase. Provide a browser preview for testing.
  