'use client';

import { useState } from 'react';
import ChallengeGrid from './ChallengeGrid';

const filters = [
  { id: 'all', label: 'All Problems', count: 124 },
  { id: 'easy', label: 'Easy', count: 45 },
  { id: 'medium', label: 'Medium', count: 52 },
  { id: 'hard', label: 'Hard', count: 27 },
];

const challenges = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description:
      'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
    completedCount: 8920,
    totalAttempts: 12400,
    successRate: 72,
    status: 'completed',
    points: 10,
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    description:
      'Reverse a singly linked list. Implement both iterative and recursive solutions.',
    completedCount: 6540,
    totalAttempts: 9800,
    successRate: 67,
    status: 'completed',
    points: 10,
  },
  {
    id: 3,
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Arrays',
    description:
      'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    completedCount: 4320,
    totalAttempts: 8900,
    successRate: 49,
    status: 'pending',
    points: 20,
  },
  {
    id: 4,
    title: 'LRU Cache',
    difficulty: 'Medium',
    category: 'Design',
    description:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    completedCount: 3210,
    totalAttempts: 7600,
    successRate: 42,
    status: 'pending',
    points: 20,
  },
  {
    id: 5,
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Arrays',
    description:
      'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    completedCount: 1890,
    totalAttempts: 6200,
    successRate: 30,
    status: 'completed',
    points: 40,
  },
  {
    id: 6,
    title: 'Regular Expression Matching',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    description:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
    completedCount: 980,
    totalAttempts: 4500,
    successRate: 22,
    status: 'pending',
    points: 40,
  },
  {
    id: 7,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    completedCount: 10200,
    totalAttempts: 13500,
    successRate: 76,
    status: 'completed',
    points: 10,
  },
  {
    id: 8,
    title: 'Binary Tree Level Order',
    difficulty: 'Medium',
    category: 'Tree',
    description:
      "Given the root of a binary tree, return the level order traversal of its nodes' values.",
    completedCount: 5100,
    totalAttempts: 8200,
    successRate: 62,
    status: 'pending',
    points: 20,
  },
];

export default function ChallengeFilters() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredChallenges = challenges.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.difficulty.toLowerCase() === activeFilter;
  });

  const completedCount = challenges.filter(
    (c) => c.status === 'completed'
  ).length;

  return (
    <div className="max-w-6xl mt-2 mx-auto px-6 lg:px-8  relative z-10 pb-12">
      {/* Top Stats Bar */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0004ff] flex items-center justify-center">
            <span className="font-['inter-bold'] text-sm text-white">
              {completedCount}
            </span>
          </div>
          <div>
            <span className="font-['inter-semi'] text-sm text-[#0a0a0a] block">
              Completed
            </span>
            <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30">
              {completedCount} of {challenges.length} solved
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs ml-8">
          <div className="flex-1 h-2 rounded-full bg-[#0a0a0a]/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0004ff] transition-all duration-500"
              style={{
                width: `${(completedCount / challenges.length) * 100}%`,
              }}
            />
          </div>
          <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/40">
            {Math.round((completedCount / challenges.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit mb-8 sm:mb-10 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`relative px-4 sm:px-5 py-2.5 rounded-lg text-sm font-['inter-semi'] transition-all duration-200 whitespace-nowrap ${
              activeFilter === filter.id
                ? 'bg-[#0a0a0a] text-white'
                : 'text-[#0a0a0a]/30 hover:text-[#0a0a0a]'
            }`}
          >
            {filter.label}
            <span
              className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                activeFilter === filter.id
                  ? 'bg-white/20 text-white'
                  : 'bg-[#0a0a0a]/5 text-[#0a0a0a]/30'
              }`}
            >
              {filter.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <ChallengeGrid challenges={filteredChallenges} />
    </div>
  );
}
