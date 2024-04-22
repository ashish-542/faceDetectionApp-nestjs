import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { faceDetection } from './app.schema';
import mongoose from 'mongoose';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("index")
  @Render("index")
  getPhoto(){
  }
  @Get("detect")
  async detectFace(){
    return await this.appService.detectFace();
  }
  @Post("saveDetection")
  async saveFace(@Body()body){
    return await this.appService.saveFaceDetect(body);
  }
}
