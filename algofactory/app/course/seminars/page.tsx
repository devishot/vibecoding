import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const seminars = [
  { week: 1, topic: "Problem Solving Strategies", date: "2024-06-05", videoLink: "https://example.com/seminar1" },
  { week: 2, topic: "Advanced Sorting Techniques", date: "2024-06-12", videoLink: "https://example.com/seminar2" },
  { week: 3, topic: "Binary Search Applications", date: "2024-06-19", videoLink: "https://example.com/seminar3" },
  { week: 4, topic: "Graph Traversal Algorithms", date: "2024-06-26", videoLink: "https://example.com/seminar4" },
  { week: 5, topic: "Dynamic Programming Patterns", date: "2024-07-03", videoLink: "https://example.com/seminar5" },
]

export default function SeminarsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Seminars</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Video Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seminars.map((seminar) => (
            <TableRow key={seminar.week}>
              <TableCell>{seminar.week}</TableCell>
              <TableCell>{seminar.topic}</TableCell>
              <TableCell>{seminar.date}</TableCell>
              <TableCell>
                <a
                  href={seminar.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Watch Video
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

