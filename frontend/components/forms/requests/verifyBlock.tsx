import { Button, Divider } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";

interface Props {
    onVerify: () => void
    onBack: () => void
    data?: any
}

export default function VerifyBlock({ onVerify, onBack, data }: Props) {

    const [requestData, setRequestData] = useState<any>(null);

    const handleSubmit = () => {

    }

    const calculateTotals = useMemo(() => {
        if (data && data.requestItems && data.requestItems.length > 0) {
            const { subtotal, tax, total } = data.requestItems.reduce(
                (acc: { subtotal: number; tax: number; total: number }, item: any) => {
                    acc.subtotal += item.price * item.qty;
                    return acc;
                },
                { subtotal: 0, tax: 0, total: 0 }
            );

            const calculatedTotalTax = subtotal * 0.02; // Adjust as needed

            return {
                subtotal,
                tax: calculatedTotalTax,
                total: subtotal + calculatedTotalTax,
            };
        }

        return { subtotal: 0, tax: 0, total: 0 };
    }, [data?.requestItems]);

    useEffect(() => {
        if (data) {
            setRequestData({ ...data, calculateTotals });
        }
    }, [])

    return (
        <div className='w-96 max-w-3xl py-10'>
            <div className="flex items-center justify-center flex-col">
                <h1 className="leading-5 font-semibold text-lg">Verify</h1>
                <h2 className="text-slate-400 text-sm">GR112</h2>
            </div>

            {data &&
                <div className='flex flex-col items-center pt-10 gap-5 font-normal'>

                    <div className='flex flex-col items-center w-full gap-2'>
                        <div className="w-full flex text-xs justify-between">
                            <div>Requested by</div>
                            <div>{data?.requestedUser?.name}</div>
                        </div>

                        <div className="w-full flex text-xs justify-between">
                            <div>Created date</div>
                            <div>{data?.createdAt?.toLocaleDateString()}</div>
                        </div>

                        <div className="w-full flex text-xs justify-between">
                            <div>Expected response by</div>
                            <div>{data?.expectedAt?.toLocaleDateString()}</div>
                        </div>

                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Request type</div>
                        <div>{data?.requestType}</div>
                    </div>

                    <div className="w-full flex text-xs justify-between font-semibold">Requested items</div>
                    <div className="w-full grid grid-cols-5 text-xs justify-between">
                        <div>sku</div>
                        <div>name</div>
                        <div className="text-right">type</div>
                        <div className="text-right">{`unit\nprice`}</div>
                        <div className="text-right">qty</div>
                    </div>
                    <Divider className="mb-4" />
                    <div className='flex flex-col items-center w-full gap-1'>
                        {data?.requestItems?.map((item: any, index: number) => {
                            return (
                                <div
                                    key={item?.id}
                                    className="w-full grid grid-cols-5 text-xs justify-between">
                                    <div>{item?.sku}</div>
                                    <div>{item?.name}</div>
                                    <div className="text-right">{item?.type}</div>
                                    <div className="text-right">{item?.price} LKR</div>
                                    <div className="text-right">{item?.qty}</div>
                                </div>
                            )
                        })}
                    </div>

                    <Divider className="my-4" />

                    <div className='flex flex-col items-center w-full gap-2'>
                        <div className="w-full flex text-xs justify-between">
                            <div>Subtotal</div>
                            <div>{requestData?.calculateTotals?.subtotal} LKR</div>
                        </div>

                        <div className="w-full flex text-xs justify-between">
                            <div>Total Tax</div>
                            <div>{requestData?.calculateTotals?.tax} LKR</div>
                        </div>

                        <div className="w-full flex text-xs justify-between font-bold">
                            <div>Grand Total</div>
                            <div>{requestData?.calculateTotals?.total} LKR</div>
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
            }
        </div>
    );
};