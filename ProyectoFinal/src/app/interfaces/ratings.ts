import { Book } from "./book"
import { User } from "./user"

export interface Ratings {
    _id: string
    book: Book
    user: User //Cambiar a User cuando este lista la interfaz
    rating: number //Estrellas
    review: string //sacar el ? si el comentario va a ser obligatorio
}
