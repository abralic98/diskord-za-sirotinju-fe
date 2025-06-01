import { CustomDialog } from "@/components/custom/dialog/CustomDialog";
import { H4, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { User } from "@/generated/graphql";
import { ReactNode } from "react";
import { EditUsernameForm } from "./edit/EditUsernameForm";
import { EditEmailForm } from "./edit/EditEmailForm";
import { EditPhoneNumberForm } from "./edit/EditPhoneNumberForm";
import { EditDescriptionForm } from "./edit/EditDescriptionForm";

interface EditFormProps {
  label: string;
  value: string;
  dialogForm: ReactNode;
}

export const EditAccountBasicInfo = ({ user }: { user: User | null }) => {
  if (!user) return null;
  return (
    <div className="flex flex-col gap-md">
      <EditForm
        label={"Username"}
        value={String(user.username)}
        dialogForm={<EditUsernameForm />}
      />
      <EditForm
        label={"About you"}
        value={user?.description ?? "Description empty"}
        dialogForm={<EditDescriptionForm />}
      />
      <EditForm
        label={"Email"}
        value={String(user.email)}
        dialogForm={<EditEmailForm />}
      />
      <EditForm
        label={"Phone number"}
        value={user?.phoneNumber ?? "Phone not added"}
        dialogForm={<EditPhoneNumberForm />}
      />
    </div>
  );
};

const EditForm = ({ label, value, dialogForm }: EditFormProps) => {
  const title = `Edit your ${label}`;
  const description = `Enter a new ${label}`;
  const header = {
    title,
    description,
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-sm">
        <H4>{label}</H4>
        <Text>{value}</Text>
      </div>

      <CustomDialog
        header={header}
        trigger={<Button>Edit</Button>}
        content={dialogForm}
      />
    </div>
  );
};
