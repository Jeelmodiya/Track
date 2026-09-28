import { MemberRole } from "@/config";
import { Models } from "node-appwrite";

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: MemberRole;
};
