import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";

class OrdersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try { 
            const bodySchema = z.object({
                table_section_id: z.number(),
                product_id: z.number(),
                quantity: z.number()
            })

            const { table_section_id, product_id, quantity } = bodySchema.parse(request.body)

            const section = await knex<TablesSectionsRepository>("table_sections")
                .where({ id: table_section_id })
                .first()

            if(!section){
                throw new AppError("Section table not found")
            }

            if(section.closed_at){
                throw new AppError("This table is closed")
            }

            const product = await knex<ProductRepository>("products")
                .where({ id: product_id})
                .first()

            if(!product){
                throw new AppError("product not found")
            }

            await knex<OrderRepository>("orders").insert({
                table_section_id,
                product_id,
                quantity,
                price: product.price
            })

            return response.status(201).json()

        } catch(error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try{
            const { table_section_id } = request.params
            
            const order = await knex("orders")
            .select(
                "orders.id", 
                "orders.table_section_id", 
                "orders.product_id", 
                "products.name",
                "orders.quantity",
                knex.raw("(orders.price * orders.quantity) AS total"),
                "orders.created_at",
                "orders.updated_at"
            )
            .join("products", "products.id", "orders.product_id")
            .where({ table_section_id })
            .orderBy("orders.created_at", "desc")
            
            return response.json(order)
        } catch(error){
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        try{
            const { table_section_id} = request.params

            const order = await knex("orders")
                .select(
                    knex.raw("COALESCE(SUM(orders.price * orders.quantity),0) AS total"),
                    knex.raw("COALESCE(SUM(orders.quantity), 0) AS quantity")
                )
                .where({ table_section_id })
                .first()

            return response.json(order)
        } catch(error) {
            next(error)
        }
    }
}

export { OrdersController }