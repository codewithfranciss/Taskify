'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';

type Flashcard = {
  id: string;
  question: string;
  answer: string;
  course_id: string;
};

export default function Page() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isQuizDialogOpen, setQuizDialogOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchFlashcards = async () => {
      const { data: flashcards, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('course_id', id);

      if (error) {
        console.error('Error fetching flashcards:', error);
      } else {
        setFlashcards(flashcards);
      }
    };

    if (id) {
      fetchFlashcards();
    }
  }, [id]);

  const handleCreateFlashcard = async () => {
    if (!question || !answer) return;

    const { data, error } = await supabase
      .from('flashcards')
      .insert({ question, answer, course_id: id })
      .select();

    if (error) {
      console.error('Error creating flashcard:', error);
    } else {
      setFlashcards([...flashcards, data[0]]);
      setQuestion('');
      setAnswer('');
      setDialogOpen(false);
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    );
  };

  const handleDeleteFlashcard = async (flashcardId: string) => {
    const { error } = await supabase
      .from('flashcards')
      .delete()
      .eq('id', flashcardId);

    if (error) {
      console.error('Error deleting flashcard:', error);
    } else {
      setFlashcards(flashcards.filter((fc) => fc.id !== flashcardId));
    }
  };

  return (
    <div className="m-7">
      <h1 className="text-lg font-bold">Flashcards</h1>

      {/* Flashcard Creation Dialog */}
      <div className="my-4">
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-black text-white" variant="outline">
              Create Flashcard
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a New Flashcard</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right">
                  Question:
                </Label>
                <Input
                  id="question"
                  placeholder="e.g., What is React?"
                  className="col-span-3"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answer" className="text-right">
                  Answer:
                </Label>
                <Input
                  id="answer"
                  placeholder="e.g., A JavaScript library for building UIs"
                  className="col-span-3"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleCreateFlashcard}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Start Quiz Dialog */}
      <div className="my-4">
        <Dialog open={isQuizDialogOpen} onOpenChange={setQuizDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white">Start Quiz</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Quiz Time!</DialogTitle>
            </DialogHeader>
            {flashcards.length > 0 && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{flashcards[currentFlashcardIndex].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  {showAnswer && (
                    <CardDescription>
                      {flashcards[currentFlashcardIndex].answer}
                    </CardDescription>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={handlePrevious}>Previous</Button>
                  <Button onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                  </Button>
                  <Button onClick={handleNext}>Next</Button>
                </CardFooter>
              </Card>
            )}
            {flashcards.length === 0 && <p>No flashcards available. Please create one!</p>}
          </DialogContent>
        </Dialog>
      </div>

      {/* Flashcard List */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcards.map((flashcard) => (
          <Card key={flashcard.id} className="relative">
            <CardHeader>
              <CardTitle>{flashcard.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{flashcard.answer}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="bg-red-500 text-white"
                onClick={() => handleDeleteFlashcard(flashcard.id)}
              >
                Delete
              </Button>
              {/* Add edit functionality as needed */}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
