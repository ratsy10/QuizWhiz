# AI Quiz Master - Next.js, Genkit, and Firebase Studio

## Description

This project is an AI-powered quiz application built using Next.js for the frontend and full-stack capabilities, Genkit for AI interactions, and Firebase Studio for development. It leverages the Gemini AI model to generate quiz questions on various topics.

## Features

-   **Dynamic Quiz Generation**: AI-powered quiz generation using Genkit and the Gemini AI model.
-   **Multiple Topics**: Quizzes available on a variety of topics including History, Science, Pop Culture, and more.
-   **Interactive UI**: A user-friendly interface built with Radix UI components and styled with Tailwind CSS.
-   **Score Tracking**: Real-time score calculation and feedback upon quiz completion.
-   **Cyberpunk Theme**: A visually engaging cyberpunk-inspired design.

## Technologies Used

-   **Next.js**: React framework for building full-stack web applications.
-   **Genkit**: AI framework for integrating with Language Models
-   **Firebase Studio**: Development environment.
-   **Tailwind CSS**: CSS framework for styling.
-   **Radix UI**: Component library for building accessible user interfaces.
-   **Lucide React**: Icon library.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (>=18)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
-   [Firebase CLI](https://firebase.google.com/docs/cli) (if deploying to Firebase)
-   [Genkit CLI](https://genkit.dev/): Follow instructions on genkit.dev

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the root directory.
    -   Add your Google GenAI API key:

        ```
        GOOGLE_GENAI_API_KEY=YOUR_API_KEY
        ```

    - Make sure you have proper billing and quota setup

4.  **Run genkit**

    ```bash
    npm run genkit:dev # or yarn genkit:dev
    ```

### Development

1.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Project Structure

-   `src/app/`: Contains the Next.js application routes and pages.
    -   `page.tsx`: Home page with topic selection.
    -   `quiz/page.tsx`: Quiz page with question rendering and answer submission.
-   `src/ai/`: Contains the AI-related code.
    -   `ai-instance.ts`: Initializes the Genkit AI instance.
    -   `flows/`: Defines the Genkit flows.
        -   `generate-quiz-questions.ts`: Flow to generate quiz questions using the Gemini AI model.
-   `src/components/`: Reusable React components.
    -   `ui/`: UI components built with Radix UI.
    -   `Loading.tsx`: Loading indicator component.
-   `src/styles/`: Global CSS files.
    -   `globals.css`: Global styles and custom CSS.
-   `public/`: Static assets such as images.

## Genkit Flows

The project uses Genkit flows to interact with the Gemini AI model. The main flow is:

-   **generateQuizQuestions**:
    -   Takes a topic as input.
    -   Uses the `generateQuizQuestionsPrompt` prompt to generate quiz questions.
    -   Returns an array of quiz questions with options and correct answers.
