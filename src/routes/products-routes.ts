import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRouter = Router();
const productsController = new ProductController();

productsRouter.get("/", productsController.index)

export { productsRouter}