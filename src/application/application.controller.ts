import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationCreationAttrs } from './application.model';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  async create(@Body() applicationData: ApplicationCreationAttrs) {
    return this.applicationService.create(applicationData);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.applicationService.findById(id);
  }

  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() applicationData: ApplicationCreationAttrs,
  ) {
    return this.applicationService.update(id, applicationData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.applicationService.delete(id);
  }
}
