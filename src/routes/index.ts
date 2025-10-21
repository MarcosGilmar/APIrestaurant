import { Router } from "express";
import { productsRouter } from "./products-routes";
import { tablesRouter } from "./tables-routes";

const routes = Router()
routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)

export { routes }

