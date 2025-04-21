'use server';

/**
 * @fileOverview Generates multiple-choice quiz questions based on a selected topic and difficulty using AI.
 *
 * - generateQuizQuestions - A function that handles the quiz question generation process.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateQuizQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate quiz questions.'),
  difficulty: z.string().describe('The difficulty level of the quiz questions (Easy, Medium, Hard).'),
});

export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe('The quiz question.'),
      options: z.array(z.string()).describe('The possible answer options.'),
      correctAnswer: z.string().describe('The correct answer to the question.'),
    })
  ).describe('An array of quiz questions with options and correct answers.'),
});

export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;

export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const generateQuizQuestionsPrompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic for which to generate quiz questions.'),
      difficulty: z.string().describe('The difficulty level of the quiz questions (Easy, Medium, Hard).'),
    }),
  },
  output: {
    schema: z.object({
      questions: z.array(
        z.object({
          question: z.string().describe('The quiz question.'),
          options: z.array(z.string()).describe('The possible answer options.'),
          correctAnswer: z.string().describe('The correct answer to the question.'),
        })
      ).describe('An array of quiz questions with options and correct answers.'),
    }),
  },
  prompt: `You are a quiz generator. Generate 5 multiple-choice questions based on the topic and difficulty provided.

Topic: {{{topic}}}
Difficulty: {{{difficulty}}}

Each question should have 4 answer options, with one correct answer.  Make sure one of the options is the correct answer.

Consider the difficulty when generating questions. Easy questions should be straightforward and based on common knowledge. Medium questions should require some understanding of the topic. Hard questions should be challenging and require in-depth knowledge.

Format the output as a JSON object with a "questions" field. The "questions" field should be an array of question objects.
Each question object should have the following fields:
- "question": the text of the question
- "options": an array of 4 strings, representing the answer options
- "correctAnswer": the correct answer to the question (must be one of the entries in "options")`,
});

const generateQuizQuestionsFlow = ai.defineFlow<
  typeof GenerateQuizQuestionsInputSchema,
  typeof GenerateQuizQuestionsOutputSchema
>({
  name: 'generateQuizQuestionsFlow',
  inputSchema: GenerateQuizQuestionsInputSchema,
  outputSchema: GenerateQuizQuestionsOutputSchema,
}, async input => {
  const {output} = await generateQuizQuestionsPrompt(input);
  return output!;
});
