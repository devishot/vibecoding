import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ProgressTracker } from "@/components/progress-tracker"

const homeworks = [
  {
    week: 1,
    topic: "Time Complexity Analysis",
    publishDate: "2024-06-02",
    problems: [
      {
        name: "Two Sum",
        url: "https://leetcode.com/problems/two-sum/",
        tags: ["Array", "Hash Table"],
        status: "Solved",
      },
      {
        name: "Valid Parentheses",
        url: "https://leetcode.com/problems/valid-parentheses/",
        tags: ["Stack", "String"],
        status: "Not Solved",
      },
    ],
  },
  {
    week: 2,
    topic: "Sorting and Searching",
    publishDate: "2024-06-09",
    problems: [
      {
        name: "Merge Sorted Array",
        url: "https://leetcode.com/problems/merge-sorted-array/",
        tags: ["Array", "Two Pointers"],
        status: "Solved",
      },
      {
        name: "Search in Rotated Sorted Array",
        url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
        tags: ["Array", "Binary Search"],
        status: "Attempted",
      },
    ],
  },
]

const progressData = [
  { week: 1, solved: 1, total: 2 },
  { week: 2, solved: 1, total: 2 },
]

export default function HomeworksPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Homeworks</h1>
      <ProgressTracker data={progressData} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Problems</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {homeworks.map((homework) => (
            <TableRow key={homework.week}>
              <TableCell>{homework.week}</TableCell>
              <TableCell>{homework.topic}</TableCell>
              <TableCell>{homework.publishDate}</TableCell>
              <TableCell>
                <ul className="space-y-2">
                  {homework.problems.map((problem, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {problem.name}
                      </a>
                      <div className="space-x-1">
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Badge
                        variant={
                          problem.status === "Solved"
                            ? "success"
                            : problem.status === "Attempted"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {problem.status}
                      </Badge>
                    </li>
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

