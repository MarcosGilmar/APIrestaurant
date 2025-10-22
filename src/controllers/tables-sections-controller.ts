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
    
    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "id must be a number"})
                .parse(request.params.id)

            const section = await knex<TablesSectionsRepository>("table_sections")
                .where({ id })
                .first()

            if(!section){
                throw new AppError("section not found")
            }

            if(section.closed_at){
                throw new AppError("this section table is already closed")
            }

            await knex<TablesSectionsRepository>("table_sections")
                .update({ closed_at: knex.fn.now()})
                .where({ id })

            return response.json()
            
        } catch(error) {
            next(error)
        }
    }
}

export { TablesSectionsController }