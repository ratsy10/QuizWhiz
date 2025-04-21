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

const difficulties = [
  "Easy",
  "Medium",
  "Hard",
];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const router = useRouter();

  const handleStartQuiz = () => {
    if (selectedTopic && selectedDifficulty) {
      router.push(`/quiz?topic=${encodeURIComponent(selectedTopic)}&difficulty=${encodeURIComponent(selectedDifficulty)}`);
    } else {
      alert("Please select a topic and difficulty to start the quiz.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md rounded-lg shadow-md bg-[--card] text-[--card-foreground]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            AI Quiz Master
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Select onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full bg-[--input] text-[--foreground]">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="bg-[--popover] text-[--popover-foreground]">
              {quizTopics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full bg-[--input] text-[--foreground]">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-[--popover] text-[--popover-foreground]">
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="glowing-button"
            onClick={handleStartQuiz}
            disabled={!selectedTopic || !selectedDifficulty}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

