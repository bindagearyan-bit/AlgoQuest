// Deterministic Date-Seeded Dungeon Generator for Daily Algorithm Escape Room
// Generates identical 10-room dungeons globally on any given UTC date string (YYYY-MM-DD)
// Zero AI, Zero external APIs, 100% deterministic, instant, and reliable.

export interface EscapeRoomData {
  roomNumber: number;
  title: string;
  topic: string;
  prompt: string;
  visualType: string;
  visualData: any;
  options: any[];
  correctAnswer: any;
  isCheckpoint?: boolean;
  explanation: string;
}

export interface DailyDungeon {
  dateString: string;
  formattedDate: string;
  title: string;
  tagline: string;
  rooms: EscapeRoomData[];
  requiredVaultKeys: string[];
}

// PRNG: Mulberry32 seeded by 32-bit integer hash of UTC date string
function createPrng(seedStr: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  let s = h >>> 0;

  return function next(): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateDailyDungeon(dateStr: string): DailyDungeon {
  const rng = createPrng(dateStr);

  const randInt = (min: number, max: number) => {
    return Math.floor(rng() * (max - min + 1)) + min;
  };

  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Format date human-readable
  const parts = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[parseInt(parts[1] || '1', 10) - 1] || 'Today';
  const formattedDate = `${monthName} ${parts[2] || '1'}, ${parts[0] || '2026'}`;

  // Room 1: Array Indexing Hall
  const itemPool = [
    { name: 'Key', icon: '🗝️' },
    { name: 'Torch', icon: '🔦' },
    { name: 'Potion', icon: '🧪' },
    { name: 'Gem', icon: '💎' },
    { name: 'Shield', icon: '🛡️' },
    { name: 'Book', icon: '📖' },
    { name: 'Coin', icon: '🪙' },
    { name: 'Map', icon: '🗺️' },
    { name: 'Scroll', icon: '📜' },
    { name: 'Wand', icon: '🪄' },
  ];
  const r1Shuffled = shuffle(itemPool).slice(0, 4);
  const targetIndex = randInt(0, 3);
  const targetItem = r1Shuffled[targetIndex];

  const room1: EscapeRoomData = {
    roomNumber: 1,
    title: 'Array Indexing Hall',
    topic: '0-Based Indexing',
    prompt: `Step on Items[${targetIndex}] (${targetItem.icon} ${targetItem.name}) to disarm the door trap!`,
    visualType: 'ARRAY_TILES',
    visualData: {
      items: r1Shuffled.map((item, idx) => ({ index: idx, name: item.name, icon: item.icon })),
      targetIndex,
    },
    options: r1Shuffled.map((item, idx) => ({
      id: idx,
      label: `[${idx}] ${item.icon} ${item.name}`,
      value: idx,
    })),
    correctAnswer: targetIndex,
    explanation: `In standard programming languages, arrays are 0-indexed. Items[${targetIndex}] points to the tile at index ${targetIndex}.`,
  };

  // Room 2: Boundary Spike Pit
  const arrayLength = randInt(4, 7);
  const invalidIndex = arrayLength; // exact out-of-bounds boundary
  const validIndices = [0, randInt(1, arrayLength - 2), arrayLength - 1];
  const r2Options = shuffle([
    ...validIndices.map(v => ({ label: `Index [${v}]`, value: v })),
    { label: `Index [${invalidIndex}]`, value: invalidIndex },
  ]);

  const room2: EscapeRoomData = {
    roomNumber: 2,
    title: 'Boundary Spike Pit',
    topic: 'Array Bounds & Length',
    prompt: `The bridge gate reads: "Array Length = ${arrayLength}". Which index triggers an IndexOutOfBounds exception?`,
    visualType: 'SPIKE_PIT',
    visualData: {
      arrayLength,
      validRange: `0 to ${arrayLength - 1}`,
      spikeIndex: invalidIndex,
    },
    options: r2Options,
    correctAnswer: invalidIndex,
    explanation: `An array of length ${arrayLength} has valid indices from 0 to ${arrayLength - 1}. Accessing index ${arrayLength} attempts to read past the allocated buffer!`,
  };

  // Room 3: Stack Rune Pillar (LIFO)
  const runeColors = [
    { name: 'Red', hex: '#FF4757', icon: '🔴' },
    { name: 'Blue', hex: '#1E90FF', icon: '🔵' },
    { name: 'Gold', hex: '#FFD700', icon: '🟡' },
    { name: 'Emerald', hex: '#2ED573', icon: '🟢' },
    { name: 'Purple', hex: '#9B51E0', icon: '🟣' },
  ];
  const shuffledRunes = shuffle(runeColors).slice(0, 4); // bottom to top
  // target rune is at index 1 or 2 (so requires 1 or 2 pops to reach top)
  const targetRuneIdx = randInt(1, 2);
  const targetRune = shuffledRunes[targetRuneIdx];
  const popsNeeded = 3 - targetRuneIdx;

  const room3: EscapeRoomData = {
    roomNumber: 3,
    title: 'Stack Rune Pillar',
    topic: 'Stack LIFO (Last-In, First-Out)',
    prompt: `Pop runes from the pillar until the ${targetRune.name} Rune ${targetRune.icon} is on TOP of the stack!`,
    visualType: 'STACK_PILLAR',
    visualData: {
      initialStack: shuffledRunes.map(r => ({ name: r.name, hex: r.hex, icon: r.icon })),
      targetRune: targetRune.name,
      popsNeeded,
    },
    options: [
      { label: 'Pop 1 Rune', value: 1 },
      { label: 'Pop 2 Runes', value: 2 },
      { label: 'Pop 3 Runes', value: 3 },
    ],
    correctAnswer: popsNeeded,
    explanation: `Stacks operate on LIFO (Last-In, First-Out). To reveal the ${targetRune.name} rune, you must pop the ${popsNeeded} rune(s) sitting above it.`,
  };

  // Room 4: Stack Overflow Trap
  const isOverflow = rng() > 0.5;
  const capacity = 5;

  const room4: EscapeRoomData = {
    roomNumber: 4,
    title: 'Stack Overflow Trap',
    topic: 'Overflow vs Underflow',
    prompt: isOverflow
      ? `The stone stack is at maximum capacity (${capacity}/${capacity} bricks). What action avoids a CRITICAL STACK OVERFLOW?`
      : `The stone stack is empty (0/${capacity} bricks). What action avoids an ILLEGAL STACK UNDERFLOW?`,
    visualType: 'STACK_TRAP',
    visualData: {
      capacity,
      currentCount: isOverflow ? capacity : 0,
      mode: isOverflow ? 'OVERFLOW' : 'UNDERFLOW',
    },
    options: [
      { label: 'POP BRICK (Remove)', value: 'POP' },
      { label: 'PUSH BRICK (Add)', value: 'PUSH' },
    ],
    correctAnswer: isOverflow ? 'POP' : 'PUSH',
    explanation: isOverflow
      ? 'Pushing to a completely full stack causes a Stack Overflow! You must POP to relieve memory pressure.'
      : 'Popping from an empty stack triggers a Stack Underflow! You must PUSH to initialize data.',
  };

  // Room 5: Queue Dungeon Gate (FIFO) — CHECKPOINT ROOM
  const adventurerPool = [
    { role: 'Knight', icon: '⚔️', title: 'Sir Gallant' },
    { role: 'Wizard', icon: '🧙', title: 'Archmage Zephyr' },
    { role: 'Rogue', icon: '🗡️', title: 'Shadow Vesper' },
    { role: 'Paladin', icon: '🛡️', title: 'Lady Solaria' },
    { role: 'Archer', icon: '🏹', title: 'Hawk-eye Robin' },
    { role: 'Cleric', icon: '✨', title: 'Priestess Elysia' },
  ];
  const queueMembers = shuffle(adventurerPool).slice(0, 3);
  const firstInLine = queueMembers[0];

  const room5: EscapeRoomData = {
    roomNumber: 5,
    title: 'Queue Dungeon Gate',
    topic: 'Queue FIFO (First-In, First-Out)',
    prompt: `The adventurers queued up in order: [Front: ${queueMembers[0].role}] -> [${queueMembers[1].role}] -> [Rear: ${queueMembers[2].role}]. Who exits the Dungeon Gate FIRST?`,
    visualType: 'QUEUE_LINE',
    visualData: {
      queue: queueMembers.map((m, idx) => ({ ...m, position: idx === 0 ? 'Front' : idx === 2 ? 'Rear' : 'Middle' })),
      firstRole: firstInLine.role,
    },
    options: queueMembers.map(m => ({
      label: `${m.icon} ${m.role} (${m.title})`,
      value: m.role,
    })),
    correctAnswer: firstInLine.role,
    isCheckpoint: true,
    explanation: `Queues enforce FIFO (First-In, First-Out). ${firstInLine.role} joined the front of the queue first, so ${firstInLine.role} is dequeued first! CHECKPOINT SAVED.`,
  };

  // Room 6: Loop Counter Bridge
  const bridgePlanks = randInt(4, 8);
  const r6Options = shuffle([
    { label: `${bridgePlanks - 1} planks`, value: bridgePlanks - 1 },
    { label: `${bridgePlanks} planks`, value: bridgePlanks },
    { label: `${bridgePlanks + 1} planks`, value: bridgePlanks + 1 },
  ]);

  const room6: EscapeRoomData = {
    roomNumber: 6,
    title: 'Loop Counter Bridge',
    topic: 'Iteration Bounds',
    prompt: `Inspect the bridge mechanism code. How many planks will the hero cross before the loop terminates?`,
    visualType: 'LOOP_BRIDGE',
    visualData: {
      planksCount: bridgePlanks,
      code: `for (int i = 0; i < ${bridgePlanks}; i++) {\n    hero.crossPlank(i);\n}`,
    },
    options: r6Options,
    correctAnswer: bridgePlanks,
    explanation: `The loop starts at i = 0 and runs while i < ${bridgePlanks}. It executes exactly ${bridgePlanks} times (indices 0 to ${bridgePlanks - 1}).`,
  };

  // Room 7: If-Else Gate
  const depthValue = randInt(6, 18);
  const threshold = randInt(8, 14);
  const operator = depthValue > threshold ? '>' : '<=';
  const gateCorrect = depthValue > threshold ? 'RED' : 'GREEN';

  const room7: EscapeRoomData = {
    roomNumber: 7,
    title: 'If-Else Conditional Gate',
    topic: 'Boolean Branching Logic',
    prompt: `The dungeon depth is currently ${depthValue}. Follow the ancient stone runes to choose the correct door!`,
    visualType: 'IF_ELSE_DOORS',
    visualData: {
      depth: depthValue,
      threshold,
      code: `int depth = ${depthValue};\nif (depth > ${threshold}) {\n    unlockDoor("RED");\n} else {\n    unlockDoor("GREEN");\n}`,
    },
    options: [
      { label: '🔴 RED DOOR', value: 'RED' },
      { label: '🟢 GREEN DOOR', value: 'GREEN' },
    ],
    correctAnswer: gateCorrect,
    explanation: `Since depth (${depthValue}) ${operator} ${threshold}, the condition evaluates to ${depthValue > threshold ? 'TRUE' : 'FALSE'}, opening the ${gateCorrect} door!`,
  };

  // Room 8: Linked List Chain
  const nodeValues = [randInt(10, 25), randInt(30, 50), randInt(60, 99)];

  const room8: EscapeRoomData = {
    roomNumber: 8,
    title: 'Linked List Chain',
    topic: 'Terminating NULL Pointer',
    prompt: `Inspect the linked list chain: [${nodeValues[0]}] -> [${nodeValues[1]}] -> [${nodeValues[2]}] -> ?. Where does the NEXT pointer of the tail node lead?`,
    visualType: 'LINKED_LIST',
    visualData: {
      nodes: nodeValues,
    },
    options: shuffle([
      { label: 'NULL / nil (End of List)', value: 'NULL' },
      { label: `Node [${nodeValues[0]}] (Head Loop)`, value: 'HEAD' },
      { label: `Node [${nodeValues[1]}] (Middle Node)`, value: 'MIDDLE' },
    ]),
    correctAnswer: 'NULL',
    explanation: 'In a standard singly linked list, the tail node’s next pointer points to NULL, indicating the boundary of the chain.',
  };

  // Room 9: Recursion Portal
  const baseCases = [
    'if (n <= 1) return 1;',
    'if (n == 0) return 0;',
    'if (node == NULL) return;',
  ];
  const infiniteDecoys = [
    'return n * factorial(n);',
    'while (true) { n++; }',
    'return solve(n + 1);',
    'return solve(n);',
  ];
  const chosenBase = baseCases[randInt(0, baseCases.length - 1)];
  const chosenDecoys = shuffle(infiniteDecoys).slice(0, 2);
  const r9Options = shuffle([
    { label: chosenBase, value: 'BASE_CASE', isCorrect: true },
    { label: chosenDecoys[0], value: 'DECOY_1', isCorrect: false },
    { label: chosenDecoys[1], value: 'DECOY_2', isCorrect: false },
  ]);

  const room9: EscapeRoomData = {
    roomNumber: 9,
    title: 'Recursion Portal',
    topic: 'Recursive Base Case',
    prompt: 'Step through the valid BASE CASE portal to escape infinite call stack recursion!',
    visualType: 'RECURSION_PORTAL',
    visualData: {
      portals: r9Options,
    },
    options: r9Options.map((p, idx) => ({
      id: idx,
      label: p.label,
      value: p.value,
    })),
    correctAnswer: 'BASE_CASE',
    explanation: `"${chosenBase}" provides a terminal condition that returns without recursing, preventing infinite call stack overflow!`,
  };

  // Room 10: Final Boss - The Logic Vault
  const keySymbols = [
    { id: 'KEY_GOLD', name: 'Golden Key', icon: '🔑' },
    { id: 'KEY_LIGHTNING', name: 'Lightning Sigil', icon: '⚡' },
    { id: 'KEY_GEM', name: 'Dragon Gem', icon: '💎' },
    { id: 'KEY_COIN', name: 'Ancient Coin', icon: '🪙' },
    { id: 'KEY_SCROLL', name: 'Mystic Scroll', icon: '📜' },
    { id: 'KEY_ORB', name: 'Astral Orb', icon: '🔮' },
  ];
  const pickedKeys = shuffle(keySymbols).slice(0, 3);
  const vaultSequence = shuffle(pickedKeys);

  const room10: EscapeRoomData = {
    roomNumber: 10,
    title: 'The Logic Vault',
    topic: 'Final Sequence Verification',
    prompt: `The Ancient Vault demands the 3 collected keys in precise order: ${vaultSequence.map(k => `${k.icon} ${k.name}`).join('  ➔  ')}. Insert them in this sequence!`,
    visualType: 'LOGIC_VAULT',
    visualData: {
      requiredSequence: vaultSequence.map(k => ({ id: k.id, name: k.name, icon: k.icon })),
      collectedKeys: pickedKeys.map(k => ({ id: k.id, name: k.name, icon: k.icon })),
    },
    options: shuffle(pickedKeys).map(k => ({
      id: k.id,
      label: `${k.icon} ${k.name}`,
      value: k.id,
    })),
    correctAnswer: vaultSequence.map(k => k.id),
    explanation: 'The vault seals lock in place! You have unlocked the dungeon exit and conquered today’s trial!',
  };

  return {
    dateString: dateStr,
    formattedDate,
    title: 'Daily Algorithm Escape Room',
    tagline: 'A new dungeon awaits every day. Can you escape?',
    rooms: [room1, room2, room3, room4, room5, room6, room7, room8, room9, room10],
    requiredVaultKeys: vaultSequence.map(k => k.name),
  };
}
