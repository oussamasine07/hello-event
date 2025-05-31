import {Category} from './category';

export interface Event {
  id: number,
  name: string,
  description: string,
  place: string,
  eventDate: string,
  numberOfPlaces: number,
  status: string,
  category: Category
}
