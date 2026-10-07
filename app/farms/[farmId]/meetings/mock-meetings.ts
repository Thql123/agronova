interface Meeting {
  id: string;
  title: string;
  status: "upcoming" | "scheduled";
  date: string;
  time: string;
  description: string;
  attendees: string[];
}

export const mockAttendees = [
  { id: "ibrahim", name: "Ibrahim Ogunsetan", initial: "I" },
  { id: "jane", name: "Jane Saike", initial: "J" },
  { id: "james", name: "James Obadina", initial: "J" },
];

// These display counts are intentionally independent of the preview cards.
export const mockMeetingSummary = [
  { label: "Upcoming", value: 2 },
  { label: "Scheduled", value: 1 },
  { label: "Total", value: 3 },
];

export const mockMeetings: Meeting[] = [
  {
    id: "monthly-farm-review",
    title: "Monthly Farm Review",
    status: "upcoming",
    date: "2026-07-20",
    time: "08:00",
    description: "Review KPIs, feed levels and Health Status",
    attendees: ["I.O", "J.A", "J.O"],
  },
  {
    id: "q3-finance-audit",
    title: "Q3 Finance Audit",
    status: "scheduled",
    date: "2026-09-30",
    time: "08:00",
    description: "Q1 Revenue vs expense review.",
    attendees: ["I.O", "J.A", "J.O"],
  },
];
