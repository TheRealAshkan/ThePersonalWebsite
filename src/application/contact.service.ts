import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/core/utils/pagination';
import { CreateContactDto } from 'src/domain/dtos/contact/create-contact.dto';
import { FilterContactDto } from 'src/domain/dtos/contact/filter-contact.dto';
import { Contact } from 'src/domain/entities/contact.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly userService: UserService,
  ) {}

  async create(createContactDto: CreateContactDto) {

    const sendData = {
      ...createContactDto,
    };

    const contact = await this.contactRepository.create(sendData);
    this.contactRepository.save(contact);
    return contact;
  }

  async findAll(filter: FilterContactDto) {
    const query = this.contactRepository.createQueryBuilder().select('*');

    pagination(query, { ...filter });

    const contacts = await query.execute();

    return contacts.length > 0 ? contacts : false;
  }

  async findOne(contact_id: number) {
    const contact = await this.contactRepository.findOne({
      where: {
        contact_id,
      },
    });

    if (!contact) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }

  async remove(contact_id: number) {
    const contact = await this.contactRepository.delete(contact_id);

    if (contact.affected === 0) {
      throw new HttpException('Contact not found', 404);
    }

    return contact;
  }
}
