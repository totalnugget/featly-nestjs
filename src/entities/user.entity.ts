
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  hash: string;

  // @OneToOne(type => Photo, photo => photo.user)
  // @JoinColumn()
  // photo: Photo;
}
