import { Request, Response, NextFunction } from "express";
import knex from "knex";

class TablesController {
    async index(request:  Request, response: Response, next: NextFunction) {
        try {
            const tables = await knex<TableRepository>("tables").select().orderBy("table_number")
        } catch(error) {
            next(error)
        }
    }
}

export { TablesController }