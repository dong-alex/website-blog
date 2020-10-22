---
title: "1625 - Lexicographically Smallest String After Applying Operations"
description: "https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations/"
tags: ["DFS"]
---

Here is a link to the <a href="https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations/" target="_blank" rel="noopener noreferrer">problem</a>.

### Initial Thoughts

We want to transform a string to another based on a set of operations.

1. Adding some value **_a_** to all odd-indices
2. Shifting to the right by **_b_**

There exists some combination that will take our original string to the lexicographically smallest string. How would you find the smallest string?

```python
# if currentString = "3345" and newString  = "3241"
currentString = min(currentString, newString)

# currentString changes to "3241"
```

Taking the minimum of a string will take its ASCII values and compares them to the other string. "3" are the same but "2" < "3" so `newString` will take over.

With the combinations, there really is no intuitive method to judge whether to pick `add` or `swap`. So we should consider the brute force approach - searching the entire possible search space of adding/shifting.

We have two choices at any state - `add` or `shift`

Following each of the choices we still have the two choices again. There is a possibility that we may visit the same string! So we should perhaps add the strings we have visited.

We can decide between DFS or BFS, the inherent nature of finding the shortest path with BFS is not necessary as we have to check the entire search space. As BFS is usually more memory intensive than DFS, we can opt to use an iterative/recursive approach.

No backtracking is necessary as we have no stopping point; we just calculate the minimum for each new string we have transformed. We do not need the recursive nature to handle our choices, so perhaps the best choice is to use iterative DFS.

### Add / Shift Operations

We need to handle how we add the string values, as well as how we shift the string by some amount. We continuously need to call these methods so we should probably have a seperate function to clean our code.

We **cycle** back within 0-10, which hints using `% 10`. With rotating we can split a string at the index of the rotation and swap them.

```python
def findLexSmallestString(s, a, b)
  def add(string):
    newString = []
    n = len(string)
    for i in range(n):
        char = string[i]
        if i % 2 == 1:
            newString.append(str((int(char) + a) % 10))
        else:
            newString.append(char)
    return "".join(newString)

  def rotate(string):
    return string[b:] + string[:b]
```

### Iterative DFS

The rest of the code is just the shell of a standard iterative DFS function.

```python
def findLexSmallestString(s, a, b):
  ...
  visited = set()
  stack = [s]
  visited.add(s)
  minimumString = s

  while stack:
      current = stack.pop()

      # logic
      minimumString = min(current, minimumString)

      # add or rotate
      rotateString = rotate(current)
      addString = add(current)

      # add into stack
      if rotateString not in visited:
          visited.add(rotateString)
          stack.append(rotateString)

      if addString not in visited:
          visited.add(addString)
          stack.append(addString)

  return minimumString
```

Time complexity is a bit difficult to comprehend, but in general it is quadratic. Space complexity is linear with the required string operations along with the stack and visited data structures. Some more in-depth explanations can be found <a href="https://leetcode.com/problems/lexicographically-smallest-string-after-applying-operations/discuss/?currentPage=1&orderBy=hot&query=" target="_blank" rel="noopener noreferrer">here</a>
