import {Category} from './category';

export interface EventInterface {
  id: number | null,
  name: string,
  description: string,
  place: string,
  eventDate: string,
  numberOfPlaces: number,
  status: string,
  category_id: number
}
