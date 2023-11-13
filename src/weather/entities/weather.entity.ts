import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'bigint' }) // используем bigint для хранения миллисекунд
  action_time: number;

  @Column()
  request_result:number

  @Column({ nullable: true })
  temp_c:number;
}
