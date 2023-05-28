import {
  Model,
  Column,
  Table,
  BelongsToMany,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Application } from './application.model';

@Table({ tableName: 'job_categories' })
export class JobCategory extends Model<JobCategory> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  categoryName: string;

  @BelongsToMany(
    () => Application,
    'ApplicationCategory',
    'categoryId',
    'applicationId',
  )
  applications: Application[];
}
