import { Create_mButtonDto } from '../dto/create-mbutton.dto';
import { IrrigationEntity } from './irrigation.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from "@nestjs/common";
import { CreateButtonDto } from '../dto/create-button.dto';
import { User } from 'src/auth/user.entity';
import { Irrigation_m } from '../irrigation_manually/irrigation_m.entity';

@Injectable()
export class IrrigationRepository extends Repository<IrrigationEntity>{
    constructor(private dataSource : DataSource){
        super(IrrigationEntity, dataSource.createEntityManager());
    }
    async createIrrigationButton(createbuttonDto:CreateButtonDto, user:{[key : string]:any}): Promise<IrrigationEntity>{
        const user1 = await User.findOneBy({id : user['sub']});
        const {s_hour,s_min,schedule_btn,line_1,line_2,line_3,onoff,
            sun_day,mon_day,tue_day,wed_day,thu_day,fri_day,sat_day,
            set_time,machine_id} = createbuttonDto;

        const irrigationButton = this.create({
            sun_day,mon_day,tue_day,wed_day,thu_day,fri_day,sat_day, //요일
            s_hour,
            s_min,
            schedule_btn,
            line_1,
            line_2,
            line_3,
            onoff,
            set_time,
            machine_id,
            user : user1
        })
        // console.log(irrigationButton)
        await this.save(irrigationButton);
        return irrigationButton;
    }
    
}