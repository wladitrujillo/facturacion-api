import { Request } from "express";

export class PageRequest {
    q: string;
    page: number;
    pageSize: number;
    fields: string;
    sort: string;

    constructor(request: any) {
        this.q = request.query.q;
        this.page = parseInt(request.query.page);
        this.pageSize = parseInt(request.query.per_page);
        this.fields = request.query.fields;
        this.sort = request.query.sort;

    }
}
