import { MultistepComponent } from "@/components/progress/stepProgress";
import { faCertificate, faFileLines, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import CreateNewRequestForm from "./createNewRequestForm";

export default function CreateRequest() {
  return (
    <div className="w-full flex flex-col justify-center max-w-screen-lg px-6 ">

      <div className="w-full">
        <button>back</button>
      </div>

      <div className="w-full flex flex-col items-center">
        <CreateNewRequestForm />
      </div>

    </div>
  );
}