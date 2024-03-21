import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { PlantSchema } from 'src/models/Plant.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Plant', schema: PlantSchema }]),
  ],
  controllers: [PlantController],
  providers: [PlantService]
})
export class PlantModule {}
