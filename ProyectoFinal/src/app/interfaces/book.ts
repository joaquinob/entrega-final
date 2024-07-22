import { Author } from "./author"
import { Genre } from "./genre"
import { Ratings } from "./ratings"

export interface Book {
   _id: string
   title: string
   author: Author
   genre: Genre[]
   image: string
   publicationYear: number //No utilizo Date para evitar conflictos con BBDD -  en su lugar solamente escribir el año de cuándo se ha publicado
   synopsis: string
   averageStars: number // será un valor probablemente decimal
   rating: Ratings[]


}
