import { Content } from "./content.model";

export class Shop {
    title: string;
    date: Date;
    data: Content[];
    constructor(title: string) {
        this.title = title
        this.date = new Date();
        this.data = []
    }
}