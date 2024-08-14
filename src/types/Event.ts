export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}
