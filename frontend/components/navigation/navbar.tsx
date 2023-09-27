import UserProfileButton from "@/components/navigation/userProfileButton"
import styles from '@/styles/navigation.module.css'
import  NotificationButton  from "./notification";

export default function Navbar() {
  const tabs = ['Dashboard', 'Request', 'Files'];

  return (
    <div className={styles['ww-navbar']}>
      <div className={styles['ww-navbar-layout']}>
        {/* tabs */}
        <div className={styles['ww-navbar-items']}>
          {tabs.map((tabData) => {
            return (
              <div className={styles['ww-navbar-item']} key={tabData}>{tabData}</div>
            )
          })}
        </div>

        {/* user profile and notification */}
        <div className={styles['notification-navbar']}>
          <UserProfileButton />
          <NotificationButton/>
          {/* <Notification /> */}
        </div>
      </div>
    </div>
  )
}