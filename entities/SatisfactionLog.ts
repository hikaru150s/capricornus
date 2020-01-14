import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { SatisfactionScope } from '../enums';
import { Constraint } from './Constraint';
import { Goal } from './Goal';

@Entity({ name: 'satisfaction_log' })
export class SatisfactionLog {

  @ManyToOne(_type => Constraint, t => t.satisfactionLog)
  public constraint: Promise<Constraint>;

  @RelationId((t: SatisfactionLog) => t.constraint)
  public constraintId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @ManyToOne(_type => Goal, t => t.satisfactionLog)
  public goal: Promise<Goal>;

  @RelationId((t: SatisfactionLog) => t.goal)
  public goalId: number;

  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'bigint', unsigned: true })
  public reviewer: number;

  @Column({ type: 'enum', enum: SatisfactionScope, default: SatisfactionScope.CONSTRAINT })
  @IsNotEmpty()
  public scope: SatisfactionScope;

  @Column({ type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  public value: number;
}
