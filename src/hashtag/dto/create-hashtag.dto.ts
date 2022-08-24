import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateHashtagDto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  tag: string;
}
