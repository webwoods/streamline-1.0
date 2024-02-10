'use client'

import { MultistepComponent } from "@/components/progress/stepProgress";
import { faCertificate, faFileLines, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import CreateNewRequestForm from "./createNewRequestForm";
import { useCallback, useState } from "react";
import { Button } from "@nextui-org/react";

export default function CreateRequest() {

  return (
    <div className="w-full flex flex-col justify-center max-w-screen-lg px-6">
      
      <div className="w-full flex flex-col items-center">
        <CreateNewRequestForm />
      </div>

    </div>
  );
}