import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CarsModule } from './cars/cars.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    // Try to use configured MONGODB_URI. If it exists but is unreachable, fall back to an
    // in-memory MongoDB (useful for local dev) via mongodb-memory-server.
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const configured = process.env.MONGODB_URI;
        const isProduction = process.env.NODE_ENV === 'production';

        if (configured) {
          console.log('[Mongoose] Using MongoDB URI from environment');
          return { uri: configured };
        }

        if (isProduction) {
          throw new Error('MONGODB_URI environment variable is required in production');
        }

        // Start an in-memory MongoDB for development if the configured DB is not available
        console.log('[Mongoose] Starting in-memory MongoDB for development...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongoServer = await MongoMemoryServer.create();
        const memUri = mongoServer.getUri();
        console.log('[Mongoose] Started in-memory MongoDB at', memUri);
        return { uri: memUri };
      }
    }),
    CarsModule,
  ],
})
export class AppModule {}
