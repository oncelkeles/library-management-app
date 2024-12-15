import express from "express";
import helmet from "helmet";

import { sanitizeMiddleware, errorHandler } from "./middlewares";
import { AppDataSource } from "./data-source";
import routes from "./routes";

const app = express();

const port = 3000;

(async () => {
  await AppDataSource.initialize();
})();

app.use(helmet());
app.use(express.json());
app.use(sanitizeMiddleware);

app.use("/", routes);

// Fallback for unhandled routes
app.use((req, res) => {
  res.status(404).send("Route not found!");
});

app.use(errorHandler);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
