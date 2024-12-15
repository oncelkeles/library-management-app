import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Book } from "../entity";
import { HttpError, TypedResponse } from "../utils";
import { BookResponse, BooksResponse } from "../types";

export const getAll = async (
  req: Request,
  res: TypedResponse<BooksResponse[]>
) => {
  const books: BooksResponse[] = await AppDataSource.getRepository(Book)
    .createQueryBuilder("book")
    .select(["book.id", "book.name"])
    .orderBy("book.name", "ASC")
    .getMany();

  return books;
};

export const getOne = async (
  req: Request,
  res: TypedResponse<BookResponse>
) => {
  const bookId = req.params.id;

  const book = await AppDataSource.getRepository(Book)
    .createQueryBuilder("book")
    .select(["book.id", "book.name", "book.total_score", "book.users_read"])
    .where("book.id = :bookId", { bookId })
    .getOne();

  if (!book) {
    throw new HttpError("Book not found", 404);
  }

  const avgScore =
    book?.users_read === 0 ? -1 : book?.total_score / book?.users_read;

  const response: BookResponse = {
    id: book.id,
    name: book.name,
    score: avgScore === -1 ? -1 : avgScore.toString(),
  };

  return response;
};

export const createOne = async (req: Request, res: Response) => {
  const book = await AppDataSource.getRepository(Book).insert(req.body);

  return book;
};
