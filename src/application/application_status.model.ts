import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Application } from './application.model';

@Table({ tableName: 'application_statuses' })
export class ApplicationStatus extends Model<ApplicationStatus> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  status: string;

  @HasMany(() => Application)
  applications: Application[];
}
