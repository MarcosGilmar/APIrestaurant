import { Router } from "express"

import { TablesSectionsController } from "@/controllers/tables-sections-controller"

const tablesSectionsRouter = Router()
const tablesSectionsController = new TablesSectionsController

tablesSectionsRouter.get("/", tablesSectionsController.index)
tablesSectionsRouter.post("/", tablesSectionsController.create)
tablesSectionsRouter.patch("/:id", tablesSectionsController.update)

export { tablesSectionsRouter }