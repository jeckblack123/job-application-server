import { ApplicationController } from './application.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApplicationService } from './application.service';
import { Module } from '@nestjs/common';
import { Application } from './application.model';
import { ApplicationType } from './application_type.model';
import { ApplicationStatus } from './application_status.model';
import { JobCategory } from './job_category.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Application,
      ApplicationType,
      ApplicationStatus,
      JobCategory,
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
