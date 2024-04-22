import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { faceDetection, faceDetectionSchema } from './app.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/faceDetectionTestApp'),MongooseModule.forFeature([{name:faceDetection.name,schema:faceDetectionSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
