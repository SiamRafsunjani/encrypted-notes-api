import { Module } from '@nestjs/common';
import { SecretNoteNotesModule } from './secret-notes/secret-note.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from './middlewares/authorization.guard';
import { LoggerModule } from 'nestjs-pino';

// TODO: This module is the root module of the application
// For this implementation we are importing everything we need here
// We can think of moving to other modules if necessary.
// for example we can move the ThrottlerModule to the SecretNoteNotesModule
// if we want to limit the requests only for the secret notes
@Module({
  imports: [
    SecretNoteNotesModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // Pino logger setup
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        // Redact Authorization headers, note, token and API_KEY to avoid accidentally logging
        redact: ['req.headers.authorization', 'note', 'token', 'API_KEY'],
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,

        // Disable auto logging to avoid logging every request
        // We only want to log the requests we want to log as this is a secret notes app
        autoLogging: false,
      },
    }),

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
