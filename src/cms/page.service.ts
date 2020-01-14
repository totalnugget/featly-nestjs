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
    return await this.pageRepository.findOne({ where: { name: inputname}});
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

    const layout: Layout = await this.layoutRepository.findOne({where: {id: pageDto.layoutId}});
    //TODO: use layout id
    const { layoutId, cssIds, ...page } = {...pageDto , layout, cssPages};

    if(!pageDto.htmlContent) page.htmlContent = "<p>" + page.name + "works </p>";
    return await this.pageRepository.save(page);
  }

  async update(id: number, pageDto: PageDto): Promise<Page> {

    const newPage: Page = await this.pageRepository.findOne({where: { id}});
    if(pageDto.cssIds) newPage.css = await Promise.all(pageDto.cssIds.map(async (cssId) => {
      return await this.cssRepository.findOne({where: {id: cssId}});
    }));

    if(pageDto.htmlContent) newPage.htmlContent = pageDto.htmlContent;
    if(pageDto.layoutId) newPage.layout = await this.layoutRepository.findOne({where: {id: pageDto.layoutId}});
    if(pageDto.name) newPage.name = pageDto.name;
    if(pageDto.url) newPage.url = pageDto.url;

    return await this.pageRepository.save(newPage);

    //// return await this.pageRepository.update({ name: inputname}, pageCss);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.pageRepository.delete({ id });
  }
}
