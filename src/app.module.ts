import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlantModule } from './plant/plant.module';



import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from './models/mongoose.config';
import { PostModule } from './post/post.module';
import { TokenService } from './service/token.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './files/multer-config';


@Module({
  imports: [PlantModule, UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/stackoverflower'), PostModule, MulterModule.register(multerConfig)],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}
