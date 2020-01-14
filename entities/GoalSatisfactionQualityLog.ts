import { IsNotEmpty, IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Constraint } from './Constraint';
import { Goal } from './Goal';
import { Group } from './Group';

@Entity({ name: 'goal_satisfaction_quality_log' })
export class GoalSatisfactionQualityLog {

  @ManyToOne(_type => Constraint, t => t.satisfactionLog)
  public constraint: Promise<Constraint>;

  @RelationId((t: GoalSatisfactionQualityLog) => t.constraint)
  public constraintId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @ManyToOne(_type => Goal, t => t.satisfactionLog)
  public goal: Promise<Goal>;

  @RelationId((t: GoalSatisfactionQualityLog) => t.goal)
  public goalId: number;

  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'bigint', unsigned: true })
  public reviewer: number;

  @ManyToOne(_type => Group, t => t.goalSatisfactionQualityLog)
  public target: Promise<Group>;

  @RelationId((t: GoalSatisfactionQualityLog) => t.target)
  public targetId: number;

  @Column({ type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  public value: number;
}
