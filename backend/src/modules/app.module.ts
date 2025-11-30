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
        if (configured) {
          try {
            // quick connection attempt to validate the configured mongo server
            await mongoose.connect(configured, { serverSelectionTimeoutMS: 3000 });
            await mongoose.disconnect();
            console.log('[Mongoose] Connected to configured MongoDB:', configured);
            return { uri: configured };
          } catch (err) {
            console.warn('[Mongoose] Unable to connect to configured MongoDB. Falling back to in-memory DB.', err?.message || err);
          }
        }

        // Start an in-memory MongoDB for development if the configured DB is not available
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
