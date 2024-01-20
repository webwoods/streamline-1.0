interface Props {
    data?: any
}

function convertObjectToString(obj: any) {
    // Convert values to strings
    const stringValues: { [key: string]: string } = Object.entries(obj).reduce(
        (acc: any, [key, value]) => {
            acc[key] = value ? String(value) : '';
            return acc;
        },
        {}
    );

    return stringValues;
}

function extractDateOnly(date: any) {
    return new Date(date).toLocaleDateString();
}

function DateMapper({ date, title, pStyle, spanLeftStyle }: { title: string, date: any, pStyle?: string, spanLeftStyle?: string }) {
    return (
        <p className={pStyle}>
            <span className={spanLeftStyle}>{title}:</span>
            <span className="text-right text-xs">{extractDateOnly(date)}</span>
        </p>
    )
}

function DescriptionMapper({ content, style }: { content: string, style?: string }) {
    // Split the content into paragraphs using '\n\n' as a separator
    const paragraphs = content.split('\n\n');

    return (
        <>
            {paragraphs.map((paragraph, index) => (
                <p className={style} key={index}>{paragraph}</p>
            ))}
        </>
    );
}

function RequestDataMapper({ data = {} }: Props) {
    // Define the keys to exclude
    const excludedKeys = ['__typename', 'id', 'requestedUserId', 'requestedBy'];

    // Filter out the excluded keys
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([key]) => !excludedKeys.includes(key))
    );

    const stringData = convertObjectToString(filteredData);

    // console.log(filteredData);

    const pStyle = "flex justify-between";
    const spanLeftStyle = "text-left font-semibold text-xs";
    const spanRightStyle = "text-right text-xs";
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'AWAITING_APPROVAL':
                return 'text-gray-500';
            case 'PROCESSING':
                return 'text-blue-500';
            case 'PENDING':
                return 'text-yellow-500';
            case 'APPROVED':
                return 'text-green-500';
            case 'REJECTED':
                return 'text-red-500';
            default:
                return 'text-black';
        }
    };

    return (
        <>
            {/* dates */}
            <DateMapper title="Date created" date={stringData['createdAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />
            <DateMapper title="Date updated" date={stringData['updatedAt']} pStyle={pStyle} spanLeftStyle={spanLeftStyle} />
            
            {/* status */}
            <p className={pStyle}>
                <span className={spanLeftStyle}>Status:</span>
                <span className={getStatusColor(stringData['status'])}>{stringData['status']}</span>
            </p>

            <hr className="my-2"></hr>

            {/* subject and description */}
            <p className={pStyle}>
                <span className={spanLeftStyle}>Subject:</span>
                <span className={spanRightStyle}>{stringData['subject']}</span>
            </p>
            <div className="flex flex-col gap-2">
                <span className={spanLeftStyle}>Description:</span>
                <DescriptionMapper content={stringData['description']} style="text-xs text-justify py-1" />
            </div>

            <hr className="my-2"></hr>

        </>
    );
}

export default function DataMapper({ data = {} }: Props) {
    return (
        <div className="flex flex-col gap-1">
            {
                data &&
                // Object.entries(data).map(([key, value]) => (
                //     <p key={key} className="flex justify-between">
                //         <span className="text-left font-medium text-xs">{key}:</span>
                //         <span className="text-right text-xs">{value ? JSON.stringify(value) : ''}</span>
                //     </p>
                // )) &&
                data.requestType === 'REQUEST' && <RequestDataMapper data={data} />
            }
        </div>
    );
}