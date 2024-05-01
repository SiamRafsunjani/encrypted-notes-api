import { Module } from '@nestjs/common';
import { SecretNoteNotesModule } from './secret-notes/secret-note.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from './authorization/authorization.guard';

@Module({
  imports: [
    SecretNoteNotesModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate limiting 50 requests per minute
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // <- 1 minute, in milliseconds
        limit: 50,
      },
    ]),
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
