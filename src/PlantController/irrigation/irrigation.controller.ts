import { Irrigation_m } from 'src/PlantController/irrigation/irrigation_manually/irrigation_m.entity';
import { Create_mButtonDto } from './dto/create-mbutton.dto';
import { AuthGuard } from '@nestjs/passport';
import { IrrigationEntity } from './irrigation_basic/irrigation.entity';
import { CreateButtonDto } from './dto/create-button.dto';
import { IrrigationService } from './irrigation_basic/irrigation.service';
import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AccessTokenGuard } from 'src/auth/guard/accessToken.guard';
import { Request } from 'express';
import { Delete, Param, Patch, Put } from '@nestjs/common/decorators';
import { Irrigation_mService } from './irrigation_manually/irrigation_m.service';

@Controller('irrigation')
@UseGuards(AccessTokenGuard)
export class IrrigationController {
    constructor(private irrigationService: IrrigationService,
        private irrigation_mService : Irrigation_mService) { }

    @Get('test')
    test(){
        return this.irrigationService.sendMessage();
    }

    @Post('schedule')
    async startSchedule(): Promise<void> {
        await this.irrigationService.startSchedule();
    }

    @Get()
    getAllButton(
        @Req() req : Request
    ): Promise<IrrigationEntity[]>{
        return this.irrigationService.getAllButtons(req.user);
    }

    @Get('manually')
    getAllManually(
        @Req() req:Request
    ):Promise<Irrigation_m[]>{
        return this.irrigation_mService.getuserAll_m(req.user);
    }

    @Post('manually')
    @UsePipes(ValidationPipe)
    createIrrigation_m(@Body() create_mButtondto:Create_mButtonDto,
    @Req() req:Request):Promise<Irrigation_m>{
        return this.irrigation_mService.createIrrigation_m(create_mButtondto,req.user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createIrrigationButton(@Body() createbuttonDto: CreateButtonDto,
    @Req() req:Request): Promise<IrrigationEntity>{
        return this.irrigationService.createIrrigationButton(createbuttonDto, req.user);
    }

    @Delete(':id')
    deleteIrrigation(@Param('id',ParseIntPipe)id:number):Promise<void>{
        return this.irrigationService.deleteIrrigation(id);
    }

    @Patch(':id')
    update(@Param('id')id:number,@Body()irrigationEntity:IrrigationEntity){
        return this.irrigationService.update(id,irrigationEntity);
    }

    @Patch(':id/manually')
    update_manually(@Param('id')id:number,@Body()irrigation_m:Irrigation_m){
        return this.irrigation_mService.update_manually(id,irrigation_m);
    }
}
