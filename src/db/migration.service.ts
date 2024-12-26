import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MigrationService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.runMigrations();
  }

  async runMigrations() {
    try {
      await this.dataSource.runMigrations({ transaction: 'all' });
      console.log('Migrations completed successfully [in NestJs] !!!');
    } catch (error) {
      console.error('Error when performing migrations:');
      console.error(error);
    }
  }
}
