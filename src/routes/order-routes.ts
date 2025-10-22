import { Router } from "express";
import { OrdersController } from "@/controllers/order-controller";

const ordersRouter = Router()
const ordersController = new OrdersController

ordersRouter.post("/", ordersController.create)

export { ordersRouter }