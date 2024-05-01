import { Test, TestingModule } from '@nestjs/testing';
import { SecretNotesController } from './secret-notes.controller';
import { NotesService } from './secret-note.service';
import { PrismaService } from '../prisma.service';
import { LoggerModule } from 'nestjs-pino';

describe('NotesController', () => {
  let controller: SecretNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNotesController],
      imports: [LoggerModule.forRoot()],
      providers: [NotesService, PrismaService], // Add the missing dependencies here
    }).compile();

    controller = module.get<SecretNotesController>(SecretNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
