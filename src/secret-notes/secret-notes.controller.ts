import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NotesService } from './secret-note.service';
import { SecretNote as SecretNoteModel } from '@prisma/client';
import * as apiResponseDocs from './swagger-docs/secret-note';
import { CreateSecretNoteDto, PaginationDto } from './dto/secret-note-dto';

@Controller()
@ApiTags('Secret Notes')
@ApiBearerAuth('apiKey')
@ApiResponse({ status: 403, schema: apiResponseDocs.forbiddenResponse })
@ApiResponse({ status: 400, schema: apiResponseDocs.invalidDataResponse })
export class SecretNotesController {
  constructor(private readonly secretNoteService: NotesService) {}

  @Post('secret-note')
  @ApiOperation({ summary: 'Create a secret note' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.createSecretNoteResponse,
  })
  async createNote(
    @Body() createSecretNoteDto: CreateSecretNoteDto,
  ): Promise<{ id: number }> {
    const { note } = createSecretNoteDto;
    return this.secretNoteService.create({
      note,
    });
  }

  @Get('secret-note')
  @ApiOperation({ summary: 'Get all secret notes' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.getAllSecretNoteResponse,
  })
  async getAllNotes(
    @Query() paginationDto: PaginationDto,
  ): Promise<SecretNoteModel[]> {
    const { page, limit } = paginationDto;
    return this.secretNoteService.findAll({
      page,
      limit,
    });
  }

  @Get('secret-note/:id')
  @ApiOperation({ summary: 'Get one encrypted note by id' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.getOneSecretNoteResponse,
  })
  @ApiParam({ name: 'id', description: 'The ID of the data' })
  async getNoteById(@Param('id') id: number): Promise<SecretNoteModel> {
    return this.secretNoteService.findOne(id);
  }

  @Get('secret-note/decrypted/:id')
  @ApiOperation({ summary: 'Get one decrypted note by id' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.getOneSecretNoteResponse,
  })
  @ApiParam({ name: 'id', description: 'The ID of the data', type: 'number' })
  async getDecryptedNoteById(
    @Param('id') id: number,
  ): Promise<SecretNoteModel> {
    return this.secretNoteService.findOneDecrypted(id);
  }

  @Put('secret-note/:id')
  @ApiOperation({ summary: 'Update a note with a new note' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.updateSecretNoteResponse,
  })
  @ApiParam({ name: 'id', description: 'The ID of the data', type: 'number' })
  async updateNote(
    @Param('id') id: number,
    @Body() updatedNoteData: CreateSecretNoteDto,
  ): Promise<SecretNoteModel> {
    const { note } = updatedNoteData;
    return this.secretNoteService.update({
      where: { id: Number(id) },
      data: {
        note,
      },
    });
  }

  @Delete('secret-note/:id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.deleteSecretNoteResponse,
  })
  @ApiParam({ name: 'id', description: 'The ID of the data', type: 'number' })
  async deleteNote(@Param('id') id: number): Promise<SecretNoteModel> {
    return this.secretNoteService.remove({ id });
  }
}
