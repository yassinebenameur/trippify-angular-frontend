import {Client} from './client';

export class Comment {
  id: number;
  content: string;
  commentor: Client;
  createdDate: Date;
}
