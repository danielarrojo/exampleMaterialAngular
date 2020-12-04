export interface Characters {
    info:Info,
    results:Character[]
}

export interface Character {
    id:number,
    name:string,
    status:string,
    type:string,
    gender:string,
    origin:any,
    location:any,
    image:string,
    episode:any,
    url:string,
    created:string,
    species:string
}

export interface Info {
    count:number,
    pages:number
}

