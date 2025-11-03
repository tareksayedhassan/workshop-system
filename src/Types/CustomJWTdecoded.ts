import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  userId: string;
  role: "Wrater" | "ReaderAndwrater";
}

export type DecodedToken = {
  name: string;
  email?: string;
  id?: number;
  role?: "ReaderAndwrater" | "Wrater";
  avatar?: string;
  createdAt?: string;
};
