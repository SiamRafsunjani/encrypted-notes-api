import { Module } from '@nestjs/common';
import { NotesService } from './secret-note.service';
import { SecretNotesController } from './secret-notes.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SecretNotesController],
  providers: [NotesService, PrismaService],
})
export class SecretNoteNotesModule {}
