import { Module } from '@nestjs/common';
import { AssetsModule } from '@App/assets/assets.module';
import { DataLoaderService } from './data-loader.service';

@Module({
  imports: [AssetsModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
