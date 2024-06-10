import { ApiBody } from '@nestjs/swagger';

const uploadFile =
  (filename: string = 'file'): MethodDecorator =>
  (target: any, propertyKey, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [filename]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };

export default uploadFile;
