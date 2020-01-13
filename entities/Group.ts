import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../classes';
import { GroupScoringLog } from './GroupScoringLog';
import { Student } from './Student';

@Entity({ name: 'group' })
export class Group extends BaseEntity {
  public static readonly tableName: string = 'group';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @OneToMany(_type => GroupScoringLog, t => t.target)
  public groupScoringLog: Promise<Array<GroupScoringLog>>;

  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @OneToMany(_type => Student, t => t.group)
  public members: Promise<Array<Student>>;

  @Column({ type: 'varchar', length: 64 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  public name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at: Date;
}
