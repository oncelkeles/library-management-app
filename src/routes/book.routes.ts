import { Router } from "express";

import { bookController } from "../controllers";

const router = Router();

router.route("/").get(bookController.getAll).post(bookController.createOne);

router.route("/:id").get(bookController.getOne);

export default router;
