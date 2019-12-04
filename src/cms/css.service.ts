import { PageCss } from './../entities/pageCss.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CssDto } from './interface/css.dto';

@Injectable()
export class CssService {
  constructor(
    @InjectRepository(PageCss)
    private readonly cssRepository: Repository<PageCss>,
  ) {}

  async findAll(): Promise<PageCss[]> {
    return await this.cssRepository.find();
  }

  async findByName(inputname: string): Promise<PageCss> {
    return await this.cssRepository.findOne({ where: { name: inputname} });
  }

  async findById(inputid: number): Promise<PageCss> {
    return await this.cssRepository.findOne({ where: { id: inputid} });
  }

  async create(cssDto: CssDto): Promise<PageCss> {
    return await this.cssRepository.save(cssDto);
  }

  async update(id: number, cssDto: CssDto): Promise<UpdateResult> {
    return await this.cssRepository.update({ id}, cssDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.cssRepository.delete({ id});
  }
}
