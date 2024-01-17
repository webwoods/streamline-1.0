interface Props {
    data?: any
}


export default function DataMapper({ data = {} }: Props) {
    return (
        <div className="flex flex-col gap-1">
            {data &&
                Object.entries(data).map(([key, value]) => (
                    <p key={key} className="flex justify-between">
                        <span className="text-left font-medium text-xs">{key}:</span>
                        <span className="text-right text-xs">{value ? JSON.stringify(value) : ''}</span>
                    </p>
                ))}
        </div>
    );
}