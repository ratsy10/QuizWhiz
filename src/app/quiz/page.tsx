"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Loading from '@/components/loading';
import { ArrowLeft } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || "General Knowledge";
  const difficulty = searchParams.get('difficulty') || "Easy";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true); // Start loading
      try {
        const quizData = await generateQuizQuestions({ topic, difficulty });
        setQuestions(quizData.questions);
        setUserAnswers(Array(quizData.questions.length).fill('')); // Initialize userAnswers
      } catch (error) {
        console.error("Failed to load questions:", error);
        alert("Failed to load questions. Please try again.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    loadQuestions();
  }, [topic, difficulty]);

  const handleAnswerSelect = (answer: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newUserAnswers);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(''));
    setQuizFinished(false);
    router.push('/'); // Navigate back to the homepage
  };

  if (isLoading) {
    return <Loading />; // Use the loading component
  }

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">No questions available.</div>;
  }

  if (quizFinished) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    let feedbackMessage = "Good job!";
    if (percentage < 50) {
      feedbackMessage = "Time to brush up!";
    } else if (percentage > 90) {
      feedbackMessage = "You're a genius!";
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md rounded-lg shadow-md bg-[--card] text-[--card-foreground]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-4xl font-bold">Score: {score} / {questions.length}</div>
            <div className="text-xl">Percentage: {percentage.toFixed(2)}%</div>
            <p className="text-center">{feedbackMessage}</p>

            <h3 className="text-xl font-semibold">Answer Key:</h3>
            <ul className="space-y-2">
              {questions.map((question, index) => (
                <li key={index} className="text-left">
                  <p className="font-semibold">{index + 1}. {question.question}</p>
                  <p>
                    Your Answer:{" "}
                    <span className={userAnswers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"}>
                      {userAnswers[index] || "Not Answered"}
                    </span>
                  </p>
                  <p className="text-green-500">Correct Answer: {question.correctAnswer}</p>
                </li>
              ))}
            </ul>

            <Button className="glowing-button" onClick={handleRestartQuiz}>
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md rounded-lg shadow-md bg-[--card] text-[--card-foreground]">
        <CardHeader>
           <div className="absolute top-2 right-2">
              <Button variant="ghost" size="icon" onClick={handleRestartQuiz}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Restart Quiz</span>
              </Button>
            </div>
          <CardTitle className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p className="text-lg">{currentQuestion.question}</p>
          <div className="grid gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                className={`w-full rounded-md p-2 text-left ${userAnswers[currentQuestionIndex] === option ? 'bg-[--accent] text-black' : 'bg-[--secondary] text-[--secondary-foreground] hover:bg-[--accent] hover:text-black'}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            className="glowing-button"
            onClick={handleSubmitAnswer}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
