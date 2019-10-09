import { Controller, UseGuards, Get, Request, Param, Post, Body, Logger, Put, Delete } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult, UpdateResult } from 'typeorm';
import { debug, debuglog } from 'util';
import { LayoutService } from './layout.service';
import { Layout } from '../entities/layout.entity';
import { LayoutDto } from './interface/layout.dto';

@Controller('layout')
export class LayoutController {
    constructor(private readonly authService: AuthService,
                private readonly layoutService: LayoutService,
        ) {}

    @Get('get')
    async findAll(): Promise<Layout[]> {
        return await this.layoutService.findAll();
    }

    @Get('get/:name')
    async findByName(@Param('name') name: string): Promise<Layout> {
        return await this.layoutService.findByName(name);
    }

    @Post('create')
    async create(@Body() layoutDto: LayoutDto): Promise<Layout> {
        return await this.layoutService.create(layoutDto);
    }

    @Put('update/:id')
    async update(@Param('id') id: number, @Body() layoutDto: LayoutDto): Promise<Layout> {
        return await this.layoutService.update(Number(id), layoutDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<DeleteResult> {
        return await this.layoutService.delete(Number(id));
    }
}
