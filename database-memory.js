import { randomUUID } from "crypto"

export class DatabaseMemory{
#roupas = new Map()

list(search){
    return Array.from(this.#roupas.entries()).map((roupasArray) => {
        const id = roupasArray[0]
        const data = roupasArray[1]

        return{
            id,
            ...data
        }
       
    })
    .filter(roupa => {
        if(search){
            return roupa.titulo.includes(search)
        }
        return true
    })
}
create(roupa){
    const roupaId = randomUUID()
    this.#roupas.set(roupaId, roupa)
}
update(id, roupa){
    this.#roupas.set(id, roupa)
}
delete(id, roupa){
    this.#roupas.delete(id, roupa)
}
}