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
import { EncryptionService } from '../common/helpers/transform-objects';
import * as apiResponseDocs from './swagger-docs/secret-note';
import { CreateSecretNoteDto, PaginationDto } from './dto/secret-note-dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { ISecretNoteExposed, ISecretNoteMetaData } from './secret-note.types';

@Controller()
@ApiTags('Secret Notes')
@ApiBearerAuth('apiKey')
@ApiResponse({ status: 403, schema: apiResponseDocs.forbiddenResponse })
@ApiResponse({ status: 400, schema: apiResponseDocs.invalidDataResponse })
export class SecretNotesController {
  constructor(
    private readonly secretNoteService: NotesService,
    // Setups Pino logger context
    @InjectPinoLogger('secret-notes-controller')
    private readonly logger: PinoLogger,
    private readonly encryptionService: EncryptionService,
  ) {}

  @Post('secret-note')
  @ApiOperation({ summary: 'Create a secret note' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.createSecretNoteResponse,
  })
  async createNote(
    @Body() createSecretNoteDto: CreateSecretNoteDto,
  ): Promise<ISecretNoteMetaData> {
    const { note } = createSecretNoteDto;
    this.logger.info({ message: 'creating a note' });
    const { encryptedData, encryptionIV } =
      this.encryptionService.encryptData(note);

    return this.secretNoteService.create({
      note: encryptedData,
      encryptionIv: encryptionIV,
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
  ): Promise<ISecretNoteMetaData[]> {
    const { page, limit } = paginationDto;
    this.logger.info({ message: 'getting all notes', page, limit });
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
  async getNoteById(@Param('id') id: number): Promise<ISecretNoteExposed> {
    this.logger.info({ message: 'finding note by id', id });
    const data = await this.secretNoteService.findOne(id);
    return { id: data.id, note: data.note, createdAt: data.createdAt };
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
  ): Promise<ISecretNoteExposed> {
    this.logger.info({ message: 'finding decrypted note by id', id });
    const storedNote = await this.secretNoteService.findOne(id);
    const decryptedNote = this.encryptionService.decryptData(
      storedNote.note,
      storedNote.encryptionIv,
    );

    return {
      id: storedNote.id,
      note: decryptedNote,
      createdAt: storedNote.createdAt,
    };
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
  ) {
    const { note } = updatedNoteData;
    const { encryptedData, encryptionIV } =
      this.encryptionService.encryptData(note);

    return this.secretNoteService.update({
      where: { id },
      data: { note: encryptedData, encryptionIv: encryptionIV },
    });
  }

  @Delete('secret-note/:id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: 200,
    schema: apiResponseDocs.deleteSecretNoteResponse,
  })
  @ApiParam({ name: 'id', description: 'The ID of the data', type: 'number' })
  async deleteNote(@Param('id') id: number): Promise<{ message: string }> {
    this.logger.info({ message: 'deleting note', id });
    await this.secretNoteService.remove({ id });
    return { message: 'Note deleted' };
  }
}
