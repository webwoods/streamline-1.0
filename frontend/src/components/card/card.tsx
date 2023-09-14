interface Props {
  name: string;
  subheading: string;
  value: number;
}

export default function Card({ name, subheading, value }: Props) {
  return(
    <div className="card">
      {name}
      <h2>{subheading}</h2>
      <h1>{value}</h1>
    </div>
  );
}