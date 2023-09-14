import Card from "@/components/card/card";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Card name="Awaiting Approval" subheading="pending icon" value={23}/>
      <Card name="Pending Approval" subheading="pending icon" value={23}/>
      <Card name="Total PO" subheading="pending icon" value={23}/>
    </>
  )
}