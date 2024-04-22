import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class faceDetection{
    @Prop({type:String})
    score:string
    @Prop({type:Boolean})
    status:boolean
    @Prop({type:String})
    image:string
}

export const faceDetectionSchema=SchemaFactory.createForClass(faceDetection);