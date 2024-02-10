import { faPhone, faEnvelope, faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardBody, Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import ToolTipButton from "../common/tooltipButton";

interface VendorCardProps {
    size?: 'long' | 'mid' | 'short'
    data?: any
}

export default function VendorCard({ size, data }: VendorCardProps) {

    const router = useRouter();

    return (
        <Card
            isHoverable
            isPressable
            className={`${size === 'long' ? 'w-full' :
                size === 'mid' ? 'max-w-[400px]' :
                    size === 'short' ? 'max-w-[250px]' : 'max-w-[250px]'
                } rounded-md border-1 border-slate-300 shadow-none hover:bg-slate-100`}
        >
            <CardBody>
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">{data?.name}</p>
                            <p className="text-small text-default-500">{data?.email}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <ToolTipButton
                            content="view contact number"
                            onClick={() => {
                                if (data?.website) {
                                    router.push(data.website)
                                }
                            }}
                            icon={faPhone}
                        />
                        <ToolTipButton
                            content="send email"
                            onClick={() => {
                                if (data?.website) {
                                    router.push(data.website)
                                }
                            }}
                            icon={faEnvelope}
                        />
                        <ToolTipButton
                            content="visit website"
                            onClick={() => {
                                if (data?.website) {
                                    router.push(data.website)
                                }
                            }}
                            icon={faGlobe}
                        />
                    </div>
                </div>
                <Divider className="my-2" />
                <div className="flex gap-3 items-center justify-end">
                    <div className="text-xs flex flex-col">
                        <div className="flex gap-1 font-medium justify-end">
                            <span>{data?.address?.addressLine1},</span>
                            <span>{data?.address?.addressLine2}</span>
                        </div>
                        <div className="flex gap-1 justify-end">
                            <span>{data?.address?.city},</span>
                            <span>{data?.address?.state},</span>
                            <span>{data?.address?.country}</span>
                        </div>
                    </div>
                    <FontAwesomeIcon className="text-green-500" icon={faLocationDot} />
                </div>
            </CardBody>
        </Card>
    );
}