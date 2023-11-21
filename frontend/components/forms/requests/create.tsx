import { MultistepComponent } from "@/components/progress/stepProgress";
import { faCertificate, faFileLines, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateRequest() {
  return (
    <div className="w-full flex justify-center py-10 max-w-screen-lg px-6 ">
      {/* <MultistepComponent
        steps={[
          { label: 'Create', icon: faFileLines },
          { label: 'Add items', icon: faSquarePlus },
          { label: 'Verify', icon: faCertificate },
        ]}
      >
        {[
          <div key='step1'>Step 1</div>,
          <div key='step2'>Step 2</div>,
          <div key='step3'>Step 3</div>,
        ]}
      </MultistepComponent> */}
    </div>
  );
}