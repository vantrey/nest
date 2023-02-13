import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @Column()
  address: string;

  @Column()
  hobby: string;

  @OneToOne(() => User, u => u.profile)
  @JoinColumn()
  user: User;

  @PrimaryColumn()
  userId: number;
}
