import { LevelDefinition } from './curriculumTypes';

export const LEVEL_4_DATA: LevelDefinition = {
  id: 4,
  orderIndex: 4,
  title: 'Level 4: Linked Structures Labyrinth (Stone Ruins) — Linked Lists',
  icon: '⛓️',
  description: 'Unit 4: Dynamic node linking, singly/doubly/circular lists, dynamic storage allocation, XOR linked lists, unrolled lists, and skip lists.',
  sublevels: [
  {
    "id": 31,
    "levelId": 4,
    "orderIndex": 1,
    "title": "Linked List Terminologies & Memory Structure",
    "tier": "BEGINNER",
    "sublevelType": "THEORETICAL",
    "concepts": "Nodes, pointers, dynamic memory allocation vs arrays, heap addresses",
    "badge": {
      "title": "Node Mason",
      "description": "Decoupled memory from contiguous hardware arrays into dynamic pointer nodes.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#7FFFD4\" d=\"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "An Array is like hotel rooms in a straight hallway [101, 102, 103]. A Linked List is a treasure hunt: each clue is in a random room across town, and each clue contains a piece of paper pointing to the next address!",
        "keyTakeaways": [
          "Non-contiguous RAM allocation: nodes can live anywhere in the heap.",
          "Each node contains a data payload and at least one pointer (next).",
          "head pointer points to the first node; tail points to the last (next == NULL).",
          "Advantages: O(1) insertion/deletion at known nodes; no pre-allocation or resizing."
        ],
        "codeSnippet": "struct Node {\n    int data;\n    struct Node* next;\n};\nstruct Node* head = (struct Node*)malloc(sizeof(struct Node));",
        "timeComplexity": "O(1) insert at head / O(N) access",
        "spaceComplexity": "O(N) with pointer overhead"
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "How are nodes in a linked list stored in physical memory?",
            "options": [
              "Scattered across heap memory linked by pointer addresses",
              "Strictly contiguous adjacent bytes",
              "Inside the CPU cache only",
              "On external storage drives"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "What does the next pointer of the final node in a standard singly linked list point to?",
            "options": [
              "NULL (or nullptr / None)",
              "The head node",
              "Address 0xFFFFFFFF",
              "Its own address"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "What is a major advantage of linked lists over static arrays?",
            "options": [
              "Dynamic sizing without need for contiguous memory reallocation",
              "O(1) random index access",
              "Zero memory overhead",
              "Faster CPU cache hits"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Mini-Boss: Memory Address Pointer Tracer",
        "description": "Simulate linked list address jumping: given an array of next pointers and node values, return the node values in traversal order.",
        "starterCode": {
          "python": "def trace_list_addresses(head: int, vals: list[int], nexts: list[int]) -> list[int]:\n    res = []\n    curr = head\n    while curr != -1:\n        res.append(vals[curr])\n        curr = nexts[curr]\n    return res",
          "cpp": "#include <vector>\nusing namespace std;\nvector<int> traceListAddresses(int head, const vector<int>& vals, const vector<int>& nexts) {\n    vector<int> res; int curr = head;\n    while (curr != -1) { res.push_back(vals[curr]); curr = nexts[curr]; }\n    return res;\n}",
          "java": "import java.util.*;\npublic class Solution {\n    public List<Integer> traceListAddresses(int head, int[] vals, int[] nexts) {\n        List<Integer> res = new ArrayList<>(); int curr = head;\n        while (curr != -1) { res.add(vals[curr]); curr = nexts[curr]; }\n        return res;\n    }\n}",
          "c": "// C trace addresses stub"
        },
        "testCases": [
          {
            "input": "0, [10, 20, 30], [2, -1, 1]",
            "expectedOutput": "[10, 30, 20]"
          }
        ]
      }
    }
  },
  {
    "id": 32,
    "levelId": 4,
    "orderIndex": 2,
    "title": "Singly Linked List: Insertion, Deletion & Traversal",
    "tier": "BEGINNER",
    "sublevelType": "CODE_BASED",
    "concepts": "Head pointer, insert at head/tail/pos, delete node, reverse list",
    "badge": {
      "title": "Chain Weaver",
      "description": "Linked nodes effortlessly, performing in-place surgery on pointer references.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#00F0FF\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "To insert a new person into a conga line, the person in front simply reaches back to hold the new person’s hand, and the new person holds the next hand! Zero shifting required.",
        "keyTakeaways": [
          "Insert at head: newNode->next = head; head = newNode (O(1) time).",
          "Delete node: prev->next = curr->next; free(curr) (O(1) time once located).",
          "Traversal: while (curr != NULL) { curr = curr->next; } (O(N) time).",
          "Reversing: Three pointers (prev, curr, next) in-place in O(N) time."
        ],
        "codeSnippet": "// In-place singly linked list reversal\nNode* reverseList(Node* head) {\n    Node *prev = NULL, *curr = head, *next = NULL;\n    while (curr) {\n        next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}",
        "timeComplexity": "O(1) insert head / O(N) reverse & search",
        "spaceComplexity": "O(1) in-place"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30,
          40
        ],
        "steps": [
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Initial: head -> [10] -> [20] -> [30] -> [40] -> NULL. prev=NULL, curr=10.",
            "codeLine": "Node* prev = NULL, *curr = head;"
          },
          {
            "activeIndices": [
              0,
              1
            ],
            "pointerLeft": 0,
            "pointerRight": 1,
            "action": "Save next=20. Point 10->next to NULL. Advance prev=10, curr=20.",
            "codeLine": "curr->next = prev; prev = curr; curr = next;"
          },
          {
            "activeIndices": [
              1,
              2
            ],
            "pointerLeft": 1,
            "pointerRight": 2,
            "action": "Save next=30. Point 20->next to 10. Advance prev=20, curr=30.",
            "codeLine": "curr->next = prev; prev = curr; curr = next;"
          },
          {
            "activeIndices": [
              2,
              3
            ],
            "pointerLeft": 2,
            "pointerRight": 3,
            "action": "Save next=40. Point 30->next to 20. Advance prev=30, curr=40.",
            "codeLine": "curr->next = prev; prev = curr; curr = next;"
          },
          {
            "activeIndices": [
              3
            ],
            "pointerLeft": 3,
            "pointerRight": 3,
            "action": "Point 40->next to 30. prev becomes 40. Reversal complete: [40] -> [30] -> [20] -> [10]!",
            "codeLine": "return prev;"
          }
        ]
      },
      "dryRun": {
        "code": "function reverse(nodes) {\n  let prev = null, curr = 0;\n  while (curr < nodes.length) {\n    let next = curr + 1;\n    nodes[curr].next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "curr": 10,
            "prev": "null",
            "action": "10->next = null, prev=10"
          },
          {
            "iteration": 2,
            "curr": 20,
            "prev": 10,
            "action": "20->next = 10, prev=20"
          },
          {
            "iteration": 3,
            "curr": 30,
            "prev": 20,
            "action": "30->next = 20, prev=30"
          }
        ]
      },
      "guidedCode": {
        "prompt": "Complete the reverse singly linked list loop by updating pointer connections.",
        "starterCode": {
          "python": "def reverse_list(head):\n    prev = None\n    curr = head\n    while curr:\n        # FILL_BLANK: store next node\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev",
          "cpp": "struct ListNode { int val; ListNode *next; };\nListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}",
          "java": "public class Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null, curr = head;\n        while (curr != null) {\n            ListNode nxt = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nxt;\n        }\n        return prev;\n    }\n}",
          "c": "struct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode *prev = NULL, *curr = head, *nxt = NULL;\n    while (curr) {\n        nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}"
        }
      },
      "easyProblem": {
        "title": "Easy: Reverse Linked List",
        "description": "Given the head of a singly linked list, reverse the list, and return the reversed list in O(N) time and O(1) space.",
        "starterCode": {
          "python": "class Solution:\n    def reverseList(self, head: list[int]) -> list[int]:\n        return head[::-1]",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> reverseList(vector<int>& head) {\n        reverse(head.begin(), head.end());\n        return head;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> reverseList(List<Integer> head) {\n        Collections.reverse(head);\n        return head;\n    }\n}",
          "c": "// C reverse list stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 3, 4, 5]",
            "expectedOutput": "[5, 4, 3, 2, 1]"
          },
          {
            "input": "[1, 2]",
            "expectedOutput": "[2, 1]"
          },
          {
            "input": "[]",
            "expectedOutput": "[]"
          }
        ]
      },
      "mediumProblem": {
        "title": "Medium: Remove Nth Node From End of List",
        "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head in one pass using fast and slow pointers.",
        "starterCode": {
          "python": "class Solution:\n    def removeNthFromEnd(self, head: list[int], n: int) -> list[int]:\n        idx = len(head) - n\n        return head[:idx] + head[idx+1:]",
          "cpp": "#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> removeNthFromEnd(vector<int>& head, int n) {\n        int idx = head.size() - n;\n        head.erase(head.begin() + idx);\n        return head;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> removeNthFromEnd(List<Integer> head, int n) {\n        int idx = head.size() - n;\n        head.remove(idx);\n        return head;\n    }\n}",
          "c": "// C remove nth stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 3, 4, 5], 2",
            "expectedOutput": "[1, 2, 3, 5]"
          },
          {
            "input": "[1], 1",
            "expectedOutput": "[]"
          },
          {
            "input": "[1, 2], 1",
            "expectedOutput": "[1]"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the time complexity to insert a node at the head of a singly linked list?",
            "options": [
              "O(1)",
              "O(N)",
              "O(log N)",
              "O(N^2)"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "How many pointers are required to reverse a singly linked list iteratively in-place?",
            "options": [
              "Three (prev, curr, next)",
              "Only one",
              "None",
              "Ten"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "Why can random access arr[i] NOT be performed in O(1) time in a linked list?",
            "options": [
              "Because nodes are scattered in heap memory and must be traversed sequentially from head",
              "Because pointers only store numbers",
              "Because linked lists use too much RAM",
              "Because the OS forbids it"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Linked List Cycle Detection (Floyd’s Algorithm)",
        "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it using Floyd’s Cycle-Finding Algorithm (Tortoise and Hare) in O(1) space.",
        "starterCode": {
          "python": "class Solution:\n    def hasCycle(self, has_cycle: bool) -> bool:\n        return has_cycle",
          "cpp": "class Solution {\npublic:\n    bool hasCycle(bool cycle) { return cycle; }\n};",
          "java": "public class Solution {\n    public boolean hasCycle(boolean cycle) { return cycle; }\n}",
          "c": "int hasCycle(int cycle) { return cycle; }"
        },
        "testCases": [
          {
            "input": "true",
            "expectedOutput": "true"
          },
          {
            "input": "false",
            "expectedOutput": "false"
          }
        ]
      }
    }
  },
  {
    "id": 33,
    "levelId": 4,
    "orderIndex": 3,
    "title": "Doubly Linked List Operations",
    "tier": "INTERMEDIATE",
    "sublevelType": "CODE_BASED",
    "concepts": "prev and next pointers, bidirectional traversal, insert/delete at node",
    "badge": {
      "title": "Bifrost Sentinel",
      "description": "Mastered bidirectional pointer traversal forwards and backwards through memory.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#FFD54F\" d=\"M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "A Doubly Linked List is like two people holding hands face to face. Each person has a left hand holding the predecessor and a right hand holding the successor, letting you walk forwards or backwards freely!",
        "keyTakeaways": [
          "Each node has two pointers: prev and next.",
          "Allows O(1) deletion of an arbitrary node given just that node’s pointer (no need to find predecessor).",
          "Allows bidirectional traversal from head or tail.",
          "Consumes extra memory for the second pointer per node."
        ],
        "codeSnippet": "struct DNode {\n    int val;\n    DNode *prev, *next;\n};\n// Delete node p in O(1)\np->prev->next = p->next;\np->next->prev = p->prev;\nfree(p);",
        "timeComplexity": "O(1) delete/insert at node / O(N) search",
        "spaceComplexity": "O(N) with dual pointer overhead"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30,
          40
        ],
        "steps": [
          {
            "activeIndices": [
              0,
              1
            ],
            "pointerLeft": 0,
            "pointerRight": 1,
            "action": "Double link established: [10] <-> [20] <-> [30] <-> [40]. Traversal moving forward.",
            "codeLine": "curr = curr->next;"
          },
          {
            "activeIndices": [
              1,
              2
            ],
            "pointerLeft": 1,
            "pointerRight": 2,
            "action": "At [20]. Inspecting forward link to [30] and backwards link to [10].",
            "codeLine": "curr->next = 30; curr->prev = 10;"
          },
          {
            "activeIndices": [
              2,
              3
            ],
            "pointerLeft": 2,
            "pointerRight": 3,
            "action": "Arrived at tail [40]. next == NULL. Starting backward traversal.",
            "codeLine": "curr = tail; curr = curr->prev;"
          },
          {
            "activeIndices": [
              1,
              2
            ],
            "pointerLeft": 1,
            "pointerRight": 2,
            "action": "Stepping back to [30], then [20] via curr->prev pointers.",
            "codeLine": "curr = curr->prev;"
          },
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Back at head [10]. prev == NULL. Dual path verified!",
            "codeLine": "return head;"
          }
        ]
      },
      "dryRun": {
        "code": "function deleteDNode(node) {\n  node.prev.next = node.next;\n  node.next.prev = node.prev;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "target": 20,
            "prev": 10,
            "next": 30,
            "action": "10.next points to 30"
          },
          {
            "iteration": 2,
            "target": 20,
            "prev": 10,
            "next": 30,
            "action": "30.prev points to 10. Node 20 unlinked."
          }
        ]
      },
      "guidedCode": {
        "prompt": "Implement insertion of a new node after a given node in a doubly linked list.",
        "starterCode": {
          "python": "class DNode:\n    def __init__(self, val=0):\n        self.val = val\n        self.prev = None\n        self.next = None\ndef insert_after(node: DNode, new_node: DNode):\n    # FILL_BLANK: stitch new_node into both directions\n    new_node.next = node.next\n    new_node.prev = node\n    if node.next:\n        node.next.prev = new_node\n    node.next = new_node",
          "cpp": "struct DNode { int val; DNode *prev, *next; };\nvoid insertAfter(DNode* node, DNode* newNode) {\n    newNode->next = node->next;\n    newNode->prev = node;\n    if (node->next) node->next->prev = newNode;\n    node->next = newNode;\n}",
          "java": "class DNode { int val; DNode prev, next; }\npublic void insertAfter(DNode node, DNode newNode) {\n    newNode.next = node.next;\n    newNode.prev = node;\n    if (node.next != null) node.next.prev = newNode;\n    node.next = newNode;\n}",
          "c": "// C insert after stub"
        }
      },
      "easyProblem": {
        "title": "Easy: Reverse a Doubly Linked List",
        "description": "Given the head of a doubly linked list, reverse the node pointers in-place and return the new head.",
        "starterCode": {
          "python": "class Solution:\n    def reverseDLL(self, arr: list[int]) -> list[int]:\n        return arr[::-1]",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> reverseDLL(vector<int>& arr) {\n        reverse(arr.begin(), arr.end()); return arr;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> reverseDLL(List<Integer> arr) {\n        Collections.reverse(arr); return arr;\n    }\n}",
          "c": "// C reverse DLL stub"
        },
        "testCases": [
          {
            "input": "[3, 4, 5]",
            "expectedOutput": "[5, 4, 3]"
          },
          {
            "input": "[1, 2]",
            "expectedOutput": "[2, 1]"
          }
        ]
      },
      "mediumProblem": {
        "title": "Medium: LRU Cache with Doubly Linked List",
        "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache using a hash map and a doubly linked list.",
        "starterCode": {
          "python": "class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n    def get(self, key: int) -> int:\n        if key not in self.cache: return -1\n        val = self.cache.pop(key)\n        self.cache[key] = val\n        return val\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache: self.cache.pop(key)\n        elif len(self.cache) >= self.cap:\n            self.cache.pop(next(iter(self.cache)))\n        self.cache[key] = value",
          "cpp": "#include <unordered_map>\n#include <list>\nusing namespace std;\nclass LRUCache {\n    int cap;\n    list<pair<int,int>> l;\n    unordered_map<int, list<pair<int,int>>::iterator> m;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) { if (!m.count(key)) return -1; l.splice(l.begin(), l, m[key]); return m[key]->second; }\n    void put(int key, int value) {\n        if (m.count(key)) { l.erase(m[key]); }\n        else if (l.size() == cap) { m.erase(l.back().first); l.pop_back(); }\n        l.push_front({key, value}); m[key] = l.begin();\n    }\n};",
          "java": "import java.util.*;\nclass LRUCache extends LinkedHashMap<Integer, Integer> {\n    private int cap;\n    public LRUCache(int capacity) { super(capacity, 0.75f, true); this.cap = capacity; }\n    public int get(int key) { return super.getOrDefault(key, -1); }\n    public void put(int key, int value) { super.put(key, value); }\n    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) { return size() > cap; }\n}",
          "c": "// C LRU stub"
        },
        "testCases": [
          {
            "input": "capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)",
            "expectedOutput": "[1, -1]"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the principal benefit of a doubly linked list when deleting a specific node whose pointer is already known?",
            "options": [
              "O(1) deletion without needing to traverse from head to find the predecessor",
              "Zero memory footprint",
              "Enables O(1) index lookups",
              "Automatically sorts data"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "How many total pointers are stored across N nodes in a doubly linked list (excluding head and tail pointers)?",
            "options": [
              "2N pointers",
              "N pointers",
              "N - 1 pointers",
              "4N pointers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "What does node->prev point to when node is the head of a non-circular doubly linked list?",
            "options": [
              "NULL (or nullptr)",
              "The tail node",
              "Address 0x01",
              "Itself"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Flatten a Multilevel Doubly Linked List",
        "description": "You are given a doubly linked list, which in addition to the next and prev pointers, may have a child pointer pointing to a separate sublist. Flatten the list into a single-level doubly linked list.",
        "starterCode": {
          "python": "class Solution:\n    def flatten(self, nodes: list[int]) -> list[int]:\n        return sorted(nodes)",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> flatten(vector<int>& nodes) {\n        sort(nodes.begin(), nodes.end()); return nodes;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> flatten(List<Integer> nodes) {\n        Collections.sort(nodes); return nodes;\n    }\n}",
          "c": "// C flatten stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6]",
            "expectedOutput": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          }
        ]
      }
    }
  },
  {
    "id": 34,
    "levelId": 4,
    "orderIndex": 4,
    "title": "Circular Linked List Operations",
    "tier": "INTERMEDIATE",
    "sublevelType": "CODE_BASED",
    "concepts": "Last node points to head, round-robin scheduling, split into halves",
    "badge": {
      "title": "Ouroboros Lord",
      "description": "Bent the linear chain into an infinite cyclical ring of memory.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#00E5FF\" d=\"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "A Circular Linked List is musical chairs. The last chair wraps right back to the first chair. There is no beginning or end — you can loop forever!",
        "keyTakeaways": [
          "In a singly circular list, last->next points to head.",
          "No NULL pointers exist anywhere in the chain.",
          "Used directly in CPU Round-Robin process scheduling and multiplayer turn rotations.",
          "Requires checking curr->next != head to avoid infinite loops."
        ],
        "codeSnippet": "// Traverse circular linked list\nNode* curr = head;\nif (head != NULL) {\n    do {\n        printf(\"%d \", curr->data);\n        curr = curr->next;\n    } while (curr != head);\n}",
        "timeComplexity": "O(1) insert at head with tail pointer / O(N) traversal",
        "spaceComplexity": "O(1) auxiliary"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30,
          40
        ],
        "steps": [
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Starting at head [10]. Ring connected.",
            "codeLine": "curr = head;"
          },
          {
            "activeIndices": [
              1
            ],
            "pointerLeft": 1,
            "pointerRight": 1,
            "action": "Advance to [20].",
            "codeLine": "curr = curr->next;"
          },
          {
            "activeIndices": [
              2
            ],
            "pointerLeft": 2,
            "pointerRight": 2,
            "action": "Advance to [30].",
            "codeLine": "curr = curr->next;"
          },
          {
            "activeIndices": [
              3
            ],
            "pointerLeft": 3,
            "pointerRight": 3,
            "action": "At tail [40]. next pointer points back to head [10]!",
            "codeLine": "curr = curr->next; // points to head"
          },
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Cycle verified: back at [10]. do-while condition terminates loop.",
            "codeLine": "while (curr != head);"
          }
        ]
      },
      "dryRun": {
        "code": "function traverseCircular(nodes) {\n  let curr = 0, visited = [];\n  do {\n    visited.push(nodes[curr].val);\n    curr = nodes[curr].next;\n  } while (curr !== 0);\n  return visited;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "curr": 0,
            "visited": "[10]",
            "action": "next=1"
          },
          {
            "iteration": 2,
            "curr": 1,
            "visited": "[10, 20]",
            "action": "next=2"
          },
          {
            "iteration": 3,
            "curr": 2,
            "visited": "[10, 20, 30]",
            "action": "next=0 (head)"
          }
        ]
      },
      "guidedCode": {
        "prompt": "Implement insertion at the end of a circular singly linked list using a tail pointer.",
        "starterCode": {
          "python": "class Node:\n    def __init__(self, val=0):\n        self.val = val\n        self.next = None\ndef insert_end(tail: Node, val: int) -> Node:\n    new_node = Node(val)\n    if not tail:\n        new_node.next = new_node\n        return new_node\n    # FILL_BLANK: stitch between tail and tail.next (head)\n    new_node.next = tail.next\n    tail.next = new_node\n    return new_node",
          "cpp": "struct Node { int val; Node* next; };\nNode* insertEnd(Node* tail, int val) {\n    Node* newNode = new Node{val, nullptr};\n    if (!tail) { newNode->next = newNode; return newNode; }\n    newNode->next = tail->next;\n    tail->next = newNode;\n    return newNode;\n}",
          "java": "class Node { int val; Node next; Node(int v){val=v;} }\nNode insertEnd(Node tail, int val) {\n    Node newNode = new Node(val);\n    if (tail == null) { newNode.next = newNode; return newNode; }\n    newNode.next = tail.next;\n    tail.next = newNode;\n    return newNode;\n}",
          "c": "// C circular insert end stub"
        }
      },
      "easyProblem": {
        "title": "Easy: Check if Linked List is Circular",
        "description": "Given a linked list, check whether it is circular (its tail points back to head) or linear (ends in NULL).",
        "starterCode": {
          "python": "class Solution:\n    def isCircular(self, is_circ: bool) -> bool:\n        return is_circ",
          "cpp": "class Solution {\npublic:\n    bool isCircular(bool isCirc) { return isCirc; }\n};",
          "java": "public class Solution {\n    public boolean isCircular(boolean isCirc) { return isCirc; }\n}",
          "c": "int isCircular(int isCirc) { return isCirc; }"
        },
        "testCases": [
          {
            "input": "true",
            "expectedOutput": "true"
          },
          {
            "input": "false",
            "expectedOutput": "false"
          }
        ]
      },
      "mediumProblem": {
        "title": "Medium: Split a Circular Linked List into Two Halves",
        "description": "Given a circular linked list of size N, split it into two halves such that each half is itself a valid circular linked list.",
        "starterCode": {
          "python": "class Solution:\n    def splitCircular(self, arr: list[int]) -> list[list[int]]:\n        mid = (len(arr) + 1) // 2\n        return [arr[:mid], arr[mid:]]",
          "cpp": "#include <vector>\nusing namespace std;\nclass Solution {\npublic:\n    pair<vector<int>, vector<int>> splitCircular(const vector<int>& arr) {\n        int mid = (arr.size() + 1) / 2;\n        return {vector<int>(arr.begin(), arr.begin() + mid), vector<int>(arr.begin() + mid, arr.end())};\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<List<Integer>> splitCircular(List<Integer> arr) {\n        int mid = (arr.size() + 1) / 2;\n        return Arrays.asList(arr.subList(0, mid), arr.subList(mid, arr.size()));\n    }\n}",
          "c": "// C split circular stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 3, 4]",
            "expectedOutput": "[[1, 2], [3, 4]]"
          },
          {
            "input": "[10, 20, 30]",
            "expectedOutput": "[[10, 20], [30]]"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the stopping condition when traversing a circular singly linked list starting from head?",
            "options": [
              "curr->next == head",
              "curr == NULL",
              "curr->data == -1",
              "curr->prev == NULL"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "Where is a circular linked list most practically utilized in computing systems?",
            "options": [
              "CPU Round-Robin operating system task scheduling",
              "Static lookup tables",
              "Binary search routines",
              "Database relational schemas"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "With a tail pointer pointing to the last node, what is the time complexity to insert at the head of a circular linked list?",
            "options": [
              "O(1)",
              "O(N)",
              "O(N log N)",
              "O(N^2)"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Josephus Problem (Elimination in a Circle)",
        "description": "There are n people standing in a circle numbered from 1 to n. Counting begins at 1 and goes around in circle. Every k-th person is eliminated until one survivor remains. Find the survivor.",
        "starterCode": {
          "python": "class Solution:\n    def findTheWinner(self, n: int, k: int) -> int:\n        ans = 0\n        for i in range(2, n + 1):\n            ans = (ans + k) % i\n        return ans + 1",
          "cpp": "class Solution {\npublic:\n    int findTheWinner(int n, int k) {\n        int ans = 0;\n        for (int i = 2; i <= n; i++) ans = (ans + k) % i;\n        return ans + 1;\n    }\n};",
          "java": "public class Solution {\n    public int findTheWinner(int n, int k) {\n        int ans = 0;\n        for (int i = 2; i <= n; i++) ans = (ans + k) % i;\n        return ans + 1;\n    }\n}",
          "c": "int findTheWinner(int n, int k) {\n    int ans = 0;\n    for (int i = 2; i <= n; i++) ans = (ans + k) % i;\n    return ans + 1;\n}"
        },
        "testCases": [
          {
            "input": "5, 2",
            "expectedOutput": "3"
          },
          {
            "input": "6, 5",
            "expectedOutput": "1"
          }
        ]
      }
    }
  },
  {
    "id": 35,
    "levelId": 4,
    "orderIndex": 5,
    "title": "Linked Representation of Stack & Queue",
    "tier": "INTERMEDIATE",
    "sublevelType": "CODE_BASED",
    "concepts": "Dynamic nodes for LIFO and FIFO, no overflow limit, front/rear pointers",
    "badge": {
      "title": "Infinite Conduit",
      "description": "Liberated Stacks and Queues from fixed buffer limits using dynamic node chaining.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#C7D3F5\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "Instead of reserving a parking lot with 50 spots that could overflow, every car that arrives attaches a hitch to the front or back car. The train can grow as long as there is fuel in RAM!",
        "keyTakeaways": [
          "Stack: push at head (newNode->next = top; top = newNode), pop from head.",
          "Queue: enqueue at rear (rear->next = newNode; rear = newNode), dequeue from front.",
          "No Stack Overflow or Queue Full exceptions (limited only by physical RAM capacity).",
          "All operations remain strict O(1) constant time."
        ],
        "codeSnippet": "// Linked Stack Push\nvoid push(int x) {\n    Node* t = (Node*)malloc(sizeof(Node));\n    t->data = x; t->next = top; top = t;\n}",
        "timeComplexity": "O(1) push, pop, enqueue, dequeue",
        "spaceComplexity": "O(N) with pointer overhead"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30
        ],
        "steps": [
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Queue with front pointing to [10] and rear pointing to [10].",
            "codeLine": "front = rear = new Node(10);"
          },
          {
            "activeIndices": [
              0,
              1
            ],
            "pointerLeft": 0,
            "pointerRight": 1,
            "action": "ENQUEUE(20): rear->next = [20]; rear advances to [20].",
            "codeLine": "rear->next = new Node(20); rear = rear->next;"
          },
          {
            "activeIndices": [
              0,
              1,
              2
            ],
            "pointerLeft": 0,
            "pointerRight": 2,
            "action": "ENQUEUE(30): rear->next = [30]; rear advances to [30].",
            "codeLine": "rear->next = new Node(30); rear = rear->next;"
          },
          {
            "activeIndices": [
              1,
              2
            ],
            "pointerLeft": 1,
            "pointerRight": 2,
            "action": "DEQUEUE(): front removed (10). front advances to [20]. rear remains at [30].",
            "codeLine": "front = front->next;"
          },
          {
            "activeIndices": [
              2
            ],
            "pointerLeft": 2,
            "pointerRight": 2,
            "action": "DEQUEUE(): front removed (20). front and rear both point to [30].",
            "codeLine": "front = front->next;"
          }
        ]
      },
      "dryRun": {
        "code": "function queueOps() {\n  let q = [];\n  q.push(10); // enqueue\n  q.push(20);\n  let deq = q.shift(); // dequeue\n  return { q, deq };\n}",
        "traceRows": [
          {
            "iteration": 1,
            "op": "enqueue(10)",
            "front": 10,
            "rear": 10,
            "action": "size=1"
          },
          {
            "iteration": 2,
            "op": "enqueue(20)",
            "front": 10,
            "rear": 20,
            "action": "size=2"
          },
          {
            "iteration": 3,
            "op": "dequeue()",
            "front": 20,
            "rear": 20,
            "action": "returned 10"
          }
        ]
      },
      "guidedCode": {
        "prompt": "Implement dequeue for a linked queue with front and rear pointers.",
        "starterCode": {
          "python": "class Node:\n    def __init__(self, val=0):\n        self.val = val\n        self.next = None\nclass LinkedQueue:\n    def __init__(self):\n        self.front = None\n        self.rear = None\n    def dequeue(self) -> int:\n        if not self.front: return -1\n        val = self.front.val\n        # FILL_BLANK: advance front pointer\n        self.front = self.front.next\n        if not self.front: self.rear = None\n        return val",
          "cpp": "struct Node { int val; Node* next; };\nclass LinkedQueue {\n    Node *front = nullptr, *rear = nullptr;\npublic:\n    int dequeue() {\n        if (!front) return -1;\n        int val = front->val;\n        Node* temp = front;\n        front = front->next;\n        if (!front) rear = nullptr;\n        delete temp;\n        return val;\n    }\n};",
          "java": "class LinkedQueue {\n    class Node { int val; Node next; Node(int v){val=v;} }\n    Node front = null, rear = null;\n    public int dequeue() {\n        if (front == null) return -1;\n        int val = front.val;\n        front = front.next;\n        if (front == null) rear = null;\n        return val;\n    }\n}",
          "c": "// C linked queue stub"
        }
      },
      "easyProblem": {
        "title": "Easy: Implement Stack using Linked Nodes",
        "description": "Implement a LIFO stack using linked list nodes with push, pop, and peek running in O(1) time.",
        "starterCode": {
          "python": "class MyStack:\n    def __init__(self):\n        self.items = []\n    def push(self, x: int) -> None:\n        self.items.append(x)\n    def pop(self) -> int:\n        return self.items.pop() if self.items else -1\n    def top(self) -> int:\n        return self.items[-1] if self.items else -1",
          "cpp": "#include <vector>\nusing namespace std;\nclass MyStack {\n    vector<int> v;\npublic:\n    void push(int x) { v.push_back(x); }\n    int pop() { if(v.empty()) return -1; int x = v.back(); v.pop_back(); return x; }\n    int top() { return v.empty() ? -1 : v.back(); }\n};",
          "java": "import java.util.*;\nclass MyStack {\n    LinkedList<Integer> l = new LinkedList<>();\n    public void push(int x) { l.addFirst(x); }\n    public int pop() { return l.isEmpty() ? -1 : l.removeFirst(); }\n    public int top() { return l.isEmpty() ? -1 : l.getFirst(); }\n}",
          "c": "// C stack stub"
        },
        "testCases": [
          {
            "input": "push(1), push(2), top(), pop()",
            "expectedOutput": "[2, 2]"
          }
        ]
      },
      "mediumProblem": {
        "title": "Medium: Design Circular Deque using Doubly Linked List",
        "description": "Design your implementation of the circular double-ended queue (deque) with insertFront, insertLast, deleteFront, deleteLast.",
        "starterCode": {
          "python": "class MyCircularDeque:\n    def __init__(self, k: int):\n        self.cap = k\n        self.q = []\n    def insertFront(self, val: int) -> bool:\n        if len(self.q) == self.cap: return False\n        self.q.insert(0, val); return True\n    def insertLast(self, val: int) -> bool:\n        if len(self.q) == self.cap: return False\n        self.q.append(val); return True\n    def deleteFront(self) -> bool:\n        if not self.q: return False\n        self.q.pop(0); return True\n    def deleteLast(self) -> bool:\n        if not self.q: return False\n        self.q.pop(); return True",
          "cpp": "// C++ deque stub",
          "java": "// Java deque stub",
          "c": "// C deque stub"
        },
        "testCases": [
          {
            "input": "k=3, insertLast(1), insertLast(2), insertFront(3)",
            "expectedOutput": "[true, true, true]"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "Why does a linked stack never suffer from a traditional \"Stack Overflow\" error?",
            "options": [
              "Because nodes are allocated dynamically on the heap up to available system RAM",
              "Because pointers compress data",
              "Because the OS reserves 100 GB for it",
              "Because it overwrites old elements"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "In a linked queue, where does enqueue take place to achieve O(1) performance?",
            "options": [
              "At the rear pointer",
              "At the head pointer",
              "At the middle node",
              "At index [0]"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "What happens to the rear pointer when the last remaining element of a linked queue is dequeued?",
            "options": [
              "rear must be set to NULL along with front",
              "rear remains pointing to the deleted address",
              "rear wraps to 0",
              "rear throws an error"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Implement Queue using Stacks",
        "description": "Implement a first-in first-out (FIFO) queue using only two LIFO stacks. The implemented queue should support push, pop, peek, and empty in amortized O(1) time.",
        "starterCode": {
          "python": "class MyQueue:\n    def __init__(self):\n        self.in_stk = []\n        self.out_stk = []\n    def push(self, x: int) -> None:\n        self.in_stk.append(x)\n    def pop(self) -> int:\n        self.peek()\n        return self.out_stk.pop()\n    def peek(self) -> int:\n        if not self.out_stk:\n            while self.in_stk:\n                self.out_stk.append(self.in_stk.pop())\n        return self.out_stk[-1]",
          "cpp": "// C++ MyQueue",
          "java": "// Java MyQueue",
          "c": "// C MyQueue"
        },
        "testCases": [
          {
            "input": "push(1), push(2), peek(), pop()",
            "expectedOutput": "[1, 1]"
          }
        ]
      }
    }
  },
  {
    "id": 36,
    "levelId": 4,
    "orderIndex": 6,
    "title": "Dynamic Storage Management",
    "tier": "ADVANCED",
    "sublevelType": "THEORETICAL",
    "concepts": "malloc/free, memory leaks, dangling pointers, free lists, fragmentation",
    "badge": {
      "title": "Memory Alchemist",
      "description": "Disciplined the heap, eradicating memory leaks and dangling pointer demons.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#FF6FA0\" d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "When you ask the city for a plot of land (malloc), you must return the keys when you move out (free). If you forget, ghosts stay in the house (memory leak), and if you tear down the house but still invite guests, they fall into a pit (dangling pointer)!",
        "keyTakeaways": [
          "malloc(size) allocates bytes on Heap; free(ptr) releases memory back to the OS.",
          "Memory Leak: Allocated memory is no longer referenced but never freed.",
          "Dangling Pointer: Pointer still referencing an address that was already freed.",
          "Internal vs External Fragmentation: free lists (First Fit, Best Fit, Worst Fit)."
        ],
        "codeSnippet": "int* ptr = (int*)malloc(sizeof(int) * 10);\n// use ptr\nfree(ptr);\nptr = NULL; // Defeat dangling pointer!",
        "timeComplexity": "O(1) to O(N) allocation per fit strategy",
        "spaceComplexity": "System heap capacity"
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What occurs when a program allocates heap memory with malloc() but never calls free() before losing the pointer reference?",
            "options": [
              "A Memory Leak occurs, consuming system RAM indefinitely",
              "A Segmentation Fault immediately",
              "The compiler automatically deletes it in C",
              "The CPU cache is wiped"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "What is a \"dangling pointer\"?",
            "options": [
              "A pointer that continues to point to a deallocated/freed memory location",
              "A pointer initialized to NULL",
              "A pointer that points to another pointer",
              "A pointer stored in global memory"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "Which allocation strategy selects the smallest free block large enough to satisfy a request?",
            "options": [
              "Best Fit",
              "First Fit",
              "Worst Fit",
              "Random Fit"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Mini-Boss: Free List Allocation Simulator",
        "description": "Simulate First-Fit memory allocation: given an array of free block sizes and an allocation request, return the index of the first block that can satisfy the request, or -1.",
        "starterCode": {
          "python": "def first_fit(blocks: list[int], req: int) -> int:\n    for idx, b in enumerate(blocks):\n        if b >= req: return idx\n    return -1",
          "cpp": "#include <vector>\nusing namespace std;\nint firstFit(const vector<int>& blocks, int req) {\n    for (int i = 0; i < blocks.size(); i++) if (blocks[i] >= req) return i;\n    return -1;\n}",
          "java": "public class Solution {\n    public int firstFit(int[] blocks, int req) {\n        for (int i = 0; i < blocks.length; i++) if (blocks[i] >= req) return i;\n        return -1;\n    }\n}",
          "c": "int firstFit(int blocks[], int n, int req) { for(int i=0;i<n;i++) if(blocks[i]>=req) return i; return -1; }"
        },
        "testCases": [
          {
            "input": "[100, 500, 200, 300, 600], 212",
            "expectedOutput": "1"
          },
          {
            "input": "[100, 200], 500",
            "expectedOutput": "-1"
          }
        ]
      }
    }
  },
  {
    "id": 37,
    "levelId": 4,
    "orderIndex": 7,
    "title": "Memory Efficient Doubly Linked List (XOR Linked List)",
    "tier": "ADVANCED",
    "sublevelType": "HYBRID",
    "concepts": "Bitwise XOR pointer compression, npx = prev XOR next, bidirectional traversal",
    "badge": {
      "title": "Quantum Weaver",
      "description": "Merged forward and backward pointers into a single XOR quantum superposition.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#8B7FD9\" d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "Instead of carrying two compasses (one pointing North, one pointing South), you carry one magic compass encoded with North XOR South. When you know where you came from, you XOR it to discover where to go next!",
        "keyTakeaways": [
          "A XOR Linked List stores only one pointer field per node: npx = address(prev) ^ address(next).",
          "Saves memory by cutting pointer overhead in half compared to standard Doubly Linked Lists.",
          "To move forward: next_addr = prev_addr ^ curr->npx.",
          "To move backward: prev_addr = next_addr ^ curr->npx."
        ],
        "codeSnippet": "struct XNode {\n    int val;\n    uintptr_t npx; // prev ^ next\n};\nXNode* nextNode(XNode* curr, XNode* prev) {\n    return (XNode*)((uintptr_t)prev ^ curr->npx);\n}",
        "timeComplexity": "O(1) insert head / O(N) traversal",
        "spaceComplexity": "O(1) pointer per node (50% reduction!)"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30
        ],
        "steps": [
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Head node A (10): prev=0 (NULL). npx = 0 ^ addr(B) = addr(B).",
            "codeLine": "curr = head; prev = NULL;"
          },
          {
            "activeIndices": [
              1
            ],
            "pointerLeft": 1,
            "pointerRight": 1,
            "action": "Node B (20): npx = addr(A) ^ addr(C). Next = prev ^ npx = addr(A) ^ (addr(A) ^ addr(C)) = addr(C)!",
            "codeLine": "next = prev ^ curr->npx;"
          },
          {
            "activeIndices": [
              2
            ],
            "pointerLeft": 2,
            "pointerRight": 2,
            "action": "Tail Node C (30): next=0 (NULL). npx = addr(B) ^ 0 = addr(B).",
            "codeLine": "curr = next;"
          },
          {
            "activeIndices": [
              2
            ],
            "pointerLeft": 2,
            "pointerRight": 2,
            "action": "Now reversing direction: prev = next ^ curr->npx yields addr(B)! Bidirectional traversal verified.",
            "codeLine": "prev = next ^ curr->npx;"
          }
        ]
      },
      "dryRun": {
        "code": "function xorTraverse(npxList) {\n  let prev = 0, curr = npxList[0], visited = [];\n  // simulate XOR addresses\n  return [10, 20, 30];\n}",
        "traceRows": [
          {
            "iteration": 1,
            "curr": "Node A",
            "prev": "NULL",
            "next": "Node B",
            "action": "next = 0 ^ (0 ^ B) = B"
          },
          {
            "iteration": 2,
            "curr": "Node B",
            "prev": "Node A",
            "next": "Node C",
            "action": "next = A ^ (A ^ C) = C"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What mathematical property allows the XOR linked list to compute the next node address?",
            "options": [
              "X ^ (X ^ Y) = Y",
              "X + Y = Y + X",
              "X * 0 = 0",
              "X & X = X"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "What is the primary motivation for implementing an XOR Linked List over a standard Doubly Linked List?",
            "options": [
              "50% reduction in pointer storage memory overhead while retaining bidirectional traversal",
              "Faster hardware caching",
              "Avoids garbage collection",
              "Simpler debugging in IDEs"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "Why can modern languages like Java or Python not easily implement an XOR Linked List directly?",
            "options": [
              "They lack raw memory pointer manipulation and their garbage collectors cannot track XOR-masked references",
              "They do not support bitwise XOR",
              "They have no classes",
              "It is blocked by compiler standards"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: XOR Linked List Traversal Simulator",
        "description": "Given simulated integer addresses where each node has value and npx = prev_addr ^ next_addr, traverse the list from head (prev=0) to tail and return all values.",
        "starterCode": {
          "python": "def traverse_xor_list(nodes: dict[int, tuple[int, int]], head: int) -> list[int]:\n    res = []\n    prev = 0\n    curr = head\n    while curr != 0:\n        val, npx = nodes[curr]\n        res.append(val)\n        nxt = prev ^ npx\n        prev = curr\n        curr = nxt\n    return res",
          "cpp": "// C++ XOR simulator",
          "java": "// Java XOR simulator",
          "c": "// C XOR simulator"
        },
        "testCases": [
          {
            "input": "{1: (10, 2), 2: (20, 3), 3: (30, 2)}, head=1",
            "expectedOutput": "[10, 20, 30]"
          }
        ]
      }
    }
  },
  {
    "id": 38,
    "levelId": 4,
    "orderIndex": 8,
    "title": "Unrolled Linked List",
    "tier": "ADVANCED",
    "sublevelType": "HYBRID",
    "concepts": "Nodes storing micro-arrays, cache friendliness, high B-tree efficiency",
    "badge": {
      "title": "Unrolled Architect",
      "description": "Bridged the gap between cache-friendly arrays and dynamic linked nodes.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#A5D6A7\" d=\"M4 6h16v12H4zM2 4v16h20V4H2zm4 4h4v8H6V8zm6 0h6v8h-6V8z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "Instead of having each train car hold just one solitary person (linked list), each train car holds a compartment of 8 people (array of elements). You get fast array scanning inside compartments AND easy linked additions between cars!",
        "keyTakeaways": [
          "Each node contains a fixed-capacity static array of elements and a next pointer.",
          "Dramatically reduces pointer overhead per element (e.g. 1 pointer per 16 elements).",
          "Exceptional CPU L1/L2 cache locality when traversing elements.",
          "Insertions split full nodes (similar to B-Tree leaves); deletions merge underfull nodes."
        ],
        "codeSnippet": "struct UnrolledNode {\n    int elements[16];\n    int numElements;\n    UnrolledNode* next;\n};",
        "timeComplexity": "O(sqrt(N)) search and insertion",
        "spaceComplexity": "O(N) with minimal pointer metadata"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30,
          40
        ],
        "steps": [
          {
            "activeIndices": [
              0,
              1
            ],
            "pointerLeft": 0,
            "pointerRight": 1,
            "action": "Node 1 holds micro-array [10, 20]. Scanned in CPU cache instantly.",
            "codeLine": "scan(node1.elements);"
          },
          {
            "activeIndices": [
              2,
              3
            ],
            "pointerLeft": 2,
            "pointerRight": 3,
            "action": "Hop pointer node1->next to Node 2 holding micro-array [30, 40].",
            "codeLine": "scan(node2.elements);"
          },
          {
            "activeIndices": [
              2
            ],
            "pointerLeft": 2,
            "pointerRight": 2,
            "action": "Element 30 found in Node 2 with only 1 pointer traversal!",
            "codeLine": "return found;"
          }
        ]
      },
      "dryRun": {
        "code": "function searchUnrolled(nodes, target) {\n  for (let n of nodes) {\n    if (n.elements.includes(target)) return true;\n  }\n  return false;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "node": 1,
            "elements": "[10, 20]",
            "action": "target 30 not in node 1"
          },
          {
            "iteration": 2,
            "node": 2,
            "elements": "[30, 40]",
            "action": "target 30 FOUND in node 2!"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the primary advantage of an unrolled linked list over a traditional singly linked list?",
            "options": [
              "Superior CPU cache locality and reduced pointer memory overhead",
              "O(1) worst-case search for any element",
              "Requires zero heap allocations",
              "Works without pointers"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "What happens when inserting into a node whose internal element array is already at capacity?",
            "options": [
              "The node is split into two half-full nodes connected by a next pointer",
              "The operation throws a Stack Overflow",
              "The newest element is discarded",
              "The entire linked list is destroyed"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "What is the typical time complexity to find the k-th element in an unrolled linked list with node capacity B?",
            "options": [
              "O(N / B + B)",
              "O(1)",
              "O(N^2)",
              "O(2^N)"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Unrolled Linked List Index Lookup",
        "description": "Given a list of node arrays representing an unrolled linked list and a 0-indexed position k, find the element at position k.",
        "starterCode": {
          "python": "def get_unrolled_index(nodes: list[list[int]], k: int) -> int:\n    for chunk in nodes:\n        if k < len(chunk): return chunk[k]\n        k -= len(chunk)\n    return -1",
          "cpp": "// C++ unrolled index",
          "java": "// Java unrolled index",
          "c": "// C unrolled index"
        },
        "testCases": [
          {
            "input": "[[1, 2, 3], [4, 5], [6, 7, 8]], k=4",
            "expectedOutput": "5"
          }
        ]
      }
    }
  },
  {
    "id": 39,
    "levelId": 4,
    "orderIndex": 9,
    "title": "Skip List",
    "tier": "ADVANCED",
    "sublevelType": "HYBRID",
    "concepts": "Probabilistic hierarchy, multi-level express lanes, O(log N) search and insert",
    "badge": {
      "title": "Hyperlane Navigator",
      "description": "Zipped through multi-level express skip lanes in O(log N) probabilistic time.",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#FFD54F\" d=\"M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z\"/></svg>",
      "xpReward": 500
    },
    "stages": {
      "theory": {
        "eli5": "A Skip List is like an express subway system. Level 1 stops at every single station [1, 2, 3, 4, 5, 6]. Level 2 is the express train stopping only at [1, 3, 5]. Level 3 stops only at [1, 5]. You take the express train to skip ahead, then hop down to the local train for the exact destination!",
        "keyTakeaways": [
          "Probabilistic alternative to balanced search trees (AVL / Red-Black).",
          "Layered linked lists: layer 0 contains all elements; layer k contains ~N / 2^k elements.",
          "Average search, insert, and delete all run in O(log N) time.",
          "Simpler to implement and lock concurrently than balanced binary trees (used in Redis Sorted Sets!)."
        ],
        "codeSnippet": "// Skip list forward hop\nwhile (curr->forward[level] && curr->forward[level]->val < target) {\n    curr = curr->forward[level]; // Express hop!\n}",
        "timeComplexity": "O(log N) average search, insert, delete",
        "spaceComplexity": "O(N) probabilistic pointer levels"
      },
      "visualization": {
        "initialArray": [
          10,
          20,
          30,
          40
        ],
        "steps": [
          {
            "activeIndices": [
              0
            ],
            "pointerLeft": 0,
            "pointerRight": 0,
            "action": "Target: 40. Start at highest Express Lane Level 2 at node [10].",
            "codeLine": "level = maxLevel;"
          },
          {
            "activeIndices": [
              0,
              2
            ],
            "pointerLeft": 0,
            "pointerRight": 2,
            "action": "Level 2 Express Hop: jumps over 20 directly to [30]! 30 < 40.",
            "codeLine": "curr = curr->forward[2]; // at 30"
          },
          {
            "activeIndices": [
              2,
              3
            ],
            "pointerLeft": 2,
            "pointerRight": 3,
            "action": "Drop to Level 0: Next node is [40]. Target found in just 2 hops!",
            "codeLine": "return curr->forward[0];"
          }
        ]
      },
      "dryRun": {
        "code": "function skipSearch(levels, target) {\n  let hops = 0;\n  // hops down express layers\n  return hops;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "level": 2,
            "curr": 10,
            "next": 30,
            "action": "Express hop to 30"
          },
          {
            "iteration": 2,
            "level": 0,
            "curr": 30,
            "next": 40,
            "action": "Found target 40!"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the average time complexity for searching an element in a Skip List with N items?",
            "options": [
              "O(log N)",
              "O(N)",
              "O(1)",
              "O(N log N)"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "How does a Skip List decide how many express levels a newly inserted node will participate in?",
            "options": [
              "Coin toss / probabilistic random number generation (e.g. 50% chance per level)",
              "Strict alphabetical order",
              "Hardcoded alternating pattern",
              "CPU clock cycles"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "Which popular production database engine uses Skip Lists for its Sorted Set (ZSET) data structure?",
            "options": [
              "Redis",
              "PostgreSQL",
              "SQLite",
              "MongoDB"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Boss Battle: Design SkipList Search & Add",
        "description": "Implement a SkipList with search, add, and erase operations in O(log N) average time without using standard library sets.",
        "starterCode": {
          "python": "class Skiplist:\n    def __init__(self):\n        self.items = []\n    def search(self, target: int) -> bool:\n        return target in self.items\n    def add(self, num: int) -> None:\n        import bisect; bisect.insort(self.items, num)\n    def erase(self, num: int) -> bool:\n        if num in self.items:\n            self.items.remove(num); return True\n        return False",
          "cpp": "// C++ SkipList",
          "java": "// Java SkipList",
          "c": "// C SkipList"
        },
        "testCases": [
          {
            "input": "add(1), add(2), add(3), search(0), add(4), search(1), erase(0), erase(1), search(1)",
            "expectedOutput": "[false, true, false, true, false]"
          }
        ]
      }
    }
  },
  {
    "id": 40,
    "levelId": 4,
    "orderIndex": 10,
    "title": "BOSS: Chain Breaker",
    "tier": "ADVANCED",
    "sublevelType": "CODE_BASED",
    "concepts": "Merge K sorted lists, reverse nodes in k-group, LRU cache integration",
    "badge": {
      "title": "Chain Sovereign",
      "description": "Conquered the Linked Structures Labyrinth, shattering all pointer curses!",
      "iconSvg": "<svg viewBox=\"0 0 24 24\"><path fill=\"#FFD700\" d=\"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z\"/></svg>",
      "xpReward": 1000
    },
    "stages": {
      "theory": {
        "eli5": "The Dungeon Boss wraps you in chains of K intertwined sorted lists! You must weave all K lists into one single master sorted chain without spilling a single drop of RAM.",
        "keyTakeaways": [
          "Merge K sorted linked lists using a min-heap priority queue in O(N log K) time.",
          "Reverse nodes in k-group: manage sub-chain boundaries with sentinel head dummy nodes.",
          "Pointer mastery: avoiding cycle creation and handling NULL terminations seamlessly."
        ],
        "codeSnippet": "// Merge K lists with min-heap\npriority_queue<ListNode*, vector<ListNode*>, compare> pq;\nfor (auto l : lists) if (l) pq.push(l);",
        "timeComplexity": "O(N log K) where N is total nodes, K is lists count",
        "spaceComplexity": "O(K) heap size"
      },
      "visualization": {
        "initialArray": [
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "steps": [
          {
            "activeIndices": [
              0,
              1
            ],
            "pointerLeft": 0,
            "pointerRight": 1,
            "action": "Merging List 1 [1, 4] and List 2 [2, 5] and List 3 [3, 6]. Min is 1.",
            "codeLine": "pq.pop();"
          },
          {
            "activeIndices": [
              1,
              2
            ],
            "pointerLeft": 1,
            "pointerRight": 2,
            "action": "Next smallest extracted: 2 from List 2. Linked: 1 -> 2.",
            "codeLine": "tail->next = 2; tail = 2;"
          },
          {
            "activeIndices": [
              2,
              3
            ],
            "pointerLeft": 2,
            "pointerRight": 3,
            "action": "Next smallest: 3 from List 3. Linked: 1 -> 2 -> 3.",
            "codeLine": "tail->next = 3; tail = 3;"
          },
          {
            "activeIndices": [
              3,
              4
            ],
            "pointerLeft": 3,
            "pointerRight": 4,
            "action": "Extracted 4, then 5, then 6. Master sorted chain woven: [1, 2, 3, 4, 5, 6]!",
            "codeLine": "return dummy.next;"
          }
        ]
      },
      "dryRun": {
        "code": "function mergeKLists(lists) {\n  let flattened = lists.flat().sort((a,b) => a-b);\n  return flattened;\n}",
        "traceRows": [
          {
            "iteration": 1,
            "lists": "[[1, 4], [2, 5], [3, 6]]",
            "action": "Extract min 1"
          },
          {
            "iteration": 2,
            "lists": "Extract min 2",
            "action": "Result: 1 -> 2"
          },
          {
            "iteration": 3,
            "lists": "All K lists merged",
            "action": "Complete: [1, 2, 3, 4, 5, 6]"
          }
        ]
      },
      "guidedCode": {
        "prompt": "Merge K sorted lists into one unified sorted list.",
        "starterCode": {
          "python": "class Solution:\n    def mergeKLists(self, lists: list[list[int]]) -> list[int]:\n        import heapq\n        merged = []\n        for l in lists:\n            merged.extend(l)\n        return sorted(merged)",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> mergeKLists(vector<vector<int>>& lists) {\n        vector<int> res;\n        for (const auto& l : lists) for (int x : l) res.push_back(x);\n        sort(res.begin(), res.end());\n        return res;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> mergeKLists(List<List<Integer>> lists) {\n        List<Integer> res = new ArrayList<>();\n        for (List<Integer> l : lists) res.addAll(l);\n        Collections.sort(res);\n        return res;\n    }\n}",
          "c": "// C merge K stub"
        }
      },
      "easyProblem": {
        "title": "Trial: Merge Two Sorted Lists",
        "description": "Merge two sorted linked lists and return it as a new sorted list in O(N + M) time and O(1) space.",
        "starterCode": {
          "python": "class Solution:\n    def mergeTwoLists(self, list1: list[int], list2: list[int]) -> list[int]:\n        return sorted(list1 + list2)",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> mergeTwoLists(vector<int>& l1, vector<int>& l2) {\n        vector<int> res = l1;\n        res.insert(res.end(), l2.begin(), l2.end());\n        sort(res.begin(), res.end());\n        return res;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> mergeTwoLists(List<Integer> l1, List<Integer> l2) {\n        List<Integer> res = new ArrayList<>(l1);\n        res.addAll(l2);\n        Collections.sort(res);\n        return res;\n    }\n}",
          "c": "// C merge two lists stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 4], [1, 3, 4]",
            "expectedOutput": "[1, 1, 2, 3, 4, 4]"
          },
          {
            "input": "[], []",
            "expectedOutput": "[]"
          }
        ]
      },
      "mediumProblem": {
        "title": "Trial: Reverse Nodes in k-Group",
        "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.",
        "starterCode": {
          "python": "class Solution:\n    def reverseKGroup(self, head: list[int], k: int) -> list[int]:\n        res = []\n        for i in range(0, len(head), k):\n            chunk = head[i:i+k]\n            if len(chunk) == k: res.extend(chunk[::-1])\n            else: res.extend(chunk)\n        return res",
          "cpp": "#include <vector>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> reverseKGroup(vector<int>& head, int k) {\n        vector<int> res;\n        for (int i = 0; i < head.size(); i += k) {\n            if (i + k <= head.size()) {\n                for (int j = i + k - 1; j >= i; j--) res.push_back(head[j]);\n            } else {\n                for (int j = i; j < head.size(); j++) res.push_back(head[j]);\n            }\n        }\n        return res;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> reverseKGroup(List<Integer> head, int k) {\n        List<Integer> res = new ArrayList<>();\n        for (int i = 0; i < head.size(); i += k) {\n            if (i + k <= head.size()) {\n                for (int j = i + k - 1; j >= i; j--) res.add(head.get(j));\n            } else {\n                for (int j = i; j < head.size(); j++) res.add(head.get(j));\n            }\n        }\n        return res;\n    }\n}",
          "c": "// C reverse K stub"
        },
        "testCases": [
          {
            "input": "[1, 2, 3, 4, 5], 2",
            "expectedOutput": "[2, 1, 4, 3, 5]"
          },
          {
            "input": "[1, 2, 3, 4, 5], 3",
            "expectedOutput": "[3, 2, 1, 4, 5]"
          }
        ]
      },
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": "What is the optimal time complexity to merge K sorted linked lists containing N total elements using a min-heap?",
            "options": [
              "O(N log K)",
              "O(N * K)",
              "O(N^2)",
              "O(K log N)"
            ],
            "correctAnswer": 0
          },
          {
            "id": 2,
            "question": "Why is a dummy sentinel node useful when splicing and reversing linked list chains?",
            "options": [
              "It eliminates edge-case checks for inserting or deleting at the head of the list",
              "It compresses list nodes",
              "It prevents segmentation faults automatically",
              "It sorts nodes automatically"
            ],
            "correctAnswer": 0
          },
          {
            "id": 3,
            "question": "In Reverse Nodes in k-Group, what should be done with the remaining nodes if their count is less than k?",
            "options": [
              "Leave them in their original order without reversal",
              "Reverse them anyway",
              "Delete them",
              "Append NULL nodes"
            ],
            "correctAnswer": 0
          }
        ]
      },
      "boss": {
        "title": "Apex Boss: The Shattered Chain of Hades",
        "description": "Given K sorted arrays, produce the final merged sorted array in O(N log K) time with 0 pointer exceptions.",
        "starterCode": {
          "python": "class Solution:\n    def solveBoss(self, lists: list[list[int]]) -> list[int]:\n        import heapq\n        h = []\n        for l in lists:\n            for x in l: heapq.heappush(h, x)\n        return [heapq.heappop(h) for _ in range(len(h))]",
          "cpp": "#include <vector>\n#include <queue>\nusing namespace std;\nclass Solution {\npublic:\n    vector<int> solveBoss(vector<vector<int>>& lists) {\n        priority_queue<int, vector<int>, greater<int>> pq;\n        for (auto& l : lists) for (int x : l) pq.push(x);\n        vector<int> res;\n        while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }\n        return res;\n    }\n};",
          "java": "import java.util.*;\nclass Solution {\n    public List<Integer> solveBoss(List<List<Integer>> lists) {\n        PriorityQueue<Integer> pq = new PriorityQueue<>();\n        for (List<Integer> l : lists) for (int x : l) pq.add(x);\n        List<Integer> res = new ArrayList<>();\n        while (!pq.isEmpty()) res.add(pq.poll());\n        return res;\n    }\n}",
          "c": "// C Apex Boss stub"
        },
        "testCases": [
          {
            "input": "[[1, 4, 5], [1, 3, 4], [2, 6]]",
            "expectedOutput": "[1, 1, 2, 3, 4, 4, 5, 6]"
          }
        ]
      }
    }
  }
]
};
