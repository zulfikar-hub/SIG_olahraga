export interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  status: "ACTIVE" | "MAINTENANCE" | "INACTIVE";
}