import {Category} from './category';

export interface Reservation {
  id: number,
  placeNumber: number,
  dateOfReservation: Date,
  event: {
    id: number,
    name: string,
    description: string,
    place: string,
    eventDate: Date,
    numberOfPlaces: number,
    status: string,
    category: Category
  }
}
