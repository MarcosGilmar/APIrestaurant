import { Router } from "express";
import { OrdersController } from "@/controllers/order-controller";

const ordersRouter = Router()
const ordersController = new OrdersController

ordersRouter.post("/", ordersController.create)
ordersRouter.get("/:table_section_id", ordersController.index)
ordersRouter.get("/:table_section_id/total", ordersController.show)

export { ordersRouter }