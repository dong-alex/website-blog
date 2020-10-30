export enum Topics {
  HASHMAP = "Hashmap",
  ARRAY = "Array",
  SLIDING_WINDOW = "Sliding Window",
  HEAP = "Heap",
  STACK = "Stack",
  QUEUE = "Queue",
  BACKTRACKING = "Backtracking",
  TREE = "Tree",
  GRAPH = "Graph",
  GREEDY = "Greedy",
  LINKED_LIST = "Linked List",
  SEGMENT_TREE = "Segement Tree",
  BINARY_SEARCH_TREE = "Binary Search Tree",
  DFS = "Depth First Search",
  BFS = "Breadth First Search",
  BIT_MANIPULATION = "Bit Manipulation",
  BINARY_SEARCH = "Binary Search",
  TOPOLOGICAL_SORT = "Topological Sort",
  STRING = "String",
  DYNAMIC_PROGRAMMING = "Dynamic Programming",
  // unrelated to topics in algorithms
  DISCUSSION = "Discussion",
  PROJECT = "Project",
}

export type Topic = keyof typeof Topics
