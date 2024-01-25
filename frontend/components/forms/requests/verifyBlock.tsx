import { Button, Divider } from "@nextui-org/react";

interface Props {
    onVerify: () => void
    onBack: () => void
    data?: any
}

export default function VerifyBlock({ onVerify, onBack, data }: Props) {

    const handleSubmit = () => {

    }

    return (
        <div className='w-96 max-w-3xl py-10'>
            <div className="flex items-center justify-center flex-col">
                <h1 className="leading-5 font-semibold text-lg">Verify</h1>
                <h2 className="text-slate-400 text-sm">GR112</h2>
            </div>

            <div className='flex flex-col items-center pt-10 gap-5 font-normal'>

                <div className='flex flex-col items-center w-full gap-2'>
                    <div className="w-full flex text-xs justify-between">
                        <div>Requested by</div>
                        <div>{data?.requestedUserName}</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Created date</div>
                        <div>{data?.createdAt}</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Expected response by</div>
                        <div>{data?.expectedAt}</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Forward to</div>
                        <div>{data?.forwadTo}</div>
                    </div>
                </div>

                <div className="w-full flex text-xs justify-between">
                    <div>Request type</div>
                    <div>{data?.requestType}</div>
                </div>

                <div className="w-full flex text-xs justify-between font-semibold">Requested items</div>
                <Divider className="mb-4" />
                <div className='flex flex-col items-center w-full gap-1'>
                    {data?.requestItems?.map((item: any, index: number) => {
                        return (
                            <div
                                key={item?.id}
                                className="w-full flex text-xs justify-between">
                                <div>{item?.sku}</div>
                                <div>{item?.name}</div>
                                <div>{`${item?.quantity} ${item?.unit}`}</div>
                                <div>{item?.price} LKR</div>
                            </div>
                        )
                    })}
                </div>

                <Divider className="my-4" />

                <div className='flex flex-col items-center w-full gap-2'>
                    <div className="w-full flex text-xs justify-between">
                        <div>Subtotal</div>
                        <div>58,000 LKR</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Total Tax</div>
                        <div>1,200 LKR</div>
                    </div>

                    <div className="w-full flex text-xs justify-between font-bold">
                        <div>Grand Total</div>
                        <div>59,200 LKR</div>
                    </div>
                </div>

                <div className='w-full flex gap-3 pt-5'>
                    <Button
                        className='w-full rounded-[0.25rem] bg-slate-200 hover:bg-slate-300'
                        onClick={onBack}>Back</Button>
                    <Button
                        className='w-full rounded-[0.25rem] text-slate-50 bg-slate-800 hover:text-accent-yellow hover:bg-slate-700'
                        onClick={handleSubmit}>Submit</Button>
                </div>

            </div>
        </div>
    );
};