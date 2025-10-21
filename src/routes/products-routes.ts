import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get("/", productsController.index)
productsRouter.post("/", productsController.create)
productsRouter.put("/:id", productsController.update)
productsRouter.delete("/:id",  productsController.remove)

export { productsRouter}