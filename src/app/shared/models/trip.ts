import {Client} from './client';

export class Trip {
  id: number;
  titre: string;
  description: string;
  startDate: Date;
  endDate: Date;
  traveller: Client;
  imageUrl: string;
}
