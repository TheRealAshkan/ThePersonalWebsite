import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import uploadFile from 'src/core/decorators/uploadFile';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor() {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @uploadFile('image')
  @UseInterceptors(FileInterceptor('image'))
  uploadAvatar(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return {
      file: file,
    };
  }

  @Get(':key')
  getFile(@Param('key') key: string, @Res() res: Response) {
    try {
      const file = createReadStream(join(process.cwd(), `upload/${key}`));
      file.pipe(res);
    } catch (error) {
      console.log(error)
    }
    
  }
}
