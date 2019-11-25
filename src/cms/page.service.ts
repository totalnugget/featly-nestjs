import { Layout } from './../entities/layout.entity';
import { Page } from './../entities/page.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PageCss } from '../entities/pageCss.entity';
import { PageDto } from './interface/page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
    @InjectRepository(PageCss)
    private readonly cssRepository: Repository<PageCss>,
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,
  ) {}

  async findAll(): Promise<Page[]> {
    return await this.pageRepository.find();
  }

  async findByName(inputname: string): Promise<Page> {
    return await this.pageRepository.findOne({ where: { name: inputname}, relations: ['css'] });
  }

  async findByUrl(url: string): Promise<Page> {
    return await this.pageRepository.findOne({ where: { url: url}, relations: ['css', 'layout', 'layout.css'] });
  }

  async findById(id: number): Promise<Page> {
    return await this.pageRepository.findOne({ where: { id: id}, relations: ['css', 'layout', 'layout.css'] });
  }

  async create(pageDto: PageDto): Promise<Page> {

    const cssPages = await Promise.all(pageDto.cssIds.map(async (cssId) => {
      return await this.cssRepository.findOne({where: {id: cssId}});
    }));

    const layoutPage: Layout = await this.layoutRepository.findOne({where: {id: pageDto.layoutId}});

    const { layoutId, cssIds, ...page } = {...pageDto , layoutPage, cssPages};

    return await this.pageRepository.save(page);
  }

  async update(id: number, pageDto: PageDto): Promise<Page> {

    const newPage: Page = await this.pageRepository.findOne({where: { id}});
    newPage.css = await Promise.all(pageDto.cssIds.map(async (cssId) => {
      return await this.cssRepository.findOne({where: {id: cssId}});
    }));

    newPage.htmlContent = pageDto.htmlContent;
    newPage.layout = await this.layoutRepository.findOne({where: {id: pageDto.layoutId}});
    newPage.name = pageDto.name;
    newPage.url = pageDto.url;

    return await this.pageRepository.save(newPage);

    //// return await this.pageRepository.update({ name: inputname}, pageCss);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.pageRepository.delete({ id });
  }
}
