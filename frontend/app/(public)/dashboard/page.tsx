// import WidgetCollection from "@/components/budgetSummary/widgetCollection";
import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import Tips from "@/components/tips/tips";
import QueryNotification from "@/components/query/queryNotification";
import SpendingTrendsChart from "@/components/statCharts/spendingLine";

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

export default function DashboardPage() {

  return (
    <div className="flex flex-col min-h-screen">

      <div className="bg-gradient-to-r from-[#197dfd] via-[#197dfd] to-slate-900 w-full flex justify-center">
        <SummaryStatWidget />
      </div>

      <div className="w-full flex flex-col items-center">
        <Tips />
        <QueryNotification />
      </div>

      {/* <SpendingTrendsChart/> */}

    </div>
  );
}
