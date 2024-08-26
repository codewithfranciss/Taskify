"use client";

import React, { useState, useEffect } from 'react';

const DEFAULT_POMODORO_DURATION = 25 * 60; // 25 minutes
const DEFAULT_SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
const DEFAULT_LONG_BREAK_DURATION = 15 * 60; // 15 minutes

export default function Pomodoro() {
  const [pomodoroDuration, setPomodoroDuration] = useState(DEFAULT_POMODORO_DURATION);
  const [shortBreakDuration, setShortBreakDuration] = useState(DEFAULT_SHORT_BREAK_DURATION);
  const [longBreakDuration, setLongBreakDuration] = useState(DEFAULT_LONG_BREAK_DURATION);

  const [timeLeft, setTimeLeft] = useState(pomodoroDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isBreakChoiceOpen, setIsBreakChoiceOpen] = useState(false);
  const [breakType, setBreakType] = useState<'short' | 'long' | null>(null);
  const [task, setTask] = useState('');
  const [isTaskInputOpen, setIsTaskInputOpen] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isActive) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer!);
            setIsActive(false);
            if (isPomodoro) {
              // Ask user to choose a break type
              setIsBreakChoiceOpen(true);
              setIsPomodoro(false);
            } else {
              // Switch back to Pomodoro
              setIsPomodoro(true);
              setTimeLeft(pomodoroDuration);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(timer!);
    }
    return () => clearInterval(timer!);
  }, [isActive, timeLeft, isPomodoro, pomodoroDuration, shortBreakDuration]);

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pomodoro' | 'short' | 'long') => {
    const value = Number(e.target.value) * 60;
    switch (type) {
      case 'pomodoro':
        setPomodoroDuration(value);
        if (isPomodoro) setTimeLeft(value);
        break;
      case 'short':
        setShortBreakDuration(value);
        break;
      case 'long':
        setLongBreakDuration(value);
        break;
      default:
        break;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBreakChoice = (type: 'short' | 'long') => {
    setBreakType(type);
    setIsBreakChoiceOpen(false);
    setTimeLeft(type === 'short' ? shortBreakDuration : longBreakDuration);
    setIsActive(true);
  };

  const handleStartPomodoro = () => {
    if (task.trim() === '') {
      alert('Please enter a task before starting the Pomodoro timer.');
      return;
    }
    setIsTaskInputOpen(false);
    setTimeLeft(pomodoroDuration);
    setIsActive(true);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{task}</h1>

      {isTaskInputOpen ? (
        <div className="flex flex-col items-center mb-4">
          <label className="flex flex-col text-2xl items-center mb-4">
            Task:
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="mt-1 p-2 border rounded"
              placeholder="Enter your task"
            />
          </label>
          <button
            onClick={handleStartPomodoro}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
          >
            Start Pomodoro
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-4">
          <div className="flex space-x-4 mb-2">
            <label className="flex flex-col items-center">
              Pomodoro Duration:
              <input
                type="number"
                min="1"
                value={Math.floor(pomodoroDuration / 60)}
                onChange={(e) => handleDurationChange(e, 'pomodoro')}
                className="mt-1 p-1 border rounded"
              />
              minutes
            </label>
            <label className="flex flex-col items-center">
              Short Break Duration:
              <input
                type="number"
                min="1"
                value={Math.floor(shortBreakDuration / 60)}
                onChange={(e) => handleDurationChange(e, 'short')}
                className="mt-1 p-1 border rounded"
              />
              minutes
            </label>
            <label className="flex flex-col items-center">
              Long Break Duration:
              <input
                type="number"
                min="1"
                value={Math.floor(longBreakDuration / 60)}
                onChange={(e) => handleDurationChange(e, 'long')}
                className="mt-1 p-1 border rounded"
              />
              minutes
            </label>
          </div>

          <div className="text-4xl font-bold mb-4">
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 text-white font-bold rounded ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
        </div>
      )}

      {/* Break Choice Modal */}
      {isBreakChoiceOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Break Time!</h2>
            <p className="mb-4">Choose between a short or long break:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleBreakChoice('short')}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
              >
                Short Break
              </button>
              <button
                onClick={() => handleBreakChoice('long')}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded"
              >
                Long Break
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
