import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {Profile} from './profile.entity';
import {Wallet, WalletSharing} from './wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Wallet, WalletSharing])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
