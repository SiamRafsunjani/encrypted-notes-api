import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SecretNote, Prisma } from '@prisma/client';

// TODO: implement an exception handler for this

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.SecretNoteCreateInput,
  ): Promise<{ id: number; createdAt: Date }> {
    const secretNote = await this.prisma.secretNote.create({
      data,
    });

    return { id: secretNote.id, createdAt: secretNote.createdAt };
  }

  findAll(params: { page?: number; limit?: number }): Promise<SecretNote[]> {
    // Prisma uses skip take based pagination
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    const take = limit;

    return this.prisma.secretNote.findMany({
      skip,
      take,
    });
  }

  // TODO: return a decrypted note by id
  findOneDecrypted(id: number): Promise<SecretNote> {
    return this.prisma.secretNote.findUnique({
      where: { id },
    });
  }

  findOne(id: number): Promise<SecretNote> {
    return this.prisma.secretNote.findUnique({
      where: { id },
    });
  }

  update(params: {
    where: Prisma.SecretNoteWhereUniqueInput;
    data: Prisma.SecretNoteUpdateInput;
  }): Promise<SecretNote> {
    const { data, where } = params;
    return this.prisma.secretNote.update({
      data,
      where,
    });
  }

  remove(where: Prisma.SecretNoteWhereUniqueInput): Promise<SecretNote> {
    return this.prisma.secretNote.delete({
      where,
    });
  }
}
