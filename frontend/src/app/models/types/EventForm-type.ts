import {EventInterface} from '../interfaces/event';

export type EventForm = {
  pageTitle: string,
  type: string,
  event: {
    id: number | null,
    name: string,
    description: string,
    place: string,
    eventDate: string,
    numberOfPlaces: number,
    status: string,
    category_id: string
  } | EventInterface
}
