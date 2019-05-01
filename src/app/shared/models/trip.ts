import {Client} from './client';
import {Post} from './post';
import {Trip_day} from './trip_day';

export class Trip {
  id: number;
  titre: string;
  description: string;
  startDate: Date;
  endDate: Date;
  traveller: Client;
  imageUrl: string;

  nbComments: number;
  nbViews: number;
  nbLikes: number;
  trip_days: Trip_day[];
  daysNumber: number;
  createdDate: Date;
}
