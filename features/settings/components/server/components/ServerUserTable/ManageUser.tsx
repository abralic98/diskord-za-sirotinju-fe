import { DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/generated/graphql";
import { useIds } from "@/hooks/useIds";
import React, { useRef } from "react";
import { KickUser } from "./KickUser";
import { BanUser } from "./BanUser";

export const ManageUser = ({ user }: { user?: User | null }) => {
  const { serverSettingsId } = useIds();
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <Tabs defaultValue="kick">
        <TabsList className="w-full">
          <TabsTrigger value="kick">Kick</TabsTrigger>
          <TabsTrigger value="ban">Ban</TabsTrigger>
        </TabsList>
        <TabsContent value="kick">
          <KickUser closeRef={closeRef} user={user} />
        </TabsContent>
        <TabsContent value="ban">
          <BanUser closeRef={closeRef} user={user} />
        </TabsContent>
      </Tabs>
      <DialogClose asChild>
        <button ref={closeRef} className="hidden" />
      </DialogClose>
    </div>
  );
};
