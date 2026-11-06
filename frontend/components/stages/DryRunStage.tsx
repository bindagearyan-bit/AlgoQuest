'use client';

import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import { Table, CheckCircle } from 'lucide-react';

interface DryRunStageProps {
  title: string;
  content: {
    code?: string;
    traceRows?: Array<{
      iteration: number;
      left: number;
      right: number;
      arrLeft: number;
      arrRight: number;
      sum: number;
      action: string;
    }>;
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

export const DryRunStage: React.FC<DryRunStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  const [activeRow, setActiveRow] = useState(0);

  const rows = content.traceRows || [
    { iteration: 1, left: 0, right: 4, arrLeft: 2, arrRight: 15, sum: 17, action: 'sum < 18 -> left++' },
    { iteration: 2, left: 1, right: 4, arrLeft: 7, arrRight: 15, sum: 22, action: 'sum > 18 -> right--' },
    { iteration: 3, left: 1, right: 3, arrLeft: 7, arrRight: 11, sum: 18, action: 'sum === 18 -> MATCH FOUND!' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PixelCard variant="blue">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#8B7FD9] flex items-center justify-center text-white border-2 border-[#1A2744]">
            <Table size={20} />
          </div>
          <div>
            <span className="font-pixel text-[10px] text-[#8B7FD9]">STAGE 3: DRY RUN INSPECTION</span>
            <h2 className="font-pixel text-sm sm:text-base text-[#1A2744] mt-0.5">{title}</h2>
          </div>
        </div>

        {/* Code to Inspect */}
        <div className="p-4 rounded-xl bg-[#0d0a29] border border-slate-700 text-emerald-300 font-mono text-xs mb-6 overflow-x-auto">
          <pre>{content.code || 'function trace(arr, target) { ... }'}</pre>
        </div>

        {/* Trace Table */}
        <div className="overflow-x-auto rounded-xl border border-[#1A2744]/20 mb-6 bg-white">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#EAF4FC] border-b border-[#1A2744]/20 text-[#1A2744] font-pixel text-[10px]">
              <tr>
                <th className="p-3">LOOP #</th>
                <th className="p-3">LEFT</th>
                <th className="p-3">RIGHT</th>
                <th className="p-3">ARR[L]</th>
                <th className="p-3">ARR[R]</th>
                <th className="p-3">EVAL</th>
                <th className="p-3">ACTION TAKEN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => setActiveRow(idx)}
                  className={`cursor-pointer transition-colors ${
                    activeRow === idx ? 'bg-[#7FFFD4]/20 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="p-3 font-pixel text-[10px]">#{row.iteration}</td>
                  <td className="p-3 text-cyan-600">{row.left}</td>
                  <td className="p-3 text-rose-500">{row.right}</td>
                  <td className="p-3">{row.arrLeft}</td>
                  <td className="p-3">{row.arrRight}</td>
                  <td className="p-3">{row.sum}</td>
                  <td className="p-3 text-[#8B7FD9]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Complete Button */}
        <div className="flex justify-end pt-4 border-t border-[#1A2744]/15">
          <PixelButton
            variant="mint"
            size="lg"
            onClick={onComplete}
            disabled={isCompleting}
          >
            {isCompleting ? 'SAVING...' : 'FINISH DRY RUN (+15 XP)'}
          </PixelButton>
        </div>
      </PixelCard>
    </div>
  );
};

