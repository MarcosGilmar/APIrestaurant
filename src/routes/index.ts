import { Router } from "express";
import { productsRouter } from "./products-routes";
import { tablesRouter } from "./tables-routes";
import { tablesSectionsRouter } from "./tables-sections-routes";
import { ordersRouter } from "./order-routes";

const routes = Router()
routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/table_sections", tablesSectionsRouter)
routes.use("/orders", ordersRouter)

export { routes }

