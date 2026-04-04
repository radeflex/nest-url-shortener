import { IsInt, IsOptional, IsUrl, Max, Min } from "class-validator";

export class UrlCreateDto {
    @IsUrl()
    url: string;

    @IsInt()
    @IsOptional()
    @Min(5)
    @Max(32)
    size?: number;

    constructor(url: string, size?: number) {
        this.url = url; 
        this.size = size;
    }
}