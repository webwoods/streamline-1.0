'use client'

import UserProfileButton from "@/components/navigation/userProfileButton"
import styles from '@/styles/navigation.module.css'
import { Notification } from "./notification";
import { useState } from "react";
import { ThreeLineHorizontal } from "akar-icons";

export default function Navbar() {
  const tabs = ['Dashboard', 'Request', 'Files'];
  const [isMobile, setIsMobile] = useState(false);

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

        {
          <div>
            <ThreeLineHorizontal className={styles['menu-icon']} size={36} color={'white'} onClick={() => {setIsMobile(!isMobile)}} />
            {isMobile && (
            <div className={styles['ww-navbar-items-mobile']}>
              {tabs.map((tabData) => {
                return (
                  <div className={styles['ww-navbar-item-mobile']} key={tabData}>{tabData}</div>
                )
              })}
            </div>
            )}
          </div>
        }

        {/* user profile and notification */}
        <div>
          <UserProfileButton />
          {/* <Notification /> */}
        </div>
      </div>
    </div>
  )
}