import { ApiProperty } from "@nestjs/swagger";
import { Weather } from "src/weather/entities/weather.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fio: string;

  @Column()
  token: string;

  @OneToMany(() => Weather, weather => weather.user)
  weather: Weather[];

}

