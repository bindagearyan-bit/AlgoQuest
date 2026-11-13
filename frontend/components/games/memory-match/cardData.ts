// 16-Bit Pixel-Art Data Structure Card Pair Definitions
// Authentic retro arcade sprites with shape-rendering="crispEdges"

export interface CardPairDefinition {
  pairId: string;
  name: string;
  subtitle: string;
  description: string;
  iconSvg: string;
}

export const CARD_PAIRS: CardPairDefinition[] = [
  {
    pairId: 'ds_array',
    name: 'ARRAY',
    subtitle: 'Contiguous Memory',
    description: 'Fixed-size sequence of elements stored at contiguous memory addresses with O(1) random indexing.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Outer Array Frame -->
      <rect x="2" y="10" width="28" height="12" fill="#1B2A4A"/>
      <rect x="3" y="11" width="26" height="10" fill="#2E4A7D"/>

      <!-- Block 0: Value 1 -->
      <rect x="4" y="12" width="4" height="8" fill="#7FFFD4"/>
      <rect x="6" y="13" width="1" height="6" fill="#1B2A4A"/>
      <rect x="5" y="14" width="1" height="1" fill="#1B2A4A"/>

      <!-- Divider 1 -->
      <rect x="9" y="11" width="1" height="10" fill="#1B2A4A"/>

      <!-- Block 1: Value 2 -->
      <rect x="10" y="12" width="4" height="8" fill="#FFD93D"/>
      <rect x="11" y="13" width="2" height="1" fill="#1B2A4A"/>
      <rect x="13" y="14" width="1" height="2" fill="#1B2A4A"/>
      <rect x="11" y="16" width="3" height="1" fill="#1B2A4A"/>
      <rect x="11" y="17" width="1" height="1" fill="#1B2A4A"/>
      <rect x="11" y="18" width="3" height="1" fill="#1B2A4A"/>

      <!-- Divider 2 -->
      <rect x="15" y="11" width="1" height="10" fill="#1B2A4A"/>

      <!-- Block 2: Value 3 -->
      <rect x="16" y="12" width="4" height="8" fill="#6FCF97"/>
      <rect x="17" y="13" width="2" height="1" fill="#1B2A4A"/>
      <rect x="19" y="14" width="1" height="2" fill="#1B2A4A"/>
      <rect x="17" y="15" width="2" height="1" fill="#1B2A4A"/>
      <rect x="19" y="16" width="1" height="2" fill="#1B2A4A"/>
      <rect x="17" y="18" width="2" height="1" fill="#1B2A4A"/>

      <!-- Divider 3 -->
      <rect x="21" y="11" width="1" height="10" fill="#1B2A4A"/>

      <!-- Block 3: Value 4 -->
      <rect x="22" y="12" width="4" height="8" fill="#FF8F00"/>
      <rect x="23" y="13" width="1" height="3" fill="#1B2A4A"/>
      <rect x="25" y="13" width="1" height="5" fill="#1B2A4A"/>
      <rect x="23" y="16" width="3" height="1" fill="#1B2A4A"/>

      <!-- Divider 4 -->
      <rect x="27" y="11" width="1" height="10" fill="#1B2A4A"/>

      <!-- Block 4: Value 5 -->
      <rect x="28" y="12" width="2" height="8" fill="#00F0FF"/>
      <rect x="28" y="13" width="2" height="1" fill="#1B2A4A"/>
      <rect x="28" y="15" width="2" height="1" fill="#1B2A4A"/>
      <rect x="28" y="18" width="2" height="1" fill="#1B2A4A"/>

      <!-- Subtitle indices [0][1][2]... -->
      <rect x="5" y="24" width="2" height="1" fill="#8B7FD9"/>
      <rect x="11" y="24" width="2" height="1" fill="#8B7FD9"/>
      <rect x="17" y="24" width="2" height="1" fill="#8B7FD9"/>
      <rect x="23" y="24" width="2" height="1" fill="#8B7FD9"/>
    </svg>`,
  },
  {
    pairId: 'ds_stack',
    name: 'STACK',
    subtitle: 'LIFO Structure',
    description: 'Last-In-First-Out plate tower where elements push and pop strictly from the top.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Stack Base Vessel -->
      <rect x="4" y="27" width="24" height="2" fill="#1B2A4A"/>
      <rect x="4" y="10" width="2" height="17" fill="#1B2A4A"/>
      <rect x="26" y="10" width="2" height="17" fill="#1B2A4A"/>

      <!-- Bottom Plate 1 (Darker slate) -->
      <rect x="7" y="23" width="18" height="3" fill="#1B2A4A"/>
      <rect x="8" y="24" width="16" height="1" fill="#6FCF97"/>

      <!-- Plate 2 (Deep Teal) -->
      <rect x="7" y="19" width="18" height="3" fill="#1B2A4A"/>
      <rect x="8" y="20" width="16" height="1" fill="#38BDF8"/>

      <!-- Plate 3 (Amber Solar) -->
      <rect x="7" y="15" width="18" height="3" fill="#1B2A4A"/>
      <rect x="8" y="16" width="16" height="1" fill="#FFD93D"/>

      <!-- TOP GLOWING PLATE 4 (Glowing Meadow Mint & Sparkle) -->
      <rect x="6" y="10" width="20" height="4" fill="#1B2A4A"/>
      <rect x="7" y="11" width="18" height="2" fill="#7FFFD4"/>
      <rect x="10" y="11" width="12" height="1" fill="#FFFFFF"/>

      <!-- PUSH / POP Indicator Arrow -->
      <rect x="15" y="3" width="2" height="5" fill="#FF2FD4"/>
      <rect x="13" y="5" width="6" height="1" fill="#FF2FD4"/>
      <rect x="14" y="4" width="4" height="1" fill="#FF2FD4"/>
      <rect x="15" y="3" width="2" height="1" fill="#FFFFFF"/>

      <!-- Sparkle Pixels -->
      <rect x="4" y="6" width="2" height="2" fill="#FFD93D"/>
      <rect x="25" y="5" width="2" height="2" fill="#7FFFD4"/>
    </svg>`,
  },
  {
    pairId: 'ds_queue',
    name: 'QUEUE',
    subtitle: 'FIFO Structure',
    description: 'First-In-First-Out line of elements where insertion happens at the rear and removal at the front.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Ground Line -->
      <rect x="2" y="25" width="28" height="2" fill="#1B2A4A"/>

      <!-- Person 1 (Rear - Leftmost, Purple) -->
      <rect x="3" y="12" width="4" height="4" fill="#8B7FD9"/>
      <rect x="4" y="16" width="2" height="5" fill="#8B7FD9"/>
      <rect x="3" y="21" width="2" height="4" fill="#1B2A4A"/>
      <rect x="5" y="21" width="2" height="4" fill="#1B2A4A"/>

      <!-- Person 2 (Middle Left, Mint) -->
      <rect x="9" y="12" width="4" height="4" fill="#7FFFD4"/>
      <rect x="10" y="16" width="2" height="5" fill="#7FFFD4"/>
      <rect x="9" y="21" width="2" height="4" fill="#1B2A4A"/>
      <rect x="11" y="21" width="2" height="4" fill="#1B2A4A"/>

      <!-- Person 3 (Middle Right, Gold) -->
      <rect x="15" y="12" width="4" height="4" fill="#FFD93D"/>
      <rect x="16" y="16" width="2" height="5" fill="#FFD93D"/>
      <rect x="15" y="21" width="2" height="4" fill="#1B2A4A"/>
      <rect x="17" y="21" width="2" height="4" fill="#1B2A4A"/>

      <!-- Person 4 (Front - Rightmost, Pink Lead) -->
      <rect x="21" y="12" width="4" height="4" fill="#FF2FD4"/>
      <rect x="22" y="16" width="2" height="5" fill="#FF2FD4"/>
      <rect x="21" y="21" width="2" height="4" fill="#1B2A4A"/>
      <rect x="23" y="21" width="2" height="4" fill="#1B2A4A"/>

      <!-- Directional Arrow Facing Right (EXIT / DEQUEUE) -->
      <rect x="26" y="15" width="4" height="2" fill="#00F0FF"/>
      <rect x="28" y="13" width="2" height="2" fill="#00F0FF"/>
      <rect x="28" y="17" width="2" height="2" fill="#00F0FF"/>
      <rect x="30" y="14" width="1" height="4" fill="#00F0FF"/>

      <!-- ENQUEUE Tag (Left Entry) -->
      <rect x="3" y="7" width="4" height="2" fill="#7FFFD4"/>
      <rect x="4" y="9" width="2" height="2" fill="#7FFFD4"/>
    </svg>`,
  },
  {
    pairId: 'ds_linked_list',
    name: 'LINKED LIST',
    subtitle: 'Pointer Chains',
    description: 'Dynamic linear sequence where each node contains data and an explicit pointer to the next node.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Node [A] -->
      <rect x="2" y="10" width="7" height="10" fill="#1B2A4A"/>
      <rect x="3" y="11" width="5" height="8" fill="#7FFFD4"/>
      <!-- Letter A -->
      <rect x="4" y="13" width="3" height="1" fill="#1B2A4A"/>
      <rect x="4" y="15" width="3" height="1" fill="#1B2A4A"/>
      <rect x="4" y="13" width="1" height="5" fill="#1B2A4A"/>
      <rect x="6" y="13" width="1" height="5" fill="#1B2A4A"/>

      <!-- Arrow [A] -> [B] -->
      <rect x="9" y="14" width="4" height="2" fill="#FFD93D"/>
      <rect x="12" y="13" width="1" height="4" fill="#FFD93D"/>
      <rect x="13" y="14" width="1" height="2" fill="#FFD93D"/>

      <!-- Node [B] -->
      <rect x="14" y="10" width="7" height="10" fill="#1B2A4A"/>
      <rect x="15" y="11" width="5" height="8" fill="#38BDF8"/>
      <!-- Letter B -->
      <rect x="16" y="13" width="2" height="5" fill="#1B2A4A"/>
      <rect x="18" y="14" width="1" height="1" fill="#1B2A4A"/>
      <rect x="18" y="16" width="1" height="1" fill="#1B2A4A"/>

      <!-- Arrow [B] -> [C] -->
      <rect x="21" y="14" width="4" height="2" fill="#FFD93D"/>
      <rect x="24" y="13" width="1" height="4" fill="#FFD93D"/>
      <rect x="25" y="14" width="1" height="2" fill="#FFD93D"/>

      <!-- Node [C] -->
      <rect x="26" y="10" width="5" height="10" fill="#1B2A4A"/>
      <rect x="27" y="11" width="3" height="8" fill="#FF2FD4"/>
      <!-- Letter C -->
      <rect x="28" y="13" width="2" height="1" fill="#1B2A4A"/>
      <rect x="28" y="14" width="1" height="3" fill="#1B2A4A"/>
      <rect x="28" y="17" width="2" height="1" fill="#1B2A4A"/>

      <!-- Pointer Dot Ground -->
      <rect x="4" y="24" width="3" height="1" fill="#8B7FD9"/>
      <rect x="16" y="24" width="3" height="1" fill="#8B7FD9"/>
      <rect x="27" y="24" width="3" height="1" fill="#8B7FD9"/>
    </svg>`,
  },
  {
    pairId: 'ds_tree',
    name: 'TREE',
    subtitle: 'Hierarchical Structure',
    description: 'Non-linear hierarchical collection of nodes with a single root and recursive parent-child branchings.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Root Node (Top Center) -->
      <rect x="13" y="3" width="6" height="6" fill="#1B2A4A"/>
      <rect x="14" y="4" width="4" height="4" fill="#FFD93D"/>
      <rect x="15" y="5" width="2" height="2" fill="#FFFFFF"/>

      <!-- Branches from Root to Children -->
      <rect x="10" y="9" width="3" height="2" fill="#1B2A4A"/>
      <rect x="8" y="11" width="2" height="2" fill="#1B2A4A"/>
      <rect x="19" y="9" width="3" height="2" fill="#1B2A4A"/>
      <rect x="22" y="11" width="2" height="2" fill="#1B2A4A"/>

      <!-- Left Child Node -->
      <rect x="5" y="13" width="6" height="6" fill="#1B2A4A"/>
      <rect x="6" y="14" width="4" height="4" fill="#7FFFD4"/>

      <!-- Right Child Node -->
      <rect x="21" y="13" width="6" height="6" fill="#1B2A4A"/>
      <rect x="22" y="14" width="4" height="4" fill="#00F0FF"/>

      <!-- Branches from Left Child to Grandchildren -->
      <rect x="4" y="19" width="2" height="3" fill="#1B2A4A"/>
      <rect x="9" y="19" width="2" height="3" fill="#1B2A4A"/>

      <!-- Left Leaf 1 -->
      <rect x="2" y="22" width="5" height="5" fill="#1B2A4A"/>
      <rect x="3" y="23" width="3" height="3" fill="#6FCF97"/>

      <!-- Left Leaf 2 -->
      <rect x="9" y="22" width="5" height="5" fill="#1B2A4A"/>
      <rect x="10" y="23" width="3" height="3" fill="#6FCF97"/>

      <!-- Branches to Right Leaf -->
      <rect x="24" y="19" width="2" height="3" fill="#1B2A4A"/>
      <!-- Right Leaf -->
      <rect x="23" y="22" width="5" height="5" fill="#1B2A4A"/>
      <rect x="24" y="23" width="3" height="3" fill="#FF2FD4"/>
    </svg>`,
  },
  {
    pairId: 'ds_graph',
    name: 'GRAPH',
    subtitle: 'Networks & Relations',
    description: 'Set of vertices interconnected by edges, modeling networks, maps, social graphs, and dependencies.',
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges" className="w-full h-full">
      <!-- Edges Connecting Vertices -->
      <!-- Top (16,5) to Left (6,16) -->
      <rect x="14" y="7" width="2" height="2" fill="#8B7FD9"/>
      <rect x="12" y="9" width="2" height="2" fill="#8B7FD9"/>
      <rect x="10" y="11" width="2" height="2" fill="#8B7FD9"/>
      <rect x="8" y="13" width="2" height="2" fill="#8B7FD9"/>

      <!-- Top (16,5) to Right (26,16) -->
      <rect x="18" y="7" width="2" height="2" fill="#8B7FD9"/>
      <rect x="20" y="9" width="2" height="2" fill="#8B7FD9"/>
      <rect x="22" y="11" width="2" height="2" fill="#8B7FD9"/>
      <rect x="24" y="13" width="2" height="2" fill="#8B7FD9"/>

      <!-- Left (6,16) to Bottom (16,26) -->
      <rect x="8" y="18" width="2" height="2" fill="#8B7FD9"/>
      <rect x="10" y="20" width="2" height="2" fill="#8B7FD9"/>
      <rect x="12" y="22" width="2" height="2" fill="#8B7FD9"/>
      <rect x="14" y="24" width="2" height="2" fill="#8B7FD9"/>

      <!-- Right (26,16) to Bottom (16,26) -->
      <rect x="24" y="18" width="2" height="2" fill="#8B7FD9"/>
      <rect x="22" y="20" width="2" height="2" fill="#8B7FD9"/>
      <rect x="20" y="22" width="2" height="2" fill="#8B7FD9"/>
      <rect x="18" y="24" width="2" height="2" fill="#8B7FD9"/>

      <!-- Cross Diagonal Edge Left (6,16) to Right (26,16) -->
      <rect x="10" y="15" width="12" height="2" fill="#FFD93D"/>

      <!-- Vertex 1: Top (Cyan) -->
      <rect x="13" y="3" width="6" height="6" fill="#1B2A4A"/>
      <rect x="14" y="4" width="4" height="4" fill="#00F0FF"/>
      <rect x="15" y="5" width="2" height="2" fill="#FFFFFF"/>

      <!-- Vertex 2: Left (Mint) -->
      <rect x="3" y="13" width="6" height="6" fill="#1B2A4A"/>
      <rect x="4" y="14" width="4" height="4" fill="#7FFFD4"/>
      <rect x="5" y="15" width="2" height="2" fill="#FFFFFF"/>

      <!-- Vertex 3: Right (Neon Pink) -->
      <rect x="23" y="13" width="6" height="6" fill="#1B2A4A"/>
      <rect x="24" y="14" width="4" height="4" fill="#FF2FD4"/>
      <rect x="25" y="15" width="2" height="2" fill="#FFFFFF"/>

      <!-- Vertex 4: Bottom (Gold) -->
      <rect x="13" y="23" width="6" height="6" fill="#1B2A4A"/>
      <rect x="14" y="24" width="4" height="4" fill="#FFD93D"/>
      <rect x="15" y="25" width="2" height="2" fill="#FFFFFF"/>
    </svg>`,
  },
];

export interface PlayCard {
  id: string;
  pairId: string;
  type: 'icon' | 'name';
  name: string;
  iconSvg?: string;
}

// Generates and shuffles the 12 playing cards
export function generateShuffledDeck(): PlayCard[] {
  const deck: PlayCard[] = [];

  CARD_PAIRS.forEach((pair, index) => {
    // 1. Icon Card
    deck.push({
      id: `card_${pair.pairId}_icon`,
      pairId: pair.pairId,
      type: 'icon',
      name: pair.name,
      iconSvg: pair.iconSvg,
    });

    // 2. Name Card
    deck.push({
      id: `card_${pair.pairId}_name`,
      pairId: pair.pairId,
      type: 'name',
      name: pair.name,
    });
  });

  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}
