---
title: "1396 - Design Underground System"
description: "https://leetcode.com/problems/design-underground-system/"
tags: ["HASHMAP"]
---

### Initial Thoughts

We want to compute the average time between two stations only. That would indicate we would need to store the total time and number of times travel between two stations were made. Since we are abled to store this information between two unique stations, we likely can use a hashmap.

In Python3, we are abled to use tuples as unique keys, thus we can use `(startStation, endStation)` as a key, and store the total time and total travels between the two stations. This would allow our query to only run on linear time; pull the time and count and calculate the average.

A previous idea would have been to just store the average, but we will not be able to know how many times it has been travelled, thus unlikely abled to update the data.

### Implementation

This question is initially a design question. with the following skeleton

```python
class UndergroundSystem:

    def __init__(self):

    def checkIn(self, id: int, stationName: str, t: int) -> None:

    def checkOut(self, id: int, stationName: str, t: int) -> None:

    def getAverageTime(self, startStation: str, endStation: str) -> float:

```

Based on our initial thoughts we likely have a quick implemntation as follows:

1. initialize a hashmap storing the total travel time and traversals between two stations `(startStation, endStation)`. Also have another hashmap that stores a customers intermediate travel, thus we are able to retain what start station they were in and the time entered.
2. As noted above, checking in requires storing the station name and time entered. A unique key we can use here is the id.
3. When we checkout, we use the start station stored in step 2 and its time, to update the main hashmap. If there was an entry previously, we sum up the total time and increment the counter. If there was no entry, it is a new connection and save the difference in time with a count of 1
4. To query for average time, we simply pull the time and count, and divide.

The full implementation can be found below:

```python
class UndergroundSystem:

    def __init__(self):
        self.stations = {}
        self.checks = {} # when they initially check in and out - save the value for checkOut function

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.checks[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        # pull the stationName and time and calculate
        # checkIn always valid and t2 > t1 for self.checks[id] = (station1, t1)
        station1, t1 = self.checks[id]

        # pull past total time and count to query later
        if (station1, stationName) in self.stations:
            totalTime, count = self.stations[(station1, stationName)]

            self.stations[(station1, stationName)] = (totalTime + (t - t1), count + 1)
        # new connection - save total time as a count of 1
        else:
            self.stations[(station1, stationName)] = (t - t1, 1)

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        # pull total times and counts and average
        totalTime, count = self.stations[(startStation, endStation)]

        return (totalTime / count)
```

### Complexity Analysis

Time:

- `checkIn` takes O(1) to assign a key-value pair into the hashmap. Previous values are overridden if a customer travels more than once.
- `checkOut` takes O(1) as we access hashmaps and perform simple arithmetic calculations
- `getAverageTime` takes O(1) as we simply pull the time and count from the hashmap in O(1) and calculate the average

Space:

- O(N) where N is the number of check ins. All customers that come in, must exit in some station, so the number of calls to `checkIn` == number of calls to `checkOut`
