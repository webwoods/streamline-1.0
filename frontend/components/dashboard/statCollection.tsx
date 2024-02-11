import Stat from './stat'

export default function StatCollection() {

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>

      <Stat props={{
        icon: 'awaiting-approval',
        value: 3,
        title: 'Awaiting Approval',
        variables: {
          page: 1,
          pageSize: 10,
          status: 'AWAITING_APPROVAL'
        }
      }} key="awaiting approval" />

      <Stat props={{
        icon: 'pending-request',
        value: 12,
        title: 'Pending Requisitions',
        variables: {
          page: 1,
          pageSize: 10,
          status: 'AWAITING_APPROVAL',
          requestType: 'REQUEST'
        }
      }} key="pending requisitions" />

      <Stat props={{
        icon: 'purchase-order',
        value: 114,
        title: 'Purchase Orders',
        variables: {
          page: 1,
          pageSize: 10,
          requestType: 'PURCHASE_ORDER'
        }
      }} key="purchase orders" />

      <Stat props={{
        icon: 'vendor-responses',
        value: 0,
        title: 'Vendor Responses',
        variables: {
          page: 1,
          pageSize: 10,
          requestType: 'QUOTATION'
        }
      }} key="vendor responses" />

    </div>
  )
}