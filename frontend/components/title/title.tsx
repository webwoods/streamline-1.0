export default function Title({ title }: { title: string }) {
    return (
        <div className="w-full mb-5">
            <span className="text-3xl font-semibold">{title}</span>
        </div>
    )
}