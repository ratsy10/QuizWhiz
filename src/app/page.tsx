
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quizTopics = [
  "History",
  "Science",
  "Pop Culture",
  "Geography",
  "Literature",
  "Sports"
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const router = useRouter();

  const handleStartQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz?topic=${selectedTopic}`);
    } else {
      alert("Please select a topic to start the quiz.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[--quiz-background] text-[--quiz-text]">
      <Card className="w-full max-w-md rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Quiz Master
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Select onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              {quizTopics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-[--quiz-accent] text-black rounded-md p-2 font-semibold hover:bg-yellow-500"
            onClick={handleStartQuiz}
            disabled={!selectedTopic}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

