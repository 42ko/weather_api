import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.weather)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  action_time:Date;

  @Column()
  request_result:number

  @Column({ nullable: true })
  temp_c:number;
}
