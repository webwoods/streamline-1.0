'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import Details from "../action/details";
import RequestsToolBar from "../action/requestsToolbar";
import EmptyContent from "../layouts/emptyContent";
import { SecondaryPanel } from "../layouts/secondaryPanel";
import { ThreeColumnLayout } from "../layouts/threeColumnLayout";
import TableTabs from "../tableTab/tab";

export default function Requests() {
    const [dataFromMiddle, setDataFromMiddle] = useState<any>(null);
    
    const getDataFromMiddle = useCallback((data: any) => {
        setDataFromMiddle(data);
    }, []);

    return (
        <ThreeColumnLayout
            startContent={<RequestsToolBar />}
            middleContent={<TableTabs getActiveTabActiveRecord={getDataFromMiddle} />}
            endContent={
                <SecondaryPanel>
                    <Details header="Details" cta="Edit" data={dataFromMiddle} />
                    {!dataFromMiddle && <EmptyContent msg={"Click the 'eye' icon for a request from the table to view the data."} />}
                </SecondaryPanel>
            }
        />
    );
}