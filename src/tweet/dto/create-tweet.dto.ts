import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateTweetDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  content: string;
}
