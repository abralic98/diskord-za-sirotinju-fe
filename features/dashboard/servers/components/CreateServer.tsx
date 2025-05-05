import {
  CustomDialog,
  CustomDialogProps,
} from "@/components/custom/dialog/CustomDialog";
import { CreateServerForm } from "./CreateServerForm";

export const CreateServer = () => {
  const trigger = (
    <div className="bg-sidebar-accent hover:bg-sidebar-hover transition-colors duration-200 cursor-pointer font-bold rounded-full w-14 h-14 flex items-center justify-center">
      +
    </div>
  );

  const header: CustomDialogProps["header"] = {
    title: "Create new Server",
  };

  return (
    <CustomDialog
      header={header}
      content={<CreateServerForm />}
      trigger={trigger}
    />
  );
};
