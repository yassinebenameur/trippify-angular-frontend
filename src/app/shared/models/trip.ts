import {Client} from './client';
import {Post} from './post';

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
  posts: Post[];
}
