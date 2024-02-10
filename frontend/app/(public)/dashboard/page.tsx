// import WidgetCollection from "@/components/budgetSummary/widgetCollection";
import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import UpdatePurchase from "@/components/formsModal/updatePurchase";
import UpdateQuotation from "@/components/formsModal/updateQuotation";
import UpdateRequest from "@/components/forms/requests/updateRequest";
import Recents from "@/components/recentActivity/recent";
import SpendingTrendsChart from "@/components/statCharts/spendingLine";
import TableTabs from "@/components/tableTab/tab";
import Tips from "@/components/tips/tips";
import QueryNotification from "@/components/query/queryNotification";

/**
 * Dashboard Components visible to the Procurement Staff
 *
 * docs
 * pending tasks:    pending requisitions, purchase orders, awaiting approvals, pending vendor responses
 * notifications
 * recent activity feed:    submitted requisitions, approved orders
 * tips and reminders
 * budget overview:    allocated, remaining, spent percentage, warning limits
 * search and filter
 * quick links:    manage vendors, check status of purchase orders
 * KPI:    cost savings achieved, vendor performer ratings, fulfillment of timelines
 * charts:    spending trends, order volumes, vendor distribution
 * personalized widgets
 */

const recentsData = [
  {
    id: 1,
    date: "Oct 15, 2023 - 09:45 AM",
    description: "John Doe submitted a new requisition for office supplies",
    link: "/requisition-details",
    linkText: "View Requisition Details",
  },
  {
    id: 2,
    date: "Oct 16, 2023 - 10:30 AM",
    description: "Jane Smith completed a project milestone",
    link: "/project-details",
    linkText: "View Project Details",
  },
  {
    id: 3,
    date: "Oct 17, 2023 - 02:15 PM",
    description: "Bob Johnson received employee of the month award",
    link: "/employee-award-details",
    linkText: "View Award Details",
  },
  {
    id: 4,
    date: "Oct 18, 2023 - 04:45 PM",
    description: "Alice Williams started a new training program",
    link: "/training-program-details",
    linkText: "View Details",
  },
  {
    id: 5,
    date: "Oct 19, 2023 - 11:00 AM",
    description: "Charlie Brown participated in a team-building event",
    link: "/team-building-details",
    linkText: "View Details",
  },
];

export default function DashboardPage() {

  return (
    <div className="flex flex-col min-h-screen">

      <div className="bg-gradient-to-r from-[#197dfd] via-[#197dfd] to-slate-900 w-full">
        <SummaryStatWidget />
      </div>

      <Tips />

      <div className="w-full px-10 py-5">
        <p className="text-3xl font-bold text-gray-800 py-5 dark:text-white">Recent Activity</p>
        {recentsData.map((data) => (
          <Recents
            key={data.id}
            date={data.date}
            description={data.description}
            viewDetailsLink={data.link}
            viewDetailsLinkText={data.linkText}
          />
        ))}
      </div>
      <QueryNotification/>

      {/* <SpendingTrendsChart/> */}

    </div>
  );
}
