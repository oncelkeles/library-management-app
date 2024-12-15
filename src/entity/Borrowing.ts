import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./User";
import { Book } from "./Book";

@Entity("borrowings")
export class Borrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowings, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Book, { onDelete: "CASCADE" })
  @JoinColumn({ name: "book_id" })
  book: Book;

  @Column("int", { nullable: true })
  score: number;

  @Column({ name: "borrowed_at", type: "timestamptz" })
  borrowed_at: Date;

  @Column({ name: "returned_at", type: "timestamptz", nullable: true })
  returned_at?: Date;
}
