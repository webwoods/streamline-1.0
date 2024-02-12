In an ERP (Enterprise Resource Planning) system, invoices typically represent financial transactions related to the sale of goods or services. Different types of invoices may exist to capture various aspects of the business processes. Here are some common types of invoices in an ERP system:

1. **Standard Invoice:**
   - Represents a regular bill for goods or services provided.
   - Contains essential information such as due date, amount, and details of the products or services.

2. **Proforma Invoice:**
   - Issued before the actual delivery of goods or services.
   - Provides an estimate of the cost to the buyer.

3. **Recurring Invoice:**
   - Generated at regular intervals for subscription-based services or ongoing contracts.

4. **Credit Memo:**
   - Used to correct errors in previously issued invoices.
   - Represents a reduction in the amount owed by the customer.

5. **Debit Memo:**
   - Issued to request additional payment from the customer.
   - Represents an increase in the amount owed.

6. **Past Due Invoice:**
   - Sent to customers when payment is overdue.
   - Includes details on late fees and penalties.

7. **Commercial Invoice:**
   - Used for international shipments.
   - Provides details required by customs authorities, such as product descriptions, quantities, and values.

8. **Timesheet Invoice:**
   - Generated based on recorded hours worked by employees or contractors.

9. **Progress Invoice:**
   - Used in projects where payment is made in stages as milestones are achieved.

10. **Intercompany Invoice:**
    - Used in organizations with multiple subsidiaries or divisions.
    - Represents transactions between different entities within the same company.

These are just some examples, and the specific types of invoices can vary based on the nature of the business and industry. In your NestJS GraphQL app, you may need to consider which types of invoices are relevant to your ERP system and model them accordingly.


Certainly! Here's a breakdown of attributes and their potential data types for each of the mentioned invoice types in an ERP system:

1. **Standard Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `shipment: Shipment`

2. **Proforma Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean` (typically set to `false` as it's an estimate)
   - `shipment: Shipment`

3. **Recurring Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `recurrencePattern: string` (e.g., monthly, quarterly)
   - `shipment: Shipment`

4. **Credit Memo:**
   - `id: string`
   - `originalInvoiceId: string`
   - `amount: number`
   - `isPaid: boolean`
   - `reason: string`

5. **Debit Memo:**
   - `id: string`
   - `originalInvoiceId: string`
   - `amount: number`
   - `isPaid: boolean`
   - `reason: string`

6. **Past Due Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `lateFee: number`

7. **Commercial Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `shipment: Shipment`
   - `customsInformation: CustomsInformation`

8. **Timesheet Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `timesheetEntries: TimesheetEntry[]`

9. **Progress Invoice:**
   - `id: string`
   - `dueDate: Date`
   - `amount: number`
   - `isPaid: boolean`
   - `milestones: Milestone[]`

10. **Intercompany Invoice:**
    - `id: string`
    - `dueDate: Date`
    - `amount: number`
    - `isPaid: boolean`
    - `intercompanyTransactionDetails: IntercompanyTransactionDetails`

Note: The attribute names and data types are examples, and you should adapt them based on the specific requirements of your ERP system and how you've structured your data models (e.g., `Shipment`, `CustomsInformation`, `TimesheetEntry`, `Milestone`, `IntercompanyTransactionDetails`). Adjust the attributes and types to fit the details needed for your application.