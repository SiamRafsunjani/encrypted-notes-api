import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './secret-note.service';
import { PrismaService } from '../prisma.service';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService, PrismaService], // Add PrismaService to the providers
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
