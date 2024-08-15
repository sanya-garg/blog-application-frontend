export class Blog{
    constructor(
        public title :string,
        public body :string,
        public coverImageURL? : string,
        public _id? : string,
        public createdBy? : string,
        public createdAt? : string,
        public updatedAt? : string
    ){}
}