import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const leaderboardData = [
  { name: "Alice Johnson", avatar: "/avatars/alice.jpg", totalSolved: 45, weeklyBreakdown: [10, 8, 12, 15] },
  { name: "Bob Smith", avatar: "/avatars/bob.jpg", totalSolved: 42, weeklyBreakdown: [9, 10, 11, 12] },
  { name: "Charlie Brown", avatar: "/avatars/charlie.jpg", totalSolved: 40, weeklyBreakdown: [8, 9, 11, 12] },
  { name: "Diana Ross", avatar: "/avatars/diana.jpg", totalSolved: 38, weeklyBreakdown: [7, 8, 10, 13] },
  { name: "Ethan Hunt", avatar: "/avatars/ethan.jpg", totalSolved: 35, weeklyBreakdown: [6, 7, 9, 13] },
]

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Rank</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Total Solved</TableHead>
            <TableHead>Week 1</TableHead>
            <TableHead>Week 2</TableHead>
            <TableHead>Week 3</TableHead>
            <TableHead>Week 4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((student, index) => (
            <TableRow key={student.name}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.avatar} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{student.name}</span>
              </TableCell>
              <TableCell>{student.totalSolved}</TableCell>
              {student.weeklyBreakdown.map((weekSolved, weekIndex) => (
                <TableCell key={weekIndex}>{weekSolved}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

