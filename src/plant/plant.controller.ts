import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from './dto/create-plant.dto';

@Controller('plant')
export class PlantController {

    constructor(private readonly plantsService: PlantService) { }

    @Get()
    findAll() {
        return this.plantsService.findAll()
    }

    @Get('/:id')
    findOneById(@Param() params) {
        return this.plantsService.findOneById(params.id)
    }

    @Post('/new')
    create(@Body() createPlantDto: CreatePlantDto){
        return this.plantsService.create(createPlantDto)
    }

    @Patch('/:id')
    update(@Body() updatePlantDto: any, @Param() params){
        return this.plantsService.update(updatePlantDto,params)
    }

    @Delete('/:id')
    remove(@Param() params) {
        return this.plantsService.remove(params.id)
    }
}
