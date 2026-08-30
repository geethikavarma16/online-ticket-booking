export type ShowType = 'Premium' | 'Standard';

export type MovieStatus = 'Now Showing' | 'Coming Soon' | 'Inactive';

export type ShowStatus = 'Active' | 'Sold Out' | 'Cancelled' | 'Inactive';

export interface Movie {
  id: string;
  movieName: string;
  description: string;
  genre: string;
  language: string;
  duration: number; // in minutes
  releaseDate: string;
  rating: number; // e.g. 4.8 / 5
  certificate: 'U' | 'UA' | 'A' | 'R' | 'PG-13';
  status: MovieStatus;
  posterUrl?: string;
  backdropUrl?: string;
  director?: string;
  cast?: string[];
}

export interface Show {
  id: string;
  showName: string;
  movieId: string;
  movieName: string;
  showDate: string; // YYYY-MM-DD
  showTime: string; // e.g. "07:00 PM"
  theatre: string;
  screen: string;
  showType: ShowType;
  ticketPrice: number; // in ₹
  availableSeats: number;
  totalSeats: number;
  status: ShowStatus;
}

export type CaseStage = 'Initial' | 'Availability' | 'Approval' | 'Booking Execution' | 'Resolved-Completed' | 'Resolved-Rejected';

export type CaseStatus = 
  | 'New'
  | 'Open'
  | 'Availability Check'
  | 'Pending Confirmation'
  | 'Confirmed'
  | 'Processing'
  | 'In-Queue: Premium'
  | 'In-Queue: Standard'
  | 'Resolved-Completed'
  | 'Resolved-Rejected';

export type WorkQueueType = 'Premium ShowQueue' | 'Standard ShowQueue' | 'Unassigned';

export type SLAStatus = 'Within Goal' | 'After Goal Before Deadline' | 'Past Deadline' | 'Completed on Time';

export interface CaseHistoryItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  stage: CaseStage;
  status: CaseStatus;
  notes?: string;
}

export interface MovieTicketCase {
  id: string; // CW-000001
  caseName: string;
  // Customer Info
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Data References
  movieId: string;
  movieName: string;
  showId: string;
  showName: string;
  
  // Show Snapshot
  showDate: string;
  showTime: string;
  theatre: string;
  screen: string;
  showType: ShowType;
  ticketPrice: number;
  availableSeatsAtBooking: number;
  
  // Booking parameters
  numberOfTickets: number;
  totalCost: number; // Calculated: ticketPrice * numberOfTickets
  
  // Lifecycle & State
  stage: CaseStage;
  status: CaseStatus;
  customerConfirmed: boolean;
  confirmedAt?: string;
  
  // Routing & Assignment
  assignedQueue: WorkQueueType;
  assignedOperator?: string;
  
  // SLA configuration & tracking
  createdAt: string;
  goalTime: string; // 1 day
  deadlineTime: string; // 2 days
  slaUrgency: number; // 10 to 100
  slaStatus: SLAStatus;
  completedAt?: string;
  
  // Notification & Reference
  bookingReference: string; // e.g. CW-BK-84920
  emailDispatched: boolean;
  emailDispatchedAt?: string;
  
  // History Audit Trail
  history: CaseHistoryItem[];
  
  // Validation / Failure details
  failureReason?: string;
}

export interface EmailNotification {
  id: string;
  caseId: string;
  bookingReference: string;
  toEmail: string;
  toName: string;
  subject: string;
  movieName: string;
  showName: string;
  showDate: string;
  showTime: string;
  theatre: string;
  showType: ShowType;
  numberOfTickets: number;
  totalCost: number;
  sentAt: string;
  status: 'Delivered' | 'Pending';
  contentSnippet: string;
}

export type PersonaRole = 'Customer' | 'Staff' | 'Administrator';

export interface TestResult {
  id: string;
  userStoryId: string;
  title: string;
  pegaFeature: string;
  expectedBehavior: string;
  actualResult: string;
  passed: boolean;
  timestamp: string;
  details: string[];
}
