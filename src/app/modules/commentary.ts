export class Commentary{
    constructor(
        public _id: string,
        public text:string,
        public file: string,
        public created_at: string,
        public user: string,
        public publication: string
    ){}
}