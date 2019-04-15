import {Client} from './client';

export class Trip {
  id: number;
  titre: string;
  startDate: Date;
  endDate: Date;
  traveller: Client;
}
