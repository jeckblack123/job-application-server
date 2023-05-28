import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Application } from './application.model';

@Table({ tableName: 'application_types' })
export class ApplicationType extends Model<ApplicationType> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  typeName: string;

  @HasMany(() => Application)
  applications: Application[];
}
