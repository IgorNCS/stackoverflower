import { Injectable } from '@nestjs/common';
import { Plant as PlantEntity } from 'src/entities/plant.entity';
import { CreatePlantDto } from './dto/create-plant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plant } from 'src/models/Plant.schema';

@Injectable()
export class PlantService {
    constructor(@InjectModel('Plant') private plantModel: Model<Plant>) { }
    private plants: PlantEntity[] = [
        {
            "name": "Teste",
            "scientific_name": "Testeres nameres",
            "description": "Este é um teste",
            "tags": [
                "teste",
                "tag"
            ],
            "id": "d3158aa1-ce60-4799-9953-0684592c1d17"
        }
    ]

    async findAll(): Promise<Plant[]> {
        return this.plantModel.find().exec();
    }

    async findOneById(id: string): Promise<Plant> {
        return this.plantModel.findById(id).exec();
    }


    create(createPlantDto: CreatePlantDto): Promise<Plant> {
        const createdPlant = new this.plantModel(createPlantDto)
        return createdPlant.save()
    }

    async update(updatePlantDto: any, params: any): Promise<Plant> {
        return await this.plantModel.findByIdAndUpdate(params.id, updatePlantDto, { new: true }).exec();

    }


    remove(id: any) {
        this.plantModel.findByIdAndDelete(id).exec();
    }


}
