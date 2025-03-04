import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const studyPlan = [
  {
    week: 1,
    topic: "Introduction to Algorithms",
    subtopics: ["Time Complexity", "Space Complexity", "Big O Notation"],
  },
  {
    week: 2,
    topic: "Sorting Algorithms",
    subtopics: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort", "Quick Sort"],
  },
  {
    week: 3,
    topic: "Searching Algorithms",
    subtopics: ["Linear Search", "Binary Search", "Depth-First Search", "Breadth-First Search"],
  },
  {
    week: 4,
    topic: "Graph Algorithms",
    subtopics: ["Graph Representation", "Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm"],
  },
  {
    week: 5,
    topic: "Dynamic Programming",
    subtopics: ["Memoization", "Tabulation", "Longest Common Subsequence", "Knapsack Problem"],
  },
]

export default function StudyPlanPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Study Plan</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Subtopics</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studyPlan.map((week) => (
            <TableRow key={week.week}>
              <TableCell>{week.week}</TableCell>
              <TableCell>{week.topic}</TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {week.subtopics.map((subtopic, index) => (
                    <li key={index}>{subtopic}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

