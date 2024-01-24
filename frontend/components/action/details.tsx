'use client'

import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DataMapper from "./dataMapper";

interface Props {
    header?: string
    cta?: string
    data?: any
}

export default function Details({ header, cta, data }: Props) {
    return (
        <>
            <div className="flex gap-2 items-center">
                <span className="font-semibold">{header}</span>
                <div className="bg-green-400 w-3 rounded-full aspect-square"></div>
            </div>
            <div className="flex gap-2 items-center text-slate-400 text-xs mb-5">
                <span>{cta}</span>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            {data && <DataMapper data={data} />}
        </>
    );
}