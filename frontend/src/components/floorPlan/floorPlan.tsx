'use client'

import styles from '@/app/page.module.css'
import { Image } from '@mantine/core'

export default function FloorPlan() {

  return (
    <div>
      This is the floor plan section
      <div className={styles.floorPlanImageContainer}>
        <Image src='dummy_image_1.webp' />
      </div>
    </div>
  )
}
