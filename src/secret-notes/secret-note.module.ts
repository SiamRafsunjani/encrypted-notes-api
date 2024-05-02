import { Module } from '@nestjs/common';
import { NotesService } from './secret-note.service';
import { SecretNotesController } from './secret-notes.controller';
import { PrismaService } from '../prisma.service';
import { EncryptionService } from '../common/helpers/transform-objects';
@Module({
  controllers: [SecretNotesController],
  providers: [NotesService, PrismaService, EncryptionService],
})
export class SecretNoteNotesModule {}
