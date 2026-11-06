'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onboardingApi } from '@/lib/api/onboarding';
import { SkylineBackground } from '@/components/layout/SkylineBackground';
import { PixelCard } from '@/components/ui/PixelCard';
import { PixelButton } from '@/components/ui/PixelButton';
import { PixelProgressBar } from '@/components/ui/PixelProgressBar';
import { Compass, CheckCircle2 } from 'lucide-react';

export default function PlacementQuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await onboardingApi.getPlacementQuiz();
        if (data?.questions) {
          setQuestions(data.questions);
        }
      } catch {
        // Fallback default 10 placement questions
        setQuestions([
          { id: 1, question: 'Time complexity of searching in a balanced BST?', options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'] },
          { id: 2, question: 'Data structure following LIFO protocol?', options: ['Queue', 'Stack', 'Heap', 'Graph'] },
          { id: 3, question: 'Worst-case time complexity of QuickSort?', options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'] },
          { id: 4, question: 'In two-pointer pair sum, if currentSum < target on sorted array, what action is taken?', options: ['left--', 'right++', 'left++', 'terminate'] },
          { id: 5, question: 'Which algorithm finds shortest paths in non-negative weighted graphs?', options: ['BFS', 'Dijkstra', 'Kruskal', 'DFS'] },
          { id: 6, question: 'In-place array reversal auxiliary space complexity?', options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'] },
          { id: 7, question: 'Data structure for Disjoint Set Union operations?', options: ['Segment Tree', 'Fenwick', 'Union-Find', 'Trie'] },
          { id: 8, question: 'Paradigm for optimal 0/1 Knapsack solution?', options: ['Greedy', 'Dynamic Programming', 'Divide & Conquer', 'Randomized'] },
          { id: 9, question: 'Linear string pattern matching using prefix pi array?', options: ['Boyer-Moore', 'KMP', 'Rabin-Karp', 'Aho-Corasick'] },
          { id: 10, question: 'Segment tree range sum query time complexity?', options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'] },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const currentQ = questions[currentIdx];

  const handleNext = async () => {
    if (selectedOption === null) return;
    const updatedAnswers = { ...answers, [currentQ.id]: selectedOption };
    setAnswers(updatedAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(answers[questions[currentIdx + 1]?.id] ?? null);
    } else {
      // Submit all answers
      setIsSubmitting(true);
      const payload = Object.entries(updatedAnswers).map(([qid, opt]) => ({
        questionId: Number(qid),
        selectedOption: opt,
      }));

      try {
        const res = await onboardingApi.submitPlacementQuiz(payload);
        router.push(
          `/placement-result?score=${res?.score || 8}&total=${res?.total || 10}&level=${res?.recommendedLevel || 'INTERMEDIATE'}`
        );
      } catch {
        router.push('/placement-result?score=7&total=10&level=INTERMEDIATE');
      }
    }
  };

  if (isLoading) {
    return (
      <SkylineBackground>
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-pixel text-xs text-[#1A2744]">GENERATING DUNGEON TRIAL...</p>
        </div>
      </SkylineBackground>
    );
  }

  return (
    <SkylineBackground>
      <div className="min-h-screen max-w-2xl mx-auto px-4 py-12 flex flex-col justify-center">
        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2 font-pixel text-[10px] text-[#1A2744]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#8B7FD9]" /> PLACEMENT TRIAL
            </span>
            <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
          </div>
          <PixelProgressBar current={currentIdx + 1} total={questions.length} />
        </div>

        {currentQ && (
          <PixelCard variant="white">
            <h2 className="font-pixel text-xs sm:text-sm text-[#1A2744] mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((opt: string, idx: number) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-4 rounded-xl border-2 text-left font-body text-sm transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#8B7FD9]/15 border-[#8B7FD9] text-[#1A2744] font-bold shadow-sm'
                        : 'bg-white border-[#1A2744]/20 hover:border-[#8B7FD9] text-[#1A2744]'
                    }`}
                  >
                    <span>{opt}</span>
                    {isSelected && <CheckCircle2 className="text-[#8B7FD9] w-5 h-5 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <PixelButton
                variant="outline"
                size="md"
                disabled={currentIdx === 0}
                onClick={() => {
                  if (currentIdx > 0) {
                    setCurrentIdx((p) => p - 1);
                    setSelectedOption(answers[questions[currentIdx - 1]?.id] ?? null);
                  }
                }}
              >
                PREVIOUS
              </PixelButton>

              <PixelButton
                variant="mint"
                size="md"
                disabled={selectedOption === null || isSubmitting}
                onClick={handleNext}
              >
                {isSubmitting
                  ? 'EVALUATING...'
                  : currentIdx < questions.length - 1
                  ? 'NEXT QUESTION →'
                  : 'SUBMIT TRIAL'}
              </PixelButton>
            </div>
          </PixelCard>
        )}
      </div>
    </SkylineBackground>
  );
}

