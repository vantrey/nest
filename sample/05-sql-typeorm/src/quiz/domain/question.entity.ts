import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class InitUpdateQuestionDto {
  body: string;
  correctAnswers: string[];
}
@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  body: string;

  @Column({ type: 'json' })
  correctAnswers: string[];

  @Column()
  published: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  updatedAt: Date | null;

  @Column()
  isDeleted: boolean;

  initialise(initQuestionDto: InitUpdateQuestionDto) {
    const date = new Date();
    this.createdAt = date;
    this.updatedAt = null;
    this.body = initQuestionDto.body;
    this.correctAnswers = initQuestionDto.correctAnswers;
    this.published = false;
    this.isDeleted = false;
  }

  delete() {
    this.isDeleted = true;
  }

  update(dto: InitUpdateQuestionDto) {
    const date = new Date();
    this.correctAnswers = dto.correctAnswers;
    this.body = dto.body;
    this.updatedAt = new Date();
  }

  setPublish(isPublished: boolean) {
    this.published = isPublished;
    this.updatedAt = new Date();
  }
}
