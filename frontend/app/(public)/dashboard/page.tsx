import SummaryStatWidget from "@/components/donutchart/summaryStatWidget";
import StatusModal from "@/components/formStatusModal/statusModal";
import UpdatePurchase from "@/components/formsModal/updatePurchase";
import UpdateQuotation from "@/components/formsModal/updateQuotation";
import UpdateRequest from "@/components/formsModal/updateRequest";
import TableTabs from "@/components/tableTab/tab";
import Tips from "@/components/tips/tips";

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
  // create a table in the databse to store custom messages for tips
  const customMessage =
    "Check vendor ratings before finalizing orders. Prioritize suppliers with high performance scores for better service quality";
  return (
    <div className="flex flex-col justify-center">
      <div className="bg-[#197dfd] w-full">
				<SummaryStatWidget />
			</div>
      <Tips message={customMessage} />
      {/* <div>
				<TableTabs />
			</div>
			<div className="flex content-center p-8 sm:px-28 gap-2">
				<StatusModal />
				<UpdatePurchase />
				<UpdateQuotation />
				<UpdateRequest />
			</div> */}
    </div>
  );
}
