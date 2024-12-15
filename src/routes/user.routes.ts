import { Router } from "express";

import { userController } from "../controllers";

const router = Router();

router.route("/").get(userController.getAll).post(userController.createOne);

router
  .route("/:id")
  .get(userController.getOne)
  .delete(userController.deleteOne);

router.route("/:userId/borrow/:bookId").post(userController.borrowBook);

router.route("/:userId/return/:bookId").post(userController.returnBook);

export default router;
