import { Controller, UseGuards, Get, Request, Param, Post, Body, Put, Delete, All, Req } from '@nestjs/common';
import { CssService } from './../cms/css.service';
import { PageCss } from '../entities/pageCss.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { debug, debuglog } from 'util';
import { PATH_METADATA } from '@nestjs/common/constants';
import { PageService } from './../cms/page.service';
import { LayoutService } from './../cms/layout.service';

@Controller()
export class SiteController {
    constructor(
        private readonly cssService: CssService,
        private readonly pageService: PageService,
        private readonly layoutService: LayoutService,
        ) {}

    @All()
    async findAll(@Req() req: Request): Promise<string> {

        let page = await this.pageService.findByUrl(req.url);
        console.log(page);
        if(!page)
        {
            return "404";
        }
        
        let html = page.layout.htmlContent;

        let addedCssIds : number[] = [];

        page.css.forEach(csspage => {
            let pos = html.search("</head>");
            html = [html.slice(0, pos),"<style>", csspage.content,"</style>", html.slice(pos)].join('');
            addedCssIds.push(csspage.id);
        });

        page.layout.css.forEach(csspage => {

            if(addedCssIds.includes(csspage.id))
            {
                return;
            }

            let pos = html.search("</head>");
            html = [html.slice(0, pos),"<style>", csspage.content,"</style>", html.slice(pos)].join('');
        });

        html = html.replace("<router-outlet>", page.htmlContent)

        return html
    }

}
