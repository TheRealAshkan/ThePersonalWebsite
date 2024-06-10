import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from 'src/domain/entities/setting.entity';
import { SetSettingDto } from 'src/domain/dtos/setting/set-setting.dto';
@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
  ) {}

  async findAll() {
    const query = this.settingRepository.createQueryBuilder().select('*');

    const setting = await query.execute();

    return setting.length > 0 ? setting : false;
  }

  async findOneByKey(key: string) {
    const setting = await this.settingRepository.findOne({
        where: {
            key,
        },
    });
    
    return setting;
  }
  
  async editSetting(setSetting: Array<SetSettingDto> = []) {
    console.log(setSetting)
    console.log(setSetting.length)
    if(setSetting.length == 0 || setSetting.length == undefined) {
      throw new HttpException('FormData Not empty', 400);
    }
    // await this.settingRepository.clear();
    await Promise.all(setSetting.map(async (item, index) => {
      
      const setting = await this.settingRepository.findOne({
          where: {
            key: item.key,
          },
      });

      if(setting) {
        await this.settingRepository.update(
          setting.setting_id,
          { value: item.value },
        );
      } else {
        await this.create(item);
      }
    }))
    
    
    return {
      success: 'saved form'
    }
  }


  async setByKey(setSetting: SetSettingDto) {
    console.log(setSetting);
    const setting = await this.settingRepository.findOne({
        where: {
          key: setSetting.key,
        },
    });
    
    if(setting) {
      return await this.settingRepository.update(
        setting.setting_id,
        { value: setSetting.value },
      );
    } else {
      return await this.create(setSetting);
    }
  }

  async create(setSetting: SetSettingDto) {
    const sendData = {
      ...setSetting,
    };
    const setting = await this.settingRepository.create(sendData);
    this.settingRepository.save(setting);
    return setting;
  }
}

