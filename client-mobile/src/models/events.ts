import { Admins } from "./admins";
import { Categories } from "./categories";

export interface Events {
  id: number | null;
  name: string | null;
  startDate: string;
  endDate: string;
  active: boolean | null;
  description: string | null;
  amount: number | null;
  address: string | null;
  lat: string | null;
  long: string | null;
  pics: string | undefined;
  CategoryId: number | null;
  AdminId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  Admin: Admins | null;
  Category: Categories | null;
}
