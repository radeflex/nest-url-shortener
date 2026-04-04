import { Injectable} from "@nestjs/common";
import { randomInt } from "crypto";
import { UrlCreateDto } from "src/dto/url-create.dto";
import { UrlRepository } from "src/repository/url.repository";

@Injectable()
export class UrlService {
    private DEFAULT_SIZE: number = 10;
    
    constructor(private readonly repo: UrlRepository) {}

    async create(dto: UrlCreateDto): Promise<string> {
        const size: number = dto.size ?? this.DEFAULT_SIZE;
        let alias = await this.repo.findAliasByUrl(dto.url);
        if (!alias) {
            alias = this.genAlias(size);
            await this.repo.create(dto.url, alias);
        }
        return alias;
    }

    async findUrl(url: string): Promise<string | null> {
        return await this.repo.findUrlByAlias(url);
    }

    private genAlias(size: number): string {
        let alias = "";
        for (let i = 0; i < size; ++i) {
            alias += String.fromCharCode(65 + randomInt(12));
        }
        return alias;
    }
}