---
title: "Introduction"
date: "2020-10-21"
description: "Introduction to programming blog"
tags: ["DISCUSSION"]
---

Welcome to my blog! I will be documenting my learnings with algorithms and different patterns for a variety of programming questions.

There will be a mix of diagrams and code to help explain my thought process.

The blog will be changing its layout as not everything has been sent in place yet.

Here is an example of a code submission.

_1625. Lexicographically Smallest String After Applying Operations_

```python{numberLines: true}
class Solution:
    def findLexSmallestString(self, s: str, a: int, b: int) -> str:

        def rotate(string):
            return string[b:] + string[:b]

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
