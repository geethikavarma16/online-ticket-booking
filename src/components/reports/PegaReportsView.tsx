import React, { useState } from 'react';
import {
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  FileSpreadsheet,
  Download,
  Filter,
  DollarSign
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { usePega } from '../../context/PegaContext';

export const PegaReportsView: React.FC = () => {
  const { cases } = usePega();
  const [filterType, setFilterType] = useState<'all' | 'Premium' | 'Standard'>('all');

  // Compute Metrics
  const totalBookings = cases.length;
  const completedBookings = cases.filter((c) => c.status === 'Resolved-Completed').length;
  const pendingBookings = cases.filter(
    (c) => c.status !== 'Resolved-Completed' && c.status !== 'Resolved-Rejected'
  ).length;
  const rejectedBookings = cases.filter((c) => c.status === 'Resolved-Rejected').length;

  const totalRevenue = cases
    .filter((c) => c.status === 'Resolved-Completed')
    .reduce((sum, c) => sum + c.totalCost, 0);

  // Status Distribution Data
  const statusData = [
    { name: 'Resolved-Completed', value: completedBookings, color: '#4E7A58' },
    { name: 'In-Queue / Processing', value: pendingBookings, color: '#607258' },
    { name: 'Rejected / Insufficient Seats', value: rejectedBookings, color: '#B45309' }
  ];

  // Show Type Distribution Data
  const premiumCases = cases.filter((c) => c.showType === 'Premium');
  const standardCases = cases.filter((c) => c.showType === 'Standard');
  const showTypeData = [
    { name: 'Premium ShowQueue (IMAX / VIP)', count: premiumCases.length, revenue: premiumCases.filter(c => c.status === 'Resolved-Completed').reduce((s, c) => s + c.totalCost, 0) },
    { name: 'Standard ShowQueue (2D)', count: standardCases.length, revenue: standardCases.filter(c => c.status === 'Resolved-Completed').reduce((s, c) => s + c.totalCost, 0) }
  ];

  // SLA Performance Data
  const slaWithinGoal = cases.filter((c) => c.slaStatus === 'Within Goal' || c.slaStatus === 'Completed on Time').length;
  const slaAfterGoal = cases.filter((c) => c.slaStatus === 'After Goal Before Deadline').length;
  const slaBreached = cases.filter((c) => c.slaStatus === 'Past Deadline').length;

  const slaData = [
    { name: 'Within Goal (<24h)', value: slaWithinGoal, color: '#4E7A58' },
    { name: 'After Goal (<48h)', value: slaAfterGoal, color: '#D4A373' },
    { name: 'SLA Breached (>48h)', value: slaBreached, color: '#B45309' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E6E2DC] p-5 sm:p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8B9A80]/20 text-[#4E5C46]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-serif font-bold text-[#2D302A]">
              Pega Case Reporting & Business Analytics
            </h2>
          </div>
          <p className="text-xs text-[#5C6156]">
            Real-time case volumes, work queue throughput, SLA compliance, and revenue performance.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E6E2DC] p-5 rounded-2xl shadow-sm space-y-1.5">
          <span className="text-[10px] text-[#5C6156] uppercase tracking-wider font-bold">
            TOTAL BOOKING CASES
          </span>
          <div className="text-2xl font-black text-[#2D302A] font-mono">{totalBookings}</div>
          <span className="text-[11px] text-[#607258] font-medium">Movie Ticket Requests</span>
        </div>

        <div className="bg-white border border-[#E6E2DC] p-5 rounded-2xl shadow-sm space-y-1.5">
          <span className="text-[10px] text-[#5C6156] uppercase tracking-wider font-bold">
            COMPLETED & FULFILLED
          </span>
          <div className="text-2xl font-black text-[#4E7A58] font-mono">{completedBookings}</div>
          <span className="text-[11px] text-[#4E7A58] font-medium">Resolved-Completed</span>
        </div>

        <div className="bg-white border border-[#E6E2DC] p-5 rounded-2xl shadow-sm space-y-1.5">
          <span className="text-[10px] text-[#5C6156] uppercase tracking-wider font-bold">
            IN QUEUES / PENDING
          </span>
          <div className="text-2xl font-black text-[#945E1B] font-mono">{pendingBookings}</div>
          <span className="text-[11px] text-[#945E1B] font-medium">Active Life Cycle</span>
        </div>

        <div className="bg-white border border-[#E6E2DC] p-5 rounded-2xl shadow-sm space-y-1.5">
          <span className="text-[10px] text-[#5C6156] uppercase tracking-wider font-bold">
            TOTAL REVENUE (₹)
          </span>
          <div className="text-2xl font-black text-[#607258] font-mono">₹{totalRevenue}</div>
          <span className="text-[11px] text-[#607258] font-medium">Paid Ticket Value</span>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Show Type Volume & Revenue */}
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-serif font-bold text-[#2D302A] flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#607258]" />
            <span>Show Type & Work Queue Distribution (Premium vs Standard)</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={showTypeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#8C9285" fontSize={11} />
                <YAxis stroke="#8C9285" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E6E2DC', borderRadius: '12px', fontSize: '12px', color: '#2D302A' }}
                />
                <Bar dataKey="count" name="Case Count" fill="#607258" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: SLA Compliance Breakdown */}
        <div className="bg-white border border-[#E6E2DC] p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-serif font-bold text-[#2D302A] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#607258]" />
            <span>SLA Performance & Urgency Compliance</span>
          </h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={slaData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {slaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#FAF7F2', borderColor: '#E6E2DC', borderRadius: '12px', fontSize: '12px', color: '#2D302A' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#5C6156' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
