import UserProfileButton from "@/components/navigation/userProfileButton"
import styles from '@/styles/navigation.module.css'

export default function Navbar() {
  const tabs = ['Dashboard', 'Request', 'Files'];
  
  return (
    <div className={styles['ww-navbar']}>
      {/* tabs */}
      <div className={styles['ww-navbar-items']}>
        {tabs.map((tabData) => {
          return(
            <div className={styles['ww-navbar-item']} key={tabData}>{tabData}</div>
          )
        })}
      </div>

      {/* user profile and notification */}
      <div>
        <UserProfileButton />
        {/* <Notification /> */}
      </div>
    </div>
  )
}