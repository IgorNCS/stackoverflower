import { MongooseModule } from "@nestjs/mongoose";
import { PlantSchema } from "./Plant.schema";

export const MongooseConfig = MongooseModule.forFeature([
    { name: 'Plant', schema: PlantSchema },
  ]);