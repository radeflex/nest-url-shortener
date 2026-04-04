import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";

@Injectable()
export class UrlRepository {
    constructor(@Inject('PG_POOL') private pool: Pool) {}

    async findUrlByAlias(alias: string): Promise<string | null>{
        const result = await this.pool.query(
            'SELECT url FROM aliases WHERE alias = $1', [alias]);
        return result.rows[0]?.url ?? null;
    }

    async findAliasByUrl(url: string): Promise<string | null> {
        const result = await this.pool.query(
            'SELECT alias FROM aliases WHERE url = $1', [url]);
        return result.rows[0]?.alias ?? null;
    }

    async create(url: string, alias: string) {
        await this.pool.query(
            'INSERT INTO aliases(url, alias) VALUES($1, $2)', [url, alias]);      
    }

    async delete(url: string): Promise<boolean> {
        let result = await this.pool.query(
            'DELETE FROM aliases WHERE url = $1', [url]);
        return (result.rowCount ?? 0) > 0;
    }
}