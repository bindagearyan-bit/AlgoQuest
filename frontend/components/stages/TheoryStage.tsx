'use client';

import React, { useState } from 'react';
import { PixelCard } from '../ui/PixelCard';
import { PixelButton } from '../ui/PixelButton';
import {
  BookOpen,
  Compass,
  CheckCircle2,
  Clock,
  HardDrive,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Server,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface RealLifeAnalogyData {
  title?: string;
  scenario: string;
  physicalSteps: string[];
  keyInsight: string;
}

export interface ThingsToRememberData {
  goldenRules: string[];
  productionUses: string[];
  interviewTraps: string[];
}

export interface TheoryStageProps {
  title: string;
  content: {
    eli5?: string;
    keyTakeaways?: string[];
    codeSnippet?: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    formalDefinition?: string;
    realLifeAnalogy?: RealLifeAnalogyData;
    thingsToRemember?: ThingsToRememberData;
  };
  onComplete: () => void;
  isCompleting?: boolean;
}

// Synthesizes dynamic, rich real-life analogies and memorization checklists based on topic title
function getDynamicTheoryData(title: string, content: TheoryStageProps['content']) {
  const t = (title || '').toLowerCase();

  // 1. Abstract Data Types (ADTs)
  if (t.includes('adt') || t.includes('abstract data type')) {
    return {
      formalDefinition:
        'An Abstract Data Type (ADT) is a high-level mathematical specification of a data structure that defines WHAT operations can be performed and WHAT values can be stored, strictly hiding HOW those operations are executed internally.',
      analogy: {
        title: 'The Modern Car Dashboard & Gas Pedal',
        scenario:
          'When you press the gas pedal in a car or steer the wheel, you understand the exact contract: press down to accelerate, turn left to steer. You do NOT need to know whether the car uses a direct fuel injection system, a turbocharger, or an electric battery powertrain under the hood.',
        physicalSteps: [
          'Interface (The Pedals & Steering Wheel): The driver interacts solely through documented controls without touching mechanical gears.',
          'Encapsulation (The Closed Hood): The internal engine components are sealed off so bad driving cannot accidentally dismantle the spark plugs.',
          'Implementation Flexibility: An automotive engineer can swap a gasoline engine for an electric motor, and the steering wheel still works exactly the same for the driver!',
        ],
        keyInsight:
          'Separation of concerns is the bedrock of engineering. By coding against interfaces rather than low-level memory, software becomes modular, swappable, and immune to breaking changes.',
      },
      remember: {
        goldenRules: [
          'ADT = Specification (Interface); Data Structure = Concrete Implementation (Array, Linked List, Tree).',
          'Users interact solely with public methods (e.g., push(), pop()) and never access raw internal pointers or buffers.',
          'Allows O(1) performance guarantees without coupling software to a specific programming language.',
        ],
        productionUses: [
          'Java Collections Framework (List, Set, Map interfaces vs ArrayList, HashSet, HashMap).',
          'Standard Template Library in C++ (std::stack, std::queue adapting std::deque or std::vector).',
          'Operating System System-Call Interfaces (POSIX file read/write hiding disk driver mechanics).',
        ],
        interviewTraps: [
          'Confusing an ADT with a primitive data type (e.g., stating "Stack is a built-in memory primitive" instead of an ADT).',
          'Violating encapsulation by exposing internal node references directly to client code.',
        ],
      },
    };
  }

  // 2. Linear vs Non-Linear / Concept & Need
  if (t.includes('concept') || t.includes('need') || t.includes('types of data structures') || t.includes('operations')) {
    return {
      formalDefinition:
        'A Data Structure is a specialized systematic format for organizing, storing, and manipulating data in computer memory so computational operations can be executed with maximum algorithmic efficiency.',
      analogy: {
        title: 'The Professional Chef’s Kitchen vs A Junk Drawer',
        scenario:
          'Imagine cooking dinner in a kitchen where spices, raw meat, knives, and ice cream are thrown randomly into a single laundry basket. Preparing a simple meal takes hours because finding any item requires searching through everything one by one. In a Michelin-star kitchen, knives are magnetized on the wall, spices are indexed alphabetically, and cold goods are refrigerated.',
        physicalSteps: [
          'Linear Organization (The Knife Rack): Every knife sits in a straight sequential slot with a predecessor and successor.',
          'Hierarchical Organization (The Spice Pantry): Spices are categorized by cuisine (Italian, Asian, Baking) into branching shelves.',
          'Direct Access (The Countertop): Frequently used cutting boards sit within arms reach for immediate O(1) retrieval.',
        ],
        keyInsight:
          'Data structures do not create new data; they create optimal spatial relationships between data points so CPUs can find and manipulate information without brute-force delay.',
      },
      remember: {
        goldenRules: [
          'No single data structure is best for every scenario — every structure is a deliberate trade-off between lookup speed, insertion speed, and memory overhead.',
          'Linear Structures: Array, Linked List, Stack, Queue (elements arranged sequentially).',
          'Non-Linear Structures: Trees and Graphs (elements arranged hierarchically or interconnectedly).',
        ],
        productionUses: [
          'RAM cache alignment and CPU L1/L2 cache prefetching.',
          'Relational database indexes (B+ Trees for range queries, Hash Tables for key lookups).',
          'Graphics rendering pipelines and spatial partitioning grids.',
        ],
        interviewTraps: [
          'Choosing an array when millions of random insertions/deletions are required at runtime.',
          'Forgetting that memory overhead includes pointer pointers, metadata padding, and allocation fragmentation.',
        ],
      },
    };
  }

  // 3. Time & Space Complexity / Big-O
  if (t.includes('complexity') || t.includes('big-o') || t.includes('space complexity')) {
    return {
      formalDefinition:
        'Asymptotic Complexity is the mathematical metric that measures how an algorithm’s execution time and memory consumption scale as the input size N grows toward infinity, independent of hardware clocks or compilers.',
      analogy: {
        title: 'Delivering a Parcel: Airplane vs Courier Bicycle',
        scenario:
          'If you need to deliver a single handwritten letter across town, a courier on a bicycle takes 15 minutes, whereas booking an airplane takes 4 hours of logistics. But if you need to deliver 5,000,000 letters, the bicycle courier takes years (O(N)), while the airplane carries all of them in the exact same 4 hours (O(1)).',
        physicalSteps: [
          'O(1) Constant Time: The action takes the exact same effort regardless of whether N is 1 or 1,000,000.',
          'O(N) Linear Time: Doubling the workload doubles the time taken (checking every student in an attendance roll).',
          'O(N²) Quadratic Time: Every item must be compared with every other item (every guest shaking hands with every other guest).',
        ],
        keyInsight:
          'Big-O does not measure seconds; it measures the GROWTH RATE of steps as input scales to massive production volumes.',
      },
      remember: {
        goldenRules: [
          'Drop constant multipliers and lower-order terms: O(3N² + 500N + 9000) simplifies strictly to O(N²).',
          'Big-O (O) = Worst-case upper bound; Big-Omega (Ω) = Best-case lower bound; Big-Theta (Θ) = Tight bound.',
          'Auxiliary space measures extra memory allocated by the algorithm, excluding the original input memory.',
        ],
        productionUses: [
          'Benchmarking microservice latency SLAs for millions of concurrent web requests.',
          'Embedded IoT systems where RAM is constrained to a few kilobytes.',
          'Preventing Algorithmic Complexity Attacks (Denial of Service via worst-case inputs).',
        ],
        interviewTraps: [
          'Confusing worst-case time with average-case time (e.g. Quicksort is O(N log N) average, but O(N²) worst-case).',
          'Ignoring recursion call-stack frames when calculating auxiliary space complexity.',
        ],
      },
    };
  }

  // 4. Stacks & Queues
  if (t.includes('stack') || t.includes('queue') || t.includes('polish notation') || t.includes('deque')) {
    const isStack = t.includes('stack');
    return {
      formalDefinition: isStack
        ? 'A Stack is a linear Abstract Data Type operating under the strict LIFO (Last-In-First-Out) discipline, where element addition (push) and element removal (pop) occur exclusively at a single end termed the Top.'
        : 'A Queue is a linear Abstract Data Type operating under the strict FIFO (First-In-First-Out) discipline, where elements are appended at the Rear (enqueue) and removed from the Front (dequeue).',
      analogy: {
        title: isStack ? 'The Spring-Loaded Cafeteria Tray Dispenser' : 'The Supermarket Checkout Lane',
        scenario: isStack
          ? 'In a cafeteria, clean trays are stacked into a spring-loaded cylinder. When you place a new clean tray on top, it pushes the stack down. When a hungry student approaches, they pick up the top tray — the last one washed is the very first one picked up (LIFO)!'
          : 'At a grocery checkout line, customers line up with carts. The first customer who arrived and waited in line is the first person scanned and served (FIFO). Cutting in front is forbidden, and entering at the back is required.',
        physicalSteps: [
          isStack ? 'Push (Top): Adding an item onto the topmost visible slot.' : 'Enqueue (Rear): Joining the tail end of the line.',
          isStack ? 'Pop (Top): Extracting the most recently added item.' : 'Dequeue (Front): Serving the oldest waiting customer.',
          isStack ? 'Underflow: Attempting to take a tray when the dispenser is completely empty.' : 'Overflow: Line reaches full capacity and cannot accept new entrants.',
        ],
        keyInsight:
          isStack
            ? 'LIFO structures remember historical state in reverse chronological order, making them ideal for undo actions and recursive return addresses.'
            : 'FIFO structures enforce fair scheduling and asynchronous order preservation between producers and consumers.',
      },
      remember: {
        goldenRules: [
          isStack ? 'Push, Pop, Peek operations on a Stack are strictly O(1) time.' : 'Enqueue and Dequeue operations on a Queue are strictly O(1) time.',
          'Circular Queues prevent artificial overflow by wrapping rear pointers using modulo arithmetic: (rear + 1) % Capacity.',
          'Stack Underflow occurs when popping from an empty stack; Overflow occurs when pushing into a full fixed-size buffer.',
        ],
        productionUses: [
          isStack ? 'Undo / Redo buffers (Ctrl+Z) in text editors.' : 'Print spoolers and background task worker queues (RabbitMQ, Kafka).',
          isStack ? 'Compiler syntax parsing and bracket balancing verification.' : 'Breadth-First Search (BFS) graph traversal exploration frontiers.',
          isStack ? 'Call stack frame management in CPU architectures.' : 'Operating system CPU process scheduling ready queues.',
        ],
        interviewTraps: [
          'Using a singly linked list for a queue without maintaining a tail pointer (causing O(N) enqueue).',
          'Forgetting that linear array queue dequeue requires shifting all elements O(N) unless implemented as a circular buffer.',
        ],
      },
    };
  }

  // 5. Searching & Sorting
  if (t.includes('search') || t.includes('sort') || t.includes('hashing')) {
    const isSearch = t.includes('search') || t.includes('hashing');
    return {
      formalDefinition: isSearch
        ? 'Search algorithms inspect structured or unstructured data collections to locate a target key or verify its absence with minimal comparisons.'
        : 'Sorting algorithms rearrange an arbitrary sequence of elements into a specified monotonic order (ascending or descending) while preserving data stability.',
      analogy: {
        title: isSearch ? 'Looking Up a Word in a 1,000-Page Dictionary' : 'Organizing a Hand of Playing Cards',
        scenario: isSearch
          ? 'If you are searching for the word "Python" in a printed dictionary, you do NOT flip from page 1, 2, 3... That is Linear Search. Instead, you open the book right in the middle! If you land on "M", you know "P" comes after, so you instantly discard the entire first 500 pages with zero effort.'
          : 'When dealt 7 playing cards in poker, you pick up one card at a time and slide it into its proper sorted rank among the cards in your left hand (Insertion Sort), or split the deck into halves to sort smaller stacks (Merge Sort).',
        physicalSteps: [
          'Binary Search Prerequisite: The physical collection MUST already be sorted in order for the halving principle to work.',
          'Divide & Conquer: With each split, half of the entire remaining universe of possibilities is discarded permanently.',
          'Logarithmic Scaling: In a book of 1,000,000 pages, Binary Search finds any target in only ~20 checks!',
        ],
        keyInsight:
          'Structure enables speed. By enforcing order beforehand, you eliminate the mathematical need to inspect the vast majority of items.',
      },
      remember: {
        goldenRules: [
          'Linear Search: O(N) time, works on unsorted collections, O(1) auxiliary space.',
          'Binary Search: O(log N) time, REQUIRES sorted collections, midpoint calculation: mid = left + (right - left) / 2 to prevent integer overflow.',
          'Stability in sorting means equal keys maintain their relative original input order.',
        ],
        productionUses: [
          'Database B-Tree indexes performing binary search on disk pages.',
          'Git Bisect debugging tool finding regression commits using binary search over commit history.',
          'E-commerce product filtering by price, rating, and relevance.',
        ],
        interviewTraps: [
          'Calculating midpoint as `(left + right) / 2` which causes integer overflow bugs in large arrays.',
          'Applying binary search on an unsorted array without sorting first.',
        ],
      },
    };
  }

  // 6. Linked Lists
  if (t.includes('linked') || t.includes('list') || t.includes('storage') || t.includes('skip')) {
    return {
      formalDefinition:
        'A Linked List is a linear data structure where elements (nodes) are stored non-contiguously in memory, with each node containing a data payload and one or more pointer references to adjacent nodes.',
      analogy: {
        title: 'A Cargo Freight Train with Couplers',
        scenario:
          'An array is like a single solid steel bus with 50 welded seats: if you want to add 1 more passenger beyond capacity, you must purchase an entirely new 60-seat bus and copy everyone over. A Linked List is like a train: each cargo car has a metal hook (pointer) linked to the car behind it. If you need to insert a new refrigerated cargo car in the middle, you simply unhook one coupler, hook in the new car, and re-link!',
        physicalSteps: [
          'Dynamic Growth: Cars are added or removed one by one on the fly without reserving unused space ahead of time.',
          'Pointer Chasing: To reach the 8th train car, a conductor must walk physically through car 1, 2, 3... there is no instant teleportation (no O(1) indexing).',
          'Decoupling & Splicing: Inserting or deleting a car requires only redirecting two coupler hooks in O(1) time.',
        ],
        keyInsight:
          'Linked lists trade cache locality and random access indexing for instantaneous insertion and zero memory pre-allocation waste.',
      },
      remember: {
        goldenRules: [
          'Singly Linked List: Each node points forward only (`next`). Deleting requires access to predecessor.',
          'Doubly Linked List: Each node points forward (`next`) and backward (`prev`), enabling bidirectional traversal.',
          'Access / Search is O(N); Insertion / Deletion at known pointer is O(1).',
        ],
        productionUses: [
          'Operating system kernel free memory block allocators (free-lists).',
          'LRU (Least Recently Used) cache eviction engines combined with Hash Maps.',
          'Music player playlist queues with Next / Previous track navigation.',
        ],
        interviewTraps: [
          'Losing the head reference during pointer reassignment, causing memory leaks and orphaned nodes.',
          'Dereferencing a null pointer (`current.next.next`) on the tail node.',
        ],
      },
    };
  }

  // 7. Trees & Heaps
  if (t.includes('tree') || t.includes('bst') || t.includes('avl') || t.includes('heap')) {
    return {
      formalDefinition:
        'A Tree is a non-linear hierarchical data structure consisting of a Root node connected to subordinate Child nodes through directed edges, maintaining zero cycles.',
      analogy: {
        title: 'A Corporate Organizational Chart',
        scenario:
          'Think of a multinational company. At the very top sits the Chief Executive Officer (Root). Reporting to the CEO are Vice Presidents (Branches), and reporting to each VP are Department Managers and Individual Contributors (Leaves). An intern cannot directly report to two conflicting CEOs (no cycles), and decisions cascade down branches.',
        physicalSteps: [
          'Root (CEO): The single originating entry point for all organizational paths.',
          'Subtrees (Departments): Each VP leads their own complete subordinate hierarchy.',
          'Leaves (Contributors): Nodes at the terminal edge with zero subordinate children.',
        ],
        keyInsight:
          'Hierarchical trees allow fast logarithmic navigation: every decision at an executive branch immediately filters out entire unrelated departments.',
      },
      remember: {
        goldenRules: [
          'Binary Search Tree (BST) Invariant: Left child < Node < Right child.',
          'Inorder traversal of a valid BST always yields elements in strictly sorted ascending order.',
          'Height of a balanced tree is O(log N); an unbalanced degenerate tree degrades to a linked list O(N).',
        ],
        productionUses: [
          'File system folder directories (C:/Users/.../Documents).',
          'DOM (Document Object Model) tree hierarchy in web browsers.',
          'Database indexes (B+ Trees for lightning-fast multi-gigabyte queries).',
        ],
        interviewTraps: [
          'Assuming a BST is always balanced — inserting sorted keys creates a skewed line of O(N) depth!',
          'Forgetting that tree traversals use O(H) call stack memory where H is tree height.',
        ],
      },
    };
  }

  // 8. Graphs & Matrices
  return {
    formalDefinition:
      'A Graph is a non-linear network data structure consisting of a finite set of Vertices (nodes) connected by Edges (relationships), capable of modeling arbitrary peer-to-peer relationships, cycles, and directional flows.',
    analogy: {
      title: 'Global Airline Flight Routes Network',
      scenario:
        'Consider an international flight map. Airports like Tokyo, London, and New York are Vertices (nodes). Direct non-stop flight paths between airports are Edges. Some flights are one-way (Directed), some round-trip (Undirected), and each flight has a ticket cost or flight distance (Edge Weight).',
      physicalSteps: [
        'Vertices (Airports): Individual points of interest storing city coordinates and runway data.',
        'Edges (Flight Routes): Connections indicating direct navigability between two specific cities.',
        'Pathfinding: Finding the shortest flight layover between New York and Sydney using Dijkstra or BFS.',
      ],
      keyInsight:
        'Graphs are the most expressive data structure in computer science because they place zero restrictions on how entities can interconnect.',
    },
    remember: {
      goldenRules: [
        'Breadth-First Search (BFS): Uses a Queue; explores shortest unweighted path layer by layer.',
        'Depth-First Search (DFS): Uses a Stack (or recursion); explores deeply along each branch until backtracking.',
        'Adjacency Matrix uses O(V²) space; Adjacency List uses O(V + E) space and is optimal for sparse graphs.',
      ],
      productionUses: [
        'Social networks (friend recommendation graphs, follower networks).',
        'GPS Navigation systems (Google Maps, Waze finding lowest-traffic routes).',
        'Web crawlers indexing hyperlinks between website pages.',
      ],
      interviewTraps: [
        'Forgetting to track `visited` nodes, causing infinite loops in cyclic graphs.',
        'Using Dijkstra on graphs containing negative edge weights.',
      ],
    },
  };
}

export const TheoryStage: React.FC<TheoryStageProps> = ({
  title,
  content,
  onComplete,
  isCompleting = false,
}) => {
  const [currentPage, setCurrentPage] = useState<1 | 2 | 3>(1);

  // Dynamic encyclopedic synthesis fallback ensuring 100% of topics have rich analogies and memorization rules
  const dynamicData = getDynamicTheoryData(title, content);

  const formalDefinition =
    content.formalDefinition ||
    content.eli5 ||
    dynamicData.formalDefinition;

  const analogy = content.realLifeAnalogy || dynamicData.analogy;
  const remember = content.thingsToRemember || dynamicData.remember;

  const totalPages = 3;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Warm Overworld Parchment Codex Card */}
      <PixelCard variant="parchment" className="overflow-hidden">
        {/* Top Header & Breadcrumb Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-[#1B2A4A]/15 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FFD54F] flex items-center justify-center text-[#1B2A4A] border-2 border-[#1B2A4A] shadow-[2px_2px_0_#1B2A4A] shrink-0">
              <BookOpen size={22} className="text-[#1B2A4A]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-pixel text-[9px] text-[#2E7D32] tracking-wider uppercase">
                  STAGE 1: THEORY FOUNDATIONS
                </span>
                <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-emerald-100 text-[#1B4D2E] border border-[#2E7D32]">
                  FIELD GUIDE
                </span>
              </div>
              <h1 className="font-pixel text-sm sm:text-base text-[#1A2744] tracking-wide mt-0.5">
                {title}
              </h1>
            </div>
          </div>

          {/* Stepper Status Pill */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <div className="flex items-center bg-[#EAF4FC] px-3 py-1.5 rounded-xl border-2 border-[#1B2A4A]">
              <span className="font-pixel text-[9px] text-[#1B2A4A]">
                PAGE {currentPage} OF {totalPages}
              </span>
            </div>
          </div>
        </div>

        {/* 3-Step Interactive Page Tabs */}
        <div className="grid grid-cols-3 gap-2 my-5 bg-[#EAF4FC]/70 p-1.5 rounded-xl border-2 border-[#1B2A4A]/20">
          <button
            onClick={() => setCurrentPage(1)}
            className={`py-2 px-2 sm:px-3 rounded-lg font-pixel text-[8px] sm:text-[9px] transition-all flex items-center justify-center gap-1.5 ${
              currentPage === 1
                ? 'bg-[#7FFFD4] text-[#1B2A4A] border-2 border-[#1B2A4A] font-bold shadow-[2px_2px_0_#1B2A4A]'
                : 'text-[#1A2744]/75 hover:text-[#1A2744] hover:bg-white/60'
            }`}
          >
            <span>📜</span>
            <span className="truncate">1. Concept</span>
          </button>

          <button
            onClick={() => setCurrentPage(2)}
            className={`py-2 px-2 sm:px-3 rounded-lg font-pixel text-[8px] sm:text-[9px] transition-all flex items-center justify-center gap-1.5 ${
              currentPage === 2
                ? 'bg-[#FFD54F] text-[#1B2A4A] border-2 border-[#1B2A4A] font-bold shadow-[2px_2px_0_#1B2A4A]'
                : 'text-[#1A2744]/75 hover:text-[#1A2744] hover:bg-white/60'
            }`}
          >
            <span>🌍</span>
            <span className="truncate">2. Analogy</span>
          </button>

          <button
            onClick={() => setCurrentPage(3)}
            className={`py-2 px-2 sm:px-3 rounded-lg font-pixel text-[8px] sm:text-[9px] transition-all flex items-center justify-center gap-1.5 ${
              currentPage === 3
                ? 'bg-[#A5D6A7] text-[#1B2A4A] border-2 border-[#1B2A4A] font-bold shadow-[2px_2px_0_#1B2A4A]'
                : 'text-[#1A2744]/75 hover:text-[#1A2744] hover:bg-white/60'
            }`}
          >
            <span>🧠</span>
            <span className="truncate">3. Remember</span>
          </button>
        </div>

        {/* Paginated Content Area */}
        <div className="min-h-[360px]">
          <AnimatePresence mode="wait">
            {/* ================= PAGE 1: CORE CONCEPT & COMPLEXITY ================= */}
            {currentPage === 1 && (
              <motion.div
                key="page1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Formal Definition Banner */}
                <div className="bg-[#EAF4FC] p-4 sm:p-5 rounded-2xl border-2 border-[#1B2A4A] shadow-[3px_3px_0_#1B2A4A]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Zap size={16} className="text-[#0288D1] fill-[#0288D1]" />
                    <span className="font-pixel text-[10px] text-[#0288D1] uppercase tracking-wider">
                      Core Concept & Formal Blueprint:
                    </span>
                  </div>
                  <p className="font-body text-sm sm:text-base text-[#1A2744] leading-relaxed font-semibold">
                    {formalDefinition}
                  </p>
                </div>

                {/* Computational Complexity Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-xl bg-white border-2 border-[#2E7D32]/40 flex items-center gap-3 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-[#2E7D32] flex items-center justify-center text-[#2E7D32] shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-[#2E7D32] uppercase block">
                        TIME COMPLEXITY GUARANTEE
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#1A2744]">
                        {content.timeComplexity || 'O(1) to O(N) access'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border-2 border-[#0288D1]/40 flex items-center gap-3 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-sky-100 border border-[#0288D1] flex items-center justify-center text-[#0288D1] shrink-0">
                      <HardDrive size={18} />
                    </div>
                    <div>
                      <span className="font-pixel text-[8px] text-[#0288D1] uppercase block">
                        SPACE / MEMORY OVERHEAD
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#1A2744]">
                        {content.spaceComplexity || 'O(N) contiguous / linked'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Takeaways Checklist */}
                {content.keyTakeaways && content.keyTakeaways.length > 0 && (
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#1B2A4A]/20 space-y-2.5 mt-2 shadow-sm">
                    <span className="font-pixel text-[9px] text-[#B45309] uppercase tracking-wider block">
                      ARCHITECTURAL INVARIANTS:
                    </span>
                    <ul className="space-y-2">
                      {content.keyTakeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A2744] font-body leading-relaxed">
                          <CheckCircle2 size={16} className="text-[#2E7D32] mt-0.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= PAGE 2: REAL-WORLD ANALOGY (NO CODE) ================= */}
            {currentPage === 2 && (
              <motion.div
                key="page2"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Analogy Story Box */}
                <div className="bg-[#FFF9E6] p-5 sm:p-6 rounded-2xl border-2 border-[#FFB300] shadow-[3px_3px_0_#FFB300] space-y-3">
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-[#B45309]" />
                    <span className="font-pixel text-[10px] text-[#B45309] uppercase tracking-wider">
                      EVERYDAY PHYSICAL WORLD ANALOGY (ZERO CODE):
                    </span>
                  </div>

                  <h3 className="font-pixel text-xs sm:text-sm text-[#1A2744]">
                    {analogy.title || 'Everyday Mental Model'}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-[#1A2744] leading-relaxed font-semibold">
                    {analogy.scenario}
                  </p>
                </div>

                {/* Physical Steps Breakdown */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#1B2A4A]/20 space-y-3 shadow-sm">
                  <span className="font-pixel text-[9px] text-[#0288D1] uppercase tracking-wider block">
                    PHYSICAL MECHANICS STEP-BY-STEP:
                  </span>

                  <div className="space-y-2.5">
                    {analogy.physicalSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#1B2A4A]/15"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#FFD54F] border border-[#1B2A4A] text-[#1A2744] font-pixel text-[10px] flex items-center justify-center shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <p className="font-body text-xs sm:text-sm text-[#1A2744] leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Insight Pill */}
                <div className="p-4 rounded-xl bg-emerald-50 border-2 border-[#2E7D32] flex items-start gap-3 shadow-sm">
                  <Lightbulb size={20} className="text-[#2E7D32] shrink-0 mt-0.5" />
                  <p className="font-body text-xs sm:text-sm text-[#145A32] leading-relaxed font-semibold">
                    <span className="font-bold text-[#2E7D32]">THE CORE TAKEAWAY: </span>
                    {analogy.keyInsight}
                  </p>
                </div>
              </motion.div>
            )}

            {/* ================= PAGE 3: THINGS TO REMEMBER & EXAM TRAPS ================= */}
            {currentPage === 3 && (
              <motion.div
                key="page3"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                {/* Golden Rules */}
                <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-[#2E7D32] space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={18} className="text-[#2E7D32]" />
                    <span className="font-pixel text-[10px] text-[#2E7D32] uppercase tracking-wider">
                      GOLDEN INVARIANTS (NEVER FORGET):
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {remember.goldenRules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A2744] font-body leading-relaxed">
                        <span className="text-[#2E7D32] font-bold">▶</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Production Software Uses */}
                <div className="p-5 rounded-2xl bg-white border-2 border-[#0288D1]/40 space-y-2.5 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Server size={18} className="text-[#0288D1]" />
                    <span className="font-pixel text-[10px] text-[#0288D1] uppercase tracking-wider">
                      WHERE IT IS USED IN REAL SOFTWARE:
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {remember.productionUses.map((use, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1A2744] font-body leading-relaxed">
                        <CheckCircle2 size={16} className="text-[#0288D1] shrink-0 mt-0.5" />
                        <span>{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam & Interview Traps */}
                <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 space-y-2 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldAlert size={18} className="text-rose-600" />
                    <span className="font-pixel text-[10px] text-rose-700 uppercase tracking-wider">
                      EXAM & TECHNICAL INTERVIEW TRAPS:
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {remember.interviewTraps.map((trap, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-rose-900 font-body leading-relaxed">
                        <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Pagination & Action Controls */}
        <div className="mt-8 pt-5 border-t-2 border-[#1B2A4A]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PixelButton
              variant="outline"
              size="md"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1) as any)}
              disabled={currentPage === 1}
              className="flex items-center gap-1.5"
            >
              <ArrowLeft size={14} />
              PREV PAGE
            </PixelButton>

            <span className="font-pixel text-[9px] text-slate-600 px-2">
              PAGE {currentPage} / {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentPage < totalPages ? (
              <PixelButton
                variant="gold"
                size="md"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1) as any)}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5"
              >
                NEXT: {currentPage === 1 ? 'REAL ANALOGY 🌍' : 'WHAT TO REMEMBER 🧠'}
                <ArrowRight size={14} />
              </PixelButton>
            ) : (
              <PixelButton
                variant="mint"
                size="md"
                onClick={onComplete}
                disabled={isCompleting}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} />
                {isCompleting ? 'SAVING PROGRESS...' : 'I UNDERSTAND & REMEMBER — COMPLETE (+10 XP)'}
              </PixelButton>
            )}
          </div>
        </div>
      </PixelCard>
    </div>
  );
};
