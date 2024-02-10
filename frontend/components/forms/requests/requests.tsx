'use client'

import { useCallback, useEffect, useMemo, useState } from "react";
import Details from "../../action/details";
import RequestsToolBar from "../../action/requestsToolbar";
import EmptyContent from "../../layouts/emptyContent";
import { SecondaryPanel } from "../../layouts/secondaryPanel";
import { ThreeColumnLayout } from "../../layouts/threeColumnLayout";
import TableTabs from "../../tableTab/tab";
import UpdateRequest from "./updateRequest";
import DeleteRequest from "./deleteRequest";

export default function Requests() {
    const [dataFromMiddle, setDataFromMiddle] = useState<any>(null);
    const [action, setAction] = useState<any>(null);

    const getDataFromMiddle = useCallback((data: any) => {
        // console.log(data);
        setDataFromMiddle(data?.data);
        setAction(data?.action);
    }, []);

    return (
        <>
            <>
                <TableTabs getActiveTabActiveRecord={getDataFromMiddle} />
                {action === 'edit' && <UpdateRequest data={dataFromMiddle} />}
                {action === 'delete' && <DeleteRequest data={dataFromMiddle} />}
            </>
            <SecondaryPanel>
                {(dataFromMiddle) ?
                    <Details header="Details" cta="Edit" data={dataFromMiddle} /> :
                    <EmptyContent msg={"Click the 'eye' icon for a request from the table to view the data."} />
                }
            </SecondaryPanel>
        </>
    );
}