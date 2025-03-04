import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const lectures = [
  { week: 1, topic: "Introduction to Algorithms", date: "2024-06-01", videoLink: "https://example.com/lecture1" },
  { week: 2, topic: "Sorting Algorithms", date: "2024-06-08", videoLink: "https://example.com/lecture2" },
  { week: 3, topic: "Searching Algorithms", date: "2024-06-15", videoLink: "https://example.com/lecture3" },
  { week: 4, topic: "Graph Algorithms", date: "2024-06-22", videoLink: "https://example.com/lecture4" },
  { week: 5, topic: "Dynamic Programming", date: "2024-06-29", videoLink: "https://example.com/lecture5" },
]

export default function LecturesPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Lectures</h1>
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
          {lectures.map((lecture) => (
            <TableRow key={lecture.week}>
              <TableCell>{lecture.week}</TableCell>
              <TableCell>{lecture.topic}</TableCell>
              <TableCell>{lecture.date}</TableCell>
              <TableCell>
                <a
                  href={lecture.videoLink}
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

