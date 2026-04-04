import { Body, Controller, Get, HttpCode, HttpRedirectResponse, NotFoundException, Param, Post, Redirect} from "@nestjs/common";
import { AliasResponse } from "src/dto/alias-response.dto";
import { UrlCreateDto } from "src/dto/url-create.dto";
import { UrlService } from "src/service/url.service";

@Controller()
export class UrlController {
    constructor(private readonly service: UrlService) {}

    @Get(":alias")
    @Redirect()
    async findUrl(@Param("alias") alias: string): Promise<HttpRedirectResponse> {
        let url = await this.service.findUrl(alias);
        if (!url) throw new NotFoundException();
        return {url, statusCode: 301};
    }

    @Post()
    @HttpCode(202)
    async create(@Body() dto: UrlCreateDto) {
        var alias = await this.service.create(dto);
        return new AliasResponse('/' + alias);
    }
}