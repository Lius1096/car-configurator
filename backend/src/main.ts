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
