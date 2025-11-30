import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Schema } from 'mongoose';

export const MenuItemSchema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  idKey: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  requiresSide: { type: Boolean, default: false },
  sides: { type: [String], default: [] },
  image: { type: String }
}, { timestamps: true });

// Type TS (facultatif mais conseillé)
export interface MenuItem {
  category: string;
  name: string;
  idKey: string;
  price: number;
  description?: string;
  requiresSide?: boolean;
  sides?: string[];
  image?: string;
}

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'MenuItem', schema: MenuItemSchema }
    ])
  ],
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
