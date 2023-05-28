import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/role.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { ApplicationStatus } from './application_status.model';
import { ApplicationType } from './application_type.model';
import { JobCategory } from './job_category.model';
import { User } from 'src/user-module/user.model';

export interface ApplicationCreationAttrs {
  id: number;
  userId: string;
  textApplication: string;
  categories: JobCategory['id'][];
  type: ApplicationType['id']; //todo: поменять на enum
  location: string;
  salary: number;
  status: ApplicationStatus['id'];
}

@Table({ tableName: 'applications' })
export class Application extends Model<Application, ApplicationCreationAttrs> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: string;

  @Column
  textApplication: string;

  @ForeignKey(() => ApplicationType)
  @Column
  typeId: number;

  @ForeignKey(() => ApplicationStatus)
  @Column
  statusId: number;

  @ForeignKey(() => JobCategory)
  @Column
  categoriesId: number;

  @Column
  location: string;

  @Column
  salary: number;

  @BelongsTo(() => JobCategory)
  categories: JobCategory[];

  @BelongsTo(() => ApplicationType)
  type: ApplicationType;

  @BelongsTo(() => ApplicationStatus)
  status: ApplicationStatus;

  @BelongsToMany(() => User, 'UserApplication', 'userId', 'applicationId')
  users: User[];
}
