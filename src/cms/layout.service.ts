import { Layout } from './../entities/layout.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PageCss } from '../entities/pageCss.entity';
import { LayoutDto } from './interface/layout.dto';

@Injectable()
export class LayoutService {
  constructor(
    @InjectRepository(PageCss)
    private readonly cssRepository: Repository<PageCss>,
    @InjectRepository(Layout)
    private readonly layoutRepository: Repository<Layout>,
  ) {}

  async findAll(): Promise<Layout[]> {
    return await this.layoutRepository.find();
  }

  async findByName(inputname: string): Promise<Layout> {
    return await this.layoutRepository.findOne({ where: { name: inputname}, relations: ['css'] });
  }

  async findById(inputid: number): Promise<Layout> {
    return await this.layoutRepository.findOne({ where: { id: inputid}, relations: ['css'] });
  }

  async create(layoutDto: LayoutDto): Promise<Layout> {

    const cssPages = await Promise.all(layoutDto.cssIds.map(async (cssId) => {
      return await this.cssRepository.findOne({where: {id: cssId}});
    }));

    if(!layoutDto.htmlContent) layoutDto.htmlContent = "";

    const { cssIds, ...layout } = {...layoutDto , cssPages};

    

    return await this.layoutRepository.save(layout);
  }

  async update(id: number, layoutDto: LayoutDto): Promise<Layout> {

    const newLayout: Layout = await this.layoutRepository.findOne({where: { id}});
    
    if(layoutDto.cssIds)
    {
      newLayout.css = await Promise.all(layoutDto.cssIds.map(async (cssId) => {
      return await this.cssRepository.findOne({where: {id: cssId}});
      }));
    }
    

    if(layoutDto.htmlContent) newLayout.htmlContent = layoutDto.htmlContent;
    if(newLayout.name) newLayout.name = layoutDto.name;

    return await this.layoutRepository.save(newLayout);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.layoutRepository.delete({ id });
  }
}
