import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from "express";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,"..","public"));
  app.use("/public/images",express.static(join(__dirname,"..","public","images")));
  app.use("/public/images",express.static(join(__dirname,"..","public","models")));
  app.setBaseViewsDir(join(__dirname,"..","views"));
  app.setViewEngine("ejs");
  await app.listen(3000);
}
bootstrap();
