---
title: "269 - Alien Dictionary"
description: "https://leetcode.com/problems/alien-dictionary/"
tags: ["BFS", "TOPOLOGICAL_SORT"]
---

### Initial Thoughts

There is a lot of points to consider in this problem.

1. Every letter that starts as early in the list as possible is the first letter in the alphabet.
2. Multiple instances of the same letter in consecutive words takes the next letter to check. The list of words is lexicographically sorted.
3. We need to output the letter that occurs first.
4. How to output the right ordering. Are there multiple orderings?

### Letter Ordering

Any letter that occurs first, lexicographically or in the list, should be outputted first.
Lets compare a simple example of 2 strings `"eabf"` and `"eadg"`.

Since the input is sorted initially, `"eabc"` gives an ordering `e -> a -> b -> f`. The second string gives an ordering `e -> a -> d -> g`. `e` and `a` exist in the same ordering.

Is there any information that we can get from these two letters if we compared them pairwise?

We only know that `e` must come before `a`, but we would already know that in the first string, we do not need the second string. What we do know is that when there is a **difference** in the letters, then we know that the first string's letter comes **before** the second strings letter!

In our example, `b` and `d` are the first occurence of different letters, so we have deduced that `b` **must** come before `d`. For the next letters, `f` and `g` are different, but we are not able to deduce anything here, why?

`f` and `g` are different, but since we learned that prior, `b` and `d` caused the difference in ordering for the strings, we can not conclude that `f` comes before `g` **independently**. We do not know that this is the ordering of the alphabet because our string order was already influenced by a prior letter difference. So, we can say that if we found a letter difference, we have gotten all the information we needed and so we move to the next pair comparison.

### Iteration of Letters

We are able to interpret the sorted strings to breakdown what letters should come first before others. We notice a pattern in what is required in the problem.

> Find what letters **should come first** before the others.

This hints **Topological Sorting**. For some letter, we want to exhaust all letters that have come prior to it. In terms of dependencies, some letter requires all the letters used before it to be outputted before itself. This leads to the concept of **indegrees**, where we track how many letters will point to another letter. For example, the edges `e -> a`, `d -> a`, shows the `a` has an indegree of 2, because there are two letters pointing towards it. Conversely, no letters are pointing to `e` or `d`, so their indegrees are 0.

Notice that all the letters with indegrees of 0 represents a potential starting point. So, we can perform BFS (Kahn's Algorithm) based on the indegrees of the letters we have visited.

<ol>

<li> Initialize empty graph and indegrees array</li>
<li> Generate graph based on input</li>
<li> Initialize a queue based on what letters have an indegree of 0</li>
<li> Perform BFS. Take into account the logic of the question and how we traverse.</li>

<ul>

  <li>if we are visiting a node, reduce the indegree by 1 to indicate we visited one of its dependencies.</li>
  <li>if the indegree is 0, it means we visited all dependencies, and is a valid candidate to be next in the alphabet</li>
  <li> repeat until all letters are accounted for or queue is empty.</li>

</ul>

<li> Return the ordering of the letters.
</ol>

### Test Cases

For this particular question given their constraints:

1. You may assume all letters are in lowercase.
2. If the order is invalid, return an empty string.
3. There may be multiple valid order of letters, return any one of them is fine.

We can think of some simple test cases:

1. valid order
2. invalid order
3. empty list of strings
4. multiples of the same string

For an invalid order (2), we can consider when there are letters that are **impossible** to deduce from. One example of this is when there are substrings of words in the list that occur later. Take for example `["substring", "sub"]`. We will not be able to deduce anything about the order of `string`. We need differences in the letter in other strings to deduce an order to the alphabet. In this case, we return "".

### Code

Lets break down each part of the explanation above into its code. Lets assume we have a shell function

```python
def alienOrder(words):
  ...
```

###### Initialize

We can use Python's `defaultdict` and represent it to be a `set`. If we use a list, then we need to be aware of duplicate edges i.e. Two instances of the `e->a` will represent the graph to be `{ "e": ["a","a"] }`. If we use a set, multiple instances will be ignored.

```python
 # indegree array for each letter that exists
letters = { c: 0 for w in words for c in w }
graph = collections.defaultdict(set)
n = len(words)
```

###### Generate Graph

Based on the intuition above, we know that we only care about when there is a difference in letters between two strings. This indicates a specific ordering between these letters which is all we want.

```python
# we want to match pairwise
for i in range(1, n):
  first = words[i-1]
  second words[i]

  # if we want to consider invalid cases - (2)
  if len(first) > len(second) and first[:len(second)] == second:
    return ""

  # we can only compare up to the shortest string
  # from above, we guaruntee some letter is different.
  length = min(len(first), len(second))
  for j in range(length):
    # first occurence of a difference - this is all we want betwee the pair
    if first[j] != second[j]:
      # first[j] -> second[j] is the edge we have found!
      # even with a set, we use this condition to handle the indegrees!
      if second[j] not in graph[first[j]]:
        graph[first[j]].add(second[j])
        letters[second[j]] += 1
      # any differences later can not judge the relative order independently
      break
```

###### BFS

Given our graph, we perform `Kahn's Algorithm`. Our initial queue will be all letters with indegrees of 0. Since the solution allows different variations, we can pick any letter with indegree 0 to start off with.

```python
queue = collections.deque([k for k, v in letters.items() if v == 0])
solution = []
while queue:
  # next letter in the alphabet
  current = queue.pop()
  solution.append(current)

  # check all the outgoing edges and reduce their indegrees
  # add any letters into the queue if their indegree == 0
  for nextLetter in graph[current]:
    letters[nextLetter] -= 1
    if letters[nextLetter] == 0:
      queue.appendleft(nextLetter)
```

###### Return the output given results

Depending on our output, we can determine two things. If our solution does not hold all the letters found in our graph, it means that at some point, there is a letter(s) with indegrees > 0. This means that there are cycles within and there is no ordering that we can derive from it. Otherwise, we do have some kind of valid order that will work and we return that instead!

```python
return "".join(solution) if len(solution) == len(graph) else ""
```

### Final Remark

This problem boils down to breaking our input into graph nodes and performing topological sorting either via DFS or BFS (Kahn's Algorithm). The main complexities stems from creating the graph, as there are a few situations to take into account.

1. How much information we can from one difference in letters betwee two strings.
2. Were we able to get any more information after the first difference? Are they independent?
3. What would cause an invalid ordering and not give us the right solution?
4. How would we have dealt with duplicate strings, substrings, multiple letters?
