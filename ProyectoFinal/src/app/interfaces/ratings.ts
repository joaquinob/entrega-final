export interface Ratings {
    _id: string
    user: string //Cambiar a User cuando este lista la interfaz
    score: number //Estrellas
    comments?: string //sacar el ? si el comentario va a ser obligatorio
}
