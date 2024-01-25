import { Button, Divider } from "@nextui-org/react";

interface Props {
    onVerify: () => void
    onBack: () => void
    onDataSubmit?: (data: any) => void
}

export default function VerifyBlock({ onVerify, onBack, onDataSubmit }: Props) {
    
    const handleSubmit = () => {
        const verifiedData = '';
        onDataSubmit && onDataSubmit({verifiedData: verifiedData});
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
                        <div>Derik Wijesinghe</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Created date</div>
                        <div>2024-01-12</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Expected response by</div>
                        <div>2024-02-03</div>
                    </div>

                    <div className="w-full flex text-xs justify-between">
                        <div>Forward to</div>
                        <div>Gihan Dias</div>
                    </div>
                </div>

                <div className="w-full flex text-xs justify-between">
                    <div>Request type</div>
                    <div>--</div>
                </div>

                <div className="w-full flex text-xs justify-between font-semibold">Requested items</div>
                <Divider className="mb-4" />
                <div className='flex flex-col items-center w-full gap-1'>
                    <div className="w-full flex text-xs justify-between">
                        <div>oxygen-2l</div>
                        <div>Oxygen</div>
                        <div>4L</div>
                        <div>38,000 LKR</div>
                    </div>
                    <div className="w-full flex text-xs justify-between">
                        <div>oxygen-2l</div>
                        <div>Oxygen</div>
                        <div>4L</div>
                        <div>38,000 LKR</div>
                    </div>
                    <div className="w-full flex text-xs justify-between">
                        <div>oxygen-2l</div>
                        <div>Oxygen</div>
                        <div>4L</div>
                        <div>38,000 LKR</div>
                    </div>
                    <div className="w-full flex text-xs justify-between">
                        <div>oxygen-2l</div>
                        <div>Oxygen</div>
                        <div>4L</div>
                        <div>38,000 LKR</div>
                    </div>
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