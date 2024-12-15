import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Borrowing } from "./Borrowing";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.user)
  borrowings: Borrowing[];
}
