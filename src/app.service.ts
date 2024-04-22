import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { faceDetection } from './app.schema';
import puppeteer from 'puppeteer';
import * as ejs from 'ejs';
import * as fs from 'fs';
@Injectable()
export class AppService {
  constructor(@InjectModel(faceDetection.name)private readonly faceDetectionModel:mongoose.Model<faceDetection>){}
  getHello(): string {
    return 'Hello World!';
  }

  async detectFace(){
    return this.genPdf();
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveFaceDetect(body): Promise<any> {
    return await this.faceDetectionModel.create(body);
  }

  async genPdf(): Promise<boolean> {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", '--disable-setuid-sandbox', '--disable-dev-shm-usage', "--disable-gpu"],
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        });
        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(100000); 

        // Read the EJS template file
        const template = fs.readFileSync("views/index.ejs", "utf-8");

        // Render the EJS template
        const renderedTemplate = ejs.render(template);

        // Set the HTML content of the page to the rendered template
        await page.setContent(renderedTemplate);

        // Wait for the DOM content to be loaded
        await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

        // Execute JavaScript with a delay
        await page.evaluate(() => {
            return new Promise(resolve => {
                setTimeout(resolve, 2000); // Adjust the delay time as needed
            });
        });

        // Take a screenshot after JavaScript execution
        // await page.screenshot({ path: 'screenshot.png' });

        // Close the browser
        await browser.close();

        return true;
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new BadRequestException(error.message);
    }
}

}
