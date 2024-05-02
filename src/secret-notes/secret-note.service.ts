import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { ISecretNoteExposed, ISecretNoteMetaData } from './secret-note.types';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Prisma.SecretNoteCreateInput,
  ): Promise<ISecretNoteMetaData> {
    const secretNote = await this.prisma.secretNote.create({
      data,
    });

    return { id: secretNote.id, createdAt: secretNote.createdAt };
  }

  findAll(params: {
    page?: number;
    limit?: number;
  }): Promise<ISecretNoteMetaData[]> {
    // Prisma uses skip take based pagination
    const { page, limit } = params;
    const skip = (page - 1) * limit;
    const take = limit;

    return this.prisma.secretNote.findMany({
      select: { id: true, createdAt: true },
      skip,
      take,
    });
  }

  findOne(id: number): Promise<ISecretNoteExposed> {
    return this.prisma.secretNote.findUnique({
      where: { id },
    });
  }

  update(params: {
    where: Prisma.SecretNoteWhereUniqueInput;
    data: Prisma.SecretNoteUpdateInput;
  }): Promise<ISecretNoteMetaData> {
    const { data, where } = params;
    return this.prisma.secretNote.update({
      select: { id: true, createdAt: true },
      data,
      where,
    });
  }

  remove(
    where: Prisma.SecretNoteWhereUniqueInput,
  ): Promise<ISecretNoteMetaData> {
    return this.prisma.secretNote.delete({
      where,
    });
  }
}
