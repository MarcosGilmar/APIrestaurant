import { Router } from "express";
import { productsRouter } from "./products-routes";
import { tablesRouter } from "./tables-routes";
import { tablesSectionsRouter } from "./tables-sections-routes";

const routes = Router()
routes.use("/products", productsRouter)
routes.use("/tables", tablesRouter)
routes.use("/table_sections", tablesSectionsRouter)

export { routes }

