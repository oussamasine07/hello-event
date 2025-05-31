import {Category} from '../interfaces/category';

export type CategoryFormType = {
  type: string,
  category: {
    id: number | null,
    name: string
  } | Category
}
