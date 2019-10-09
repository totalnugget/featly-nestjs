import { Layout } from './layout.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, Unique, JoinTable } from 'typeorm';
import { PageCss } from './pageCss.entity';

@Entity()
@Unique(['name'])
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 10000 })
  htmlContent: string;

  @Column({ length: 64 })
  url: string;

  @ManyToOne(type => Layout, layout => layout.pages)
  @JoinColumn()
  layout: Layout;

  @ManyToMany(type => PageCss, pageCss => pageCss.pages)
  @JoinTable()
  css: PageCss[];
}
