import { Request, Response, NextFunction } from "express";

import { bookService } from "../services";
import { bookSchema } from "../schemas";
import { validateRequestBody, TypedResponse } from "../utils";
import { BookResponse, BooksResponse } from "../types";

export const getAll = async (
  req: Request,
  res: TypedResponse<BooksResponse[]>,
  next: NextFunction
) => {
  try {
    const books = await bookService.getAll(req, res);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getOne = async (
  req: Request,
  res: TypedResponse<BookResponse>,
  next: NextFunction
) => {
  try {
    const book = await bookService.getOne(req, res);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateRequestBody(bookSchema, req.body);

    await bookService.createOne(req, res);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};
