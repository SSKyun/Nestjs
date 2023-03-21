import { IsNotEmpty } from 'class-validator';

export class CreatePesticideDto {
    
    @IsNotEmpty()
    sun_day : Boolean

    @IsNotEmpty()
    mon_day : Boolean

    @IsNotEmpty()
    tue_day : Boolean

    @IsNotEmpty()
    wed_day : Boolean

    @IsNotEmpty()
    thu_day : Boolean

    @IsNotEmpty()
    fri_day : Boolean

    @IsNotEmpty()
    sat_day : Boolean

    @IsNotEmpty()
    s_hour : number;
    
    @IsNotEmpty()
    s_min : number;

    @IsNotEmpty()
    schedule_btn : Boolean;

    @IsNotEmpty()
    manually_btn : Boolean;

    @IsNotEmpty()
    onoff_manually : Boolean;

    @IsNotEmpty()
    line_1 : Boolean;

    @IsNotEmpty()
    line_2 : Boolean;

    @IsNotEmpty()
    line_3 : Boolean;

    @IsNotEmpty()
    onoff : Boolean;

    @IsNotEmpty()
    set_time : number;

    @IsNotEmpty()
    manually_time : number;
}