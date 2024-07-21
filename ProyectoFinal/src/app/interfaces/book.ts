import { Author } from "./author"
import { Genre } from "./genre"

export interface Book {
   _id: string
   title: string
   author: Author
   genre: Genre
   image: string
   rating: number // será un valor probablemente decimal
   publicationYear: number //No utilizo Date para evitar conflictos con BBDD -  en su lugar solamente escribir el año de cuándo se ha publicado

}
