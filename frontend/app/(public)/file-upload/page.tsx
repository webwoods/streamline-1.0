import UploadButton from '@/components/fileUpload/DropZoneComponent'
import React from 'react'

function page() {
  return (
    <div className='w-screen h-screen flex justify-center'>
      <div className="max-w-screen-2xl w-full p-10">
        <UploadButton className={''} />
      </div>
    </div>
  )
}

export default page