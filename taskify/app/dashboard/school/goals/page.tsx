"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SemesterGoal {
  id: string;
  course_name: string;
  target_score: number;
  target_grade: string;
}

interface User {
  id: string;
  name: string;
}

export default function SemesterGoals() {
  const [goals, setGoals] = useState<SemesterGoal[]>([]);
  const [newGoal, setNewGoal] = useState({
    course_name: "",
    target_score: 0,
    target_grade: "",
  });
  const [userId, setUserId] = useState<string | null>(null); // Set this based on your user context or authentication
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users
  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error fetching users:", error);
    } else {
      console.log("Users data:", data);
      setUsers(data || []); // Ensure that data is an array
    }
  };

  // Fetch goals
  const fetchGoals = async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("semester_goals")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching goals:", error);
    } else {
      console.log("Goals data:", data);
      setGoals(data || []); // Ensure that data is an array
    }
  };

  // Add goal
  const addGoal = async () => {
    if (!userId) return;

    const { data, error } = await supabase.from("semester_goals").insert([
      {
        user_id: userId,
        course_name: newGoal.course_name,
        target_score: newGoal.target_score,
        target_grade: newGoal.target_grade,
      },
    ]);

    if (error) {
      console.error("Error adding goal:", error);
    } else {
      console.log("Added goal data:", data);
      setGoals([...goals, ...(data || [])]); // Ensure data is an array
      setNewGoal({ course_name: "", target_score: 0, target_grade: "" });
    }
  };

  // Delete goal
  const deleteGoal = async (id: string) => {
    const { error } = await supabase.from("semester_goals").delete().eq("id", id);

    if (error) {
      console.error("Error deleting goal:", error);
    } else {
      setGoals(goals.filter((goal) => goal.id !== id));
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users to populate dropdown or other user-related logic
    fetchGoals(); // Fetch goals based on the current user
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Semester Goals</h1>
      <div className="mb-4">
        <select
          className="mb-2 p-2 border border-gray-300 rounded"
          onChange={(e) => setUserId(e.target.value)}
          value={userId || ""}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <Input
          placeholder="Course Name"
          value={newGoal.course_name}
          onChange={(e) => setNewGoal({ ...newGoal, course_name: e.target.value })}
          className="mb-2"
        />
        <Input
          type="number"
          placeholder="Target Score"
          value={newGoal.target_score}
          onChange={(e) => setNewGoal({ ...newGoal, target_score: Number(e.target.value) })}
          className="mb-2"
        />
        <Input
          placeholder="Target Grade"
          value={newGoal.target_grade}
          onChange={(e) => setNewGoal({ ...newGoal, target_grade: e.target.value })}
          className="mb-2"
        />
        <Button onClick={addGoal}>Add Goal</Button>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Course</th>
            <th className="border-b-2 p-2">Target Score</th>
            <th className="border-b-2 p-2">Target Grade</th>
            <th className="border-b-2 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr key={goal.id}>
              <td className="border-b p-2">{goal.course_name}</td>
              <td className="border-b p-2">{goal.target_score}</td>
              <td className="border-b p-2">{goal.target_grade}</td>
              <td className="border-b p-2">
                <Button variant="ghost" onClick={() => deleteGoal(goal.id)}>
                  Delete
                </Button>
                <Button variant="ghost">
                  Edit {/* Implement edit functionality if needed */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
