import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { User, Borrowing, Book } from "../entity";
import { HttpError, TypedResponse } from "../utils";
import { UserResponse, UsersResponse } from "../types";

export const getAll = async (
  req: Request,
  res: TypedResponse<UsersResponse[]>
) => {
  const users: UsersResponse[] = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .select(["user.id", "user.name"])
    .orderBy("user.name", "ASC")
    .getMany();

  return users;
};

export const getOne = async (
  req: Request,
  res: TypedResponse<UserResponse>
) => {
  const userId = req.params.id;

  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .select(["user.id", "user.name"])
    .leftJoinAndSelect("user.borrowings", "borrowing")
    .leftJoinAndSelect("borrowing.book", "book")
    .where("user.id = :userId", { userId })
    .getOne();

  if (!user) {
    throw new HttpError("User is not found", 404);
  }

  const pastBooks = user.borrowings
    .filter((borrowing) => !!borrowing.returned_at)
    .map((borrowing) => ({
      title: borrowing.book.name,
      userScore: +borrowing.score,
    }));

  const currentBooks = user.borrowings
    .filter((borrowing) => !borrowing.returned_at)
    .map((borrowing) => ({
      title: borrowing.book.name,
    }));

  const response: UserResponse = {
    id: user.id,
    name: user.name,
    books: { past: [...pastBooks], present: [...currentBooks] },
  };

  return response;
};

export const createOne = async (req: Request, res: Response) => {
  console.log(req.body);

  const user = await AppDataSource.getRepository(User).insert(req.body);

  return user;
};

export const deleteOne = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .delete()
    .where("user.id = :userId", { userId })
    .execute();

  return user;
};

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;

  const { book, currentBookBorrowing, user } = await checkIfBookIsBorrowed(
    userId,
    bookId
  );

  if (currentBookBorrowing) {
    throw new HttpError("Book is already borrowed", 400);
  }

  const borrowing = await AppDataSource.getRepository(Borrowing).insert({
    user,
    book,
    borrowed_at: new Date(Date.now()),
  });

  return borrowing;
};

// returns book if it is borrowed by the user and updates book score
export const returnBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.params;
  const score = parseInt(req.body.score);

  const borrowingRepository = AppDataSource.getRepository(Borrowing);
  const bookRepository = AppDataSource.getRepository(Book);

  const { currentBookBorrowing, book, user } = await checkIfBookIsBorrowed(
    userId,
    bookId
  );

  if (!currentBookBorrowing) {
    throw new HttpError("Book is not borrowed", 400);
  }

  // check if the user has already returned and scored the book
  // if so, update the book total score without incrementing the times read
  const prevLatestBorrowing = await borrowingRepository
    .createQueryBuilder("borrowing")
    .where("borrowing.book = :bookId", { bookId })
    .andWhere("borrowing.user = :userId", { userId })
    .andWhere("borrowing.returned_at IS NOT NULL")
    .orderBy("borrowing.returned_at", "DESC")
    .getOne();

  // store score and read times on book so that
  // we can calculate the average score without reading borrowings table
  if (prevLatestBorrowing) {
    book.total_score += score - prevLatestBorrowing.score;
  } else {
    book.total_score += score;
    book.users_read += 1;
  }

  await bookRepository.save(book);

  currentBookBorrowing.returned_at = new Date(Date.now());
  currentBookBorrowing.score = score;
  const borrowing = await borrowingRepository.save(currentBookBorrowing);

  return borrowing;
};

const checkIfBookIsBorrowed = async (userId: string, bookId: string) => {
  // check if user & book exists
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :userId", { userId })
    .getOne();
  if (!user) {
    throw new HttpError("User not found", 404);
  }
  const book = await AppDataSource.getRepository(Book)
    .createQueryBuilder("book")
    .where("book.id = :bookId", { bookId })
    .getOne();
  if (!book) {
    throw new HttpError("Book not found", 404);
  }

  // check if the book is already borrowed
  const currentBookBorrowing = await AppDataSource.getRepository(Borrowing)
    .createQueryBuilder("borrowing")
    .where("borrowing.book = :bookId", { bookId })
    .andWhere("borrowing.returned_at IS NULL")
    .getOne();

  return { currentBookBorrowing, user, book };
};
