import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel('MenuItem') private model: Model<any>){}

  async findAll() {
    return this.model.find().lean();
  }

  async createMany(items:any[]){
    return this.model.insertMany(items);
  }

  async findByCategory(category: string) {
    return this.model.find({ category }).lean();
  }
}
