import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Constraint } from './Constraint';
import { Goal } from './Goal';
import { Student } from './Student';

@Entity({ name: 'perceived_formation_satisfaction_log' })
export class PerceivedFormationSatisfactionLog {

  @ManyToOne(_type => Constraint, t => t.satisfactionLog)
  public constraint: Promise<Constraint>;

  @RelationId((t: PerceivedFormationSatisfactionLog) => t.constraint)
  public constraintId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @ManyToOne(_type => Goal, t => t.satisfactionLog)
  public goal: Promise<Goal>;

  @RelationId((t: PerceivedFormationSatisfactionLog) => t.goal)
  public goalId: number;

  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'bigint', unsigned: true })
  public reviewer: number;

  @ManyToOne(_type => Student, t => t.perceivedFormationSatisfactionLog)
  public target: Promise<Student>;

  @RelationId((t: PerceivedFormationSatisfactionLog) => t.target)
  public targetId: number;

  @Column({ type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  public value: number;
}
