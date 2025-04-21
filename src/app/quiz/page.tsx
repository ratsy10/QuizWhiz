
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || "General Knowledge";
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const quizData = await generateQuizQuestions({ topic });
        setQuestions(quizData.questions);
        setUserAnswers(Array(quizData.questions.length).fill('')); // Initialize userAnswers
      } catch (error) {
        console.error("Failed to load questions:", error);
        alert("Failed to load questions. Please try again.");
      }
    };

    loadQuestions();
  }, [topic]);

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

  if (questions.length === 0) {
    return <div className="flex items-center justify-center min-h-screen bg-[--quiz-background] text-[--quiz-text]">Loading questions...</div>;
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
      <div className="flex items-center justify-center min-h-screen bg-[--quiz-background] text-[--quiz-text]">
        <Card className="w-full max-w-md rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Quiz Results</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-4xl font-bold">Score: {score} / {questions.length}</div>
            <div className="text-xl">Percentage: {percentage.toFixed(2)}%</div>
            <p className="text-center">{feedbackMessage}</p>
            <Button className="bg-[--quiz-accent] text-black rounded-md p-2 font-semibold hover:bg-yellow-500" onClick={handleRestartQuiz}>
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
    <div className="flex items-center justify-center min-h-screen bg-[--quiz-background] text-[--quiz-text]">
      <Card className="w-full max-w-md rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <p className="text-lg">{currentQuestion.question}</p>
          <div className="grid gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                className={`w-full rounded-md p-2 text-left ${
                  userAnswers[currentQuestionIndex] === option
                    ? 'bg-yellow-200 text-black'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            className="bg-[--quiz-accent] text-black rounded-md p-2 font-semibold hover:bg-yellow-500"
            onClick={handleSubmitAnswer}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
