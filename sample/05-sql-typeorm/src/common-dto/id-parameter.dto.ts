import { IsUUID } from 'class-validator';

export class UuidParameterIdDTO {
  @IsUUID('4', { message: 'Incorrect objectId' })
  id: string;
}
