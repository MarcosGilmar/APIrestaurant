import { Request, Response, NextFunction } from "express"
import { z } from "zod"
import { knex } from "@/database/knex" 
import { AppError } from "@/utils/AppError"

class TablesSectionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            })

            const { table_id } = bodySchema.parse(request.body)

            const section = await knex<TablesSectionsRepository>("table_sections")
                .where({ table_id })
                .orderBy("opened_at", "desc")
                .first()

                if(section && !section.closed_at) {
                    throw new AppError("this table is already open")
                }

            await knex<TablesSectionsRepository>("table_sections").insert({
                table_id,
                opened_at: knex.fn.now(),         
            })

            return response.status(201).json()
        } catch(error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const sections = await knex<TablesSectionsRepository>("table_sections")
            .select()    
            .orderBy("closed_at")

            return response.json(sections)
        } catch(error) {
            next(error)
        }
    }
}

export { TablesSectionsController }