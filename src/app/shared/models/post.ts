import {Client} from './client';

export class Post {
  id: number;
  titre: string;
  description: string;


  day: number;
  imageUrls: string[];
  postMaker: Client;
  trip_id: string;
  comments: Comment[];

}
