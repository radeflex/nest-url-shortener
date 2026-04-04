import { Module } from '@nestjs/common';
import { UrlService } from './service/url.service';
import { UrlRepository } from './repository/url.repository';
import { DBModule } from './db.module';
import { UrlController } from './controller/url.controller';

@Module({
  imports: [DBModule],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule {}
