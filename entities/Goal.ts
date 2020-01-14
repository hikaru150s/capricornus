import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SatisfactionLog } from './SatisfactionLog';

@Entity({ name: 'Goals' })
export class Goal {

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  public description: string;

  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public id: number;

  @Column({ type: 'varchar', length: 64 })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  public name: string;

  @OneToMany(_type => SatisfactionLog, el => el.goal)
  public satisfactionLog: Promise<Array<SatisfactionLog>>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public updated_at: Date;
}
