import { Layout } from './layout.entity';

import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, Unique } from 'typeorm';
import { Page } from './page.entity';

@Entity()
@Unique(['name'])
export class PageCss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 10000 })
  content: string;

  @ManyToMany(type => Layout, layout => layout.css)
  Layouts: Layout[];

  @ManyToMany(type => Page, page => page.css)
  pages: Page[];
}
