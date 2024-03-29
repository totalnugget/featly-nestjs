import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, OneToMany, Unique, JoinTable, RelationId } from 'typeorm';
import { PageCss } from './pageCss.entity';
import { Page } from './page.entity';

@Entity()
@Unique(['name'])
export class Layout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({type: "text"})
  htmlContent: string;

  @OneToMany(type => Page, page => page.layout)
  @JoinColumn()
  pages: Page[];

  @ManyToMany(type => PageCss, pageCss => pageCss.Layouts)
  @JoinTable()
  css: PageCss[];

  @RelationId((layout: Layout) => layout.css)
  cssIds: number[];
}
