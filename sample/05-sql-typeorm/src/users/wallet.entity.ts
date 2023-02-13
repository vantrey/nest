import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';

type Currencies = 'USD' | 'BYN'
@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  currency: Currencies;

  @Column()
  balance: number

  @Column()
  ownerId: number

  @ManyToOne(() => User, u => u.wallets)
  owner: User

  @OneToMany(() => WalletSharing, ws => ws.wallet)
  walletsSharing: WalletSharing[]
}

@Entity()
export class WalletSharing {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  userId: string

  @ManyToOne(() => User, u => u.walletsSharing)
  user: User

  @Column()
  walletId: string

  @ManyToOne(() => Wallet, w => w.walletsSharing)
  wallet: Wallet

  @Column()
  limit: number
  @Column()
  addedAt:string
}