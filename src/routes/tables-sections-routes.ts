import { Router } from "express"

import { TablesSectionsController } from "@/controllers/tables-sections-controller"

const tablesSectionsRouter = Router()
const tablesSectionsController = new TablesSectionsController

tablesSectionsRouter.post("/", tablesSectionsController.create)

export { tablesSectionsRouter }