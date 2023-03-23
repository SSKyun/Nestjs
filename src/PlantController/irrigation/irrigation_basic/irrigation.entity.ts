import {BaseEntity,PrimaryGeneratedColumn,Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeUpdate} from "typeorm";
import { User } from 'src/auth/user.entity';

@Entity()
export class IrrigationEntity extends BaseEntity { 
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    sun_day : Boolean

    @Column()
    mon_day : Boolean

    @Column()
    tue_day : Boolean

    @Column()
    wed_day : Boolean

    @Column()
    thu_day : Boolean

    @Column()
    fri_day : Boolean

    @Column()
    sat_day : Boolean

    @Column()
    s_hour : string;
    
    @Column()
    s_min : string;

    @Column({ default : false})
    schedule_btn : Boolean;

    @Column({ default : false})
    line_1 : Boolean;

    @Column({ default : false})
    line_2 : Boolean;

    @Column({ default : false})
    line_3 : Boolean;

    @Column({ default : false})
    onoff : Boolean;

    @CreateDateColumn()
    createDate : Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    async save(): Promise<this> {
        this.updatedAt = new Date();
        return super.save();
    }

    @Column({default : 0})
    Count : number;

    @Column()
    set_time : number;

    @Column({type:'int', nullable : true})
    accumulated_time:number;
    
    @ManyToOne(type=>User, user=>user.irrigations,{eager : false})
    user: User;
}