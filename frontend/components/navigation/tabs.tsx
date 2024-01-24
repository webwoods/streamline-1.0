import { faHome, faChartLine, faUsers, faStore, faClipboard, faClipboardCheck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const tabs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    label: "Insights",
    href: "/insights",
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  {
    label: "Employees",
    href: "/employees",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  {
    label: "Vendors",
    href: "/vendors",
    icon: <FontAwesomeIcon icon={faStore} />,
  },
  {
    label: "Activity",
    href: "/activity",
    icon: <FontAwesomeIcon icon={faClipboard} />,
  },
  {
    label: "Requests",
    href: "/requests",
    icon: <FontAwesomeIcon icon={faClipboardCheck} />,
  },
  {
    label: "Bills",
    href: "/bills",
    icon: <FontAwesomeIcon icon={faDollarSign} />,
  },
];