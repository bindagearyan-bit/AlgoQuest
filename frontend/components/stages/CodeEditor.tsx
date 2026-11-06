'use client';

import React from 'react';
import Editor from '@monaco-editor/react';
import { useStageStore } from '@/lib/store/stageStore';
import { PixelButton } from '../ui/PixelButton';
import { Play, CheckCircle } from 'lucide-react';

interface CodeEditorProps {
  onRun?: () => void;
  onSubmit?: () => void;
  isRunning?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  onRun,
  onSubmit,
  isRunning = false,
}) => {
  const { activeLanguage, setLanguage, codeByLanguage, setCode } = useStageStore();

  const languages = [
    { id: 'python', label: 'Python 3', monacoLang: 'python' },
    { id: 'cpp', label: 'C++', monacoLang: 'cpp' },
    { id: 'java', label: 'Java', monacoLang: 'java' },
    { id: 'c', label: 'C', monacoLang: 'c' },
  ] as const;

  const currentCode =
    codeByLanguage[activeLanguage] ||
    (activeLanguage === 'python'
      ? `class Solution:\n    def solve(self, nums: list[int], target: int) -> list[int]:\n        # Code your algorithm here\n        return [0, 1]`
      : activeLanguage === 'cpp'
      ? `#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solve(vector<int>& nums, int target) {\n        return {0, 1};\n    }\n};`
      : activeLanguage === 'java'
      ? `class Solution {\n    public int[] solve(int[] nums, int target) {\n        return new int[]{0, 1};\n    }\n}`
      : `int* solve(int* nums, int numsSize, int target, int* returnSize) {\n    *returnSize = 2;\n    return 0;\n}`);

  return (
    <div className="w-full rounded-2xl bg-[#09081f] border-2 border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] overflow-hidden flex flex-col">
      {/* Editor Header: Language Tabs & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#120f38] border-b border-[#00F0FF]/30 gap-2">
        {/* Language Tabs */}
        <div className="flex items-center space-x-1">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className={`px-3 py-1.5 rounded-lg font-pixel text-[10px] transition-colors ${
                activeLanguage === lang.id
                  ? 'bg-[#00F0FF] text-[#09081f] font-bold shadow-[0_0_8px_#00F0FF]'
                  : 'bg-transparent text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {onRun && (
            <PixelButton
              variant="outline"
              size="sm"
              onClick={onRun}
              disabled={isRunning}
            >
              <Play size={12} className="mr-1 fill-current" />
              {isRunning ? 'RUNNING...' : 'RUN CODE'}
            </PixelButton>
          )}

          {onSubmit && (
            <PixelButton
              variant="mint"
              size="sm"
              onClick={onSubmit}
              disabled={isRunning}
            >
              <CheckCircle size={12} className="mr-1" />
              SUBMIT QUEST
            </PixelButton>
          )}
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="h-96 w-full">
        <Editor
          height="100%"
          language={languages.find((l) => l.id === activeLanguage)?.monacoLang || 'python'}
          value={currentCode}
          theme="vs-dark"
          onChange={(val) => setCode(activeLanguage, val || '')}
          options={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 13,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

