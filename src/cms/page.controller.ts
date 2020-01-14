import { Controller, UseGuards, Get, Request, Param, Post, Body, Logger, Put, Delete } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Page } from '../entities/page.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { debug, debuglog } from 'util';
import { PageService } from './page.service';
import { PageDto } from './interface/page.dto';

@Controller('page')
@UseGuards(AuthGuard('jwt'))
export class PageController {
    constructor(private readonly authService: AuthService,
                private readonly pageService: PageService,
        ) {}

    @Get('get')
    async findAll(): Promise<Page[]> {
        return await this.pageService.findAll();
    }

    @Get('get/:name')
    async findByName(@Param('name') name: string): Promise<Page> {
        return await this.pageService.findByName(name);
    }

    @Get('get/id/:id')
    async findById(@Param('id') id: number): Promise<Page> {
        return await this.pageService.findById(id);
    }

    @Post('create')
    async create(@Body() pageDto: PageDto): Promise<Page> {
        return await this.pageService.create(pageDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() pageDto: PageDto): Promise<Page> {
        return await this.pageService.update(Number(id), pageDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return await this.pageService.delete(Number(id));
    }
}
