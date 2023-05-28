import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Application, ApplicationCreationAttrs } from './application.model';
import { JobCategory } from './job_category.model';
import { ApplicationType } from './application_type.model';
import { ApplicationStatus } from './application_status.model';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application)
    private applicationModel: typeof Application,
    @InjectModel(JobCategory) private jobCategory: typeof JobCategory,
    @InjectModel(ApplicationType)
    private applicationTypeModel: typeof ApplicationType,
    @InjectModel(ApplicationStatus)
    private applicationStatusModel: typeof ApplicationStatus,
  ) {}

  async create(
    applicationData: ApplicationCreationAttrs,
  ): Promise<Application> {
    return this.applicationModel.create(applicationData);
  }

  async findById(id: number): Promise<Application> {
    return this.applicationModel.findByPk(id);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.findAll();
  }

  async update(
    id: number,
    applicationData: ApplicationCreationAttrs,
  ): Promise<Application> {
    const application = await this.findById(id);
    if (!application) {
      throw new Error('Application not found');
    }
    const { categories, type, status, ...restData } = applicationData;

    if (categories && categories.length > 0) {
      const categoryInstances = await Promise.all(
        categories.map((categoryId) => this.jobCategory.findByPk(categoryId)),
      );
      await application.$set('categories', categoryInstances);
    }
    if (type) {
      const applicationType = await this.applicationTypeModel.findByPk(type);
      if (!applicationType) {
        throw new Error('Invalid application type');
      }
      await application.$set('type', applicationType);
    }
    if (status) {
      const applicationStatus = await this.applicationStatusModel.findByPk(
        status,
      );
      if (!applicationStatus) {
        throw new Error('Invalid application status');
      }
      await application.$set('status', applicationStatus);
    }

    return application.update(restData, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    const application = await this.findById(id);
    if (!application) {
      throw new Error('Application not found');
    }

    await application.destroy();
  }
}
