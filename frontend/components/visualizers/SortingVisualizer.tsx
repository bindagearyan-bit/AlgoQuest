'use client';

import React, { useState } from 'react';
import { ArrayVisualizer } from './ArrayVisualizer';

export const SortingVisualizer: React.FC = () => {
  return (
    <div className="w-full">
      <ArrayVisualizer
        initialArray={[80, 25, 45, 12, 90, 60, 30, 50]}
        steps={[
          { activeIndices: [0, 1], pointerLeft: 0, pointerRight: 1, action: 'Comparing 80 and 25 -> Swap required', codeLine: 'if (arr[j] > arr[j+1]) swap(arr[j], arr[j+1]);' },
          { activeIndices: [1, 2], pointerLeft: 1, pointerRight: 2, action: 'Comparing 80 and 45 -> Swap required', codeLine: 'swap(arr[1], arr[2]);' },
          { activeIndices: [2, 3], pointerLeft: 2, pointerRight: 3, action: 'Comparing 80 and 12 -> Swap required', codeLine: 'swap(arr[2], arr[3]);' },
          { activeIndices: [3, 4], pointerLeft: 3, pointerRight: 4, action: 'Comparing 80 and 90 -> In order, continue', codeLine: 'j++;' },
          { activeIndices: [4, 5], pointerLeft: 4, pointerRight: 5, action: 'Comparing 90 and 60 -> Swap required', codeLine: 'swap(arr[4], arr[5]);' },
          { activeIndices: [6, 7], pointerLeft: 6, pointerRight: 7, action: 'Pass 1 complete. Largest value in position.', codeLine: '// Bubble pass finished' },
        ]}
      />
    </div>
  );
};

