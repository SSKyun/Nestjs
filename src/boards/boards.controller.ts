import { connect } from 'node-nats-streaming';
import { AccessTokenGuard } from './../auth/guard/accessToken.guard';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe, UseGuards, Logger, Req } from '@nestjs/common';
import {BoardStatus} from './board-status.enum';
import { Board } from './board.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Request } from 'express';
import { MqttService, Payload } from 'nest-mqtt';
import { Observable } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';

interface IMqttMessage {
    topic:string;
    payload : Buffer;
}

@Controller('boards')
@UseGuards(AccessTokenGuard)
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(private boardsService: BoardsService,
                private mqttService : MqttService) { }

    async onModuleInit() {
        await this.mqttService.subscribe('test');
        this.logger.log('Successfully subscribed to MQTT topic');
        }
    
    @Post('publish')
    async publishMessage(@Body() message: any) {
        await this.mqttService.publish('test', JSON.stringify(message));
        this.logger.log(`Successfully published message: ${JSON.stringify(message)}`);
    }

    @MessagePattern('test')
    handleMessage(message: any) {
        const parsedMessage = JSON.parse(message);
        this.logger.log(`Received message: ${JSON.stringify(parsedMessage)}`);
    }
    
    @Get()
    getAllBoard(
    ): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @Req() req: Request): Promise<Board> {
        // this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)} `)
        return this.boardsService.createBoard(createBoardDto, req.user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id', ParseIntPipe) id,
    // @Req() req : Request
    // ): Promise<void> {
    //     return this.boardsService.deleteBoard(id, req.user);
    // } 해당 유저만 삭제 가능하게.

    @Delete('/:id')
    deleteBoard(@Param('id',ParseIntPipe)id:number):Promise<void> {
        return this.boardsService.deleteBoard2(id);
    }

    @Patch('/:id') //게시글 수정
    update(@Param('id')id:number,@Body()board:Board){
        return this.boardsService.update(id,board);
    }
    

}