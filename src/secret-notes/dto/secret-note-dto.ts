import { IsNotEmpty, IsString, IsOptional, Min, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSecretNoteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, default: 'This is a super duper note' })
  note: string;
}

export class UpdateSecretNoteDto {
  @IsString()
  @IsNotEmpty()
  note: string;
}

export class PaginationDto {
  @IsOptional()
  @Min(1)
  @ApiProperty({ required: false, default: 1, minimum: 1 })
  page: number = 1;

  @IsOptional()
  @Min(1)
  @ApiProperty({ required: false, default: 10, minimum: 1 })
  limit: number = 10;
}

export class IdDto {
  @IsInt()
  @Min(1)
  @ApiProperty({ type: 'number', required: true })
  id: number;
}
