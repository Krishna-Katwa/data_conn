import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import * as bcrypt from 'bcryptjs';

@Entity('Users')
export class UserEntity extends BaseEntity {
  //decorators

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAT: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  //relations
  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profileEntity: ProfileEntity;
}
