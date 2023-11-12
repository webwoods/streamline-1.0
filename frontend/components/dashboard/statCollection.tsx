import Stat from './stat'

export default function StatCollection() {

  const mockdata = [
    { title: 'Awaiting Approval', icon: 'awaiting-approval', value: 3 },
    { title: 'Pending Requisitions', icon: 'pending-request', value: 12 },
    { title: 'Purchase Orders', icon: 'purchase-order', value: 114 },
    { title: 'Vendor Responses', icon: 'vendor-responses', value: 20 }
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
      {mockdata?.map((data, index) => {
        return (
          <Stat props={{ ...data }} key={data.title} />
        )
      })}
    </div>
  )
}