import Image from "next/image";

export default function DocsPage() {
    return (
        <div className="w-screen min-h-screen flex justify-center">
            <div className="max-w-screen-2xl py-10 flex flex-col gap-10">
                <Image
                    width={1000}
                    height={100}
                    src="/A4-4.webp"
                    alt={"title-slide"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-5.webp"
                    alt={"system-architectire"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-6.webp"
                    alt={"system-implementation"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-7.webp"
                    alt={"dynamic structure"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-9.webp"
                    alt={"title-slide"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-10.webp"
                    alt={"system-architectire"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-11.webp"
                    alt={"system-implementation"}
                />
                <Image
                    width={1000}
                    height={100}
                    src="/A4-12.webp"
                    alt={"dynamic structure"}
                /><Image
                    width={1000}
                    height={100}
                    src="/A4-13.webp"
                    alt={"dynamic structure"}
                />
            </div>
        </div>
    )
}