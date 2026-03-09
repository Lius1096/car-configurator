import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Serve static frontend files
  const frontendPath = join(__dirname, '../../frontend/dist');
  console.log('🎨 Serving static assets from:', frontendPath);

  // Debug: check if path exists and list files
  const fs = require('fs');
  if (fs.existsSync(frontendPath)) {
    console.log('✓ Frontend dist path exists');
    const files = fs.readdirSync(frontendPath);
    console.log('📁 Contents:', files);

    const modelsPath = join(frontendPath, 'models');
    if (fs.existsSync(modelsPath)) {
      const modelFiles = fs.readdirSync(modelsPath);
      console.log('📦 Models:', modelFiles);
    } else {
      console.log('❌ Models folder not found!');
    }
  } else {
    console.log('❌ Frontend dist path does not exist!');
  }

  app.useStaticAssets(frontendPath);

  // Handle SPA routing - serve index.html for non-API routes
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api') && !req.url.includes('.')) {
      res.sendFile(join(frontendPath, 'index.html'));
    } else {
      next();
    }
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 App running on http://localhost:${port}`);
}
bootstrap();
