export class Publication{
    constructor(
        public _id: string,
        public text:string,
        public file: string,
        public number_likes: string,
        public number_publications: string,        
        public created_at: string,
        public user: string
    ){}
}