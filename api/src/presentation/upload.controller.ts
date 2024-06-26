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
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import sharp from 'sharp';
import uploadFile from 'src/core/decorators/uploadFile';

@Controller('upload')
@ApiTags('upload')
export class UploadController {
  constructor() {}

  // @Post('image')
  // @ApiConsumes('multipart/form-data')
  // @uploadFile('image')
  // @UseInterceptors(FileInterceptor('image'))
  // uploadAvatar(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({ maxSize: 50000 }),
  //         new FileTypeValidator({ fileType: 'image/jpeg' }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     file: file,
  //   };
  // }

  @Get(':key')
  getFile(@Param('key') key: string, @Res() res: Response) {
    try {
      if(key =='' || key == undefined || key =='undefined') {
        return false
      }
      const file = createReadStream(join(process.cwd(), `upload/${key}`));
      file.pipe(res);
    } catch (error) {
      console.log(error)
    }
    
  }


  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new BadRequestException('Only JPG and PNG files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return {
        originalname: file.originalname,
        filename: file.filename,
        path: file.path
      };
    } catch (error) {
      throw new BadRequestException('Invalid image file');
    }
  }

}
