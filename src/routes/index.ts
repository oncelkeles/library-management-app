import { Router } from "express";

import users from "./user.routes";
import books from "./book.routes";

const router = Router();

router.use("/users", users);
router.use("/books", books);

export default router;
