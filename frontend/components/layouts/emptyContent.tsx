interface Props {
    msg: string
}

export default function EmptyContent({msg}: Props) {
    return (
        <div className="mt-5 bg-slate-100 rounded-md flex flex-col p-5">
            <span className="font-semibold">Oops! There's nothing to show here.</span>
            <span className="text-xs font-light">{msg}</span>
        </div>
    );
}