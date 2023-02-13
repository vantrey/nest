import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Profile} from './profile.entity';
import {Wallet, WalletSharing} from './wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Profile, p => p.user)
  profile: Profile

  @OneToMany(() => Wallet, w => w.owner)
  wallets: Wallet[]

  @OneToMany(() => WalletSharing, ws => ws.user)
  walletsSharing: WalletSharing[]
}
