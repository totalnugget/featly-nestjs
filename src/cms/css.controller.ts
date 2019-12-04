import { Controller, UseGuards, Get, Request, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CssService } from './css.service';
import { PageCss } from '../entities/pageCss.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { debug, debuglog } from 'util';
import { CssDto } from './interface/css.dto';

@Controller('css')
export class CssController {
    constructor(private readonly authService: AuthService,
                private readonly cssService: CssService,
        ) {}

    @Get('get')
    async findAll(): Promise<PageCss[]> {
        return await this.cssService.findAll();
    }

    @Get('get/:name')
    async findByName(@Param('name') name: string): Promise<PageCss> {
        return await this.cssService.findByName(name);
    }

    @Get('get/id/:id')
    async findById(@Param('id') id: number): Promise<PageCss> {
        return await this.cssService.findById(id);
    }

    @Post('create')
    async create(@Body() cssDto: CssDto): Promise<PageCss> {
        return await this.cssService.create(cssDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() cssDto: CssDto): Promise<UpdateResult> {
        return await this.cssService.update(Number(id), cssDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return await this.cssService.delete(Number(id));
    }
}
