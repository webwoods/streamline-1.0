import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { NotificationIcon } from "./notificationIcon";

const CHARACTER_LIMIT = 100; // Define the character limit here

export default function ModalNotification() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

  // Create a list of notifications
  const notifications = [
    "Notification 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Notification 2: Nullam pulvinar risus non risus hendrerit venenatis.",
    "Notification 3: Magna exercitation reprehenderit magna aute tempor cupidatat consequat Magna exercitation reprehenderit magna aute tempor cupidatat consequat...",
    // Add more notifications as needed
  ];

  // Create a state to track expanded notifications
  const [expandedNotifications, setExpandedNotifications] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    if (expandedNotifications.includes(index)) {
      setExpandedNotifications(expandedNotifications.filter((item) => item !== index));
    } else {
      setExpandedNotifications([...expandedNotifications, index]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Tooltip color={"danger"} content={"20"} className="capitalize">
        <Button
          isIconOnly
          onPress={onOpen}
          variant="flat"
          color={"default"}
          className="capitalize bg-transparent rounded-full"
        >
          <NotificationIcon size={40} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Notifications</ModalHeader>
              <ModalBody>
                {notifications.map((notification, index) => (
                  <div key={index}>
                    <div className={expandedNotifications.includes(index) ? "expanded" : "collapsed"}>
                      <p>
                        {notification.length > CHARACTER_LIMIT && !expandedNotifications.includes(index)
                          ? `${notification.substring(0, 50)}...`
                          : notification}
                      </p>
                    </div>
                    {notification.length > CHARACTER_LIMIT && (
                      <Button
                        color="default"
                        variant="light"
                        onPress={() => toggleExpand(index)}
                      >
                        {expandedNotifications.includes(index) ? "See Less" : "See More"}
                      </Button>
                    )}
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <style jsx>{`
        .expanded {
          max-height: none;
          overflow: auto;
        }
        .collapsed {
          max-height: 50px;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
