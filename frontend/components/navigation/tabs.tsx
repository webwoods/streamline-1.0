import { faHome, faChartLine, faUsers, faStore, faClipboard, faClipboardCheck, faDollarSign, faWarehouse, faBoxes, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const tabs = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  // {
  //   label: "Insights",
  //   href: "/insights",
  //   icon: <FontAwesomeIcon icon={faChartLine} />,
  // },
  // {
  //   label: "Employees",
  //   href: "/employees",
  //   icon: <FontAwesomeIcon icon={faUsers} />,
  // },
  {
    label: "Vendors",
    href: "/vendors",
    icon: <FontAwesomeIcon icon={faStore} />,
  },
  {
    label: "Store",
    href: "/store",
    icon: <FontAwesomeIcon icon={faBoxes} />,
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
    label: "Files",
    href: "/file-upload",
    icon: <FontAwesomeIcon icon={faFileArrowUp} />,
  },
  // {
  //   label: "Bills",
  //   href: "/bills",
  //   icon: <FontAwesomeIcon icon={faDollarSign} />,
  // },
];