import { BoardStatus } from './board-status.enum';
import {BaseEntity,PrimaryGeneratedColumn,Column, Entity, ManyToOne, CreateDateColumn, BeforeUpdate, OneToMany} from "typeorm";
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comments/comment.entity'; 

@Entity()
export class Board extends BaseEntity { 
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({default : "PUBLIC"})
    status: string;

    @Column({nullable : true})
    admin_check : boolean;

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

    @ManyToOne(type => User, user => user.boards, {eager: false})
    user: User;

    @OneToMany(type => Comment,comment => comment.board, {eager: true})
    comments : Comment[]
}