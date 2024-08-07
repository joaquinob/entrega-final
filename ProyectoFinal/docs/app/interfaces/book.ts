import { Ratings } from "./ratings"
import { User } from "./user"

export interface Book {
   _id: string
   title: string
   author: string
   genre: string
   image: string
   publicationDate: number //No utilizo Date para evitar conflictos con BBDD -  en su lugar solamente escribir el año de cuándo se ha publicado
   synopsis: string
   rating: Ratings[]
   user: User 
   showFullSynopsis: false


}
