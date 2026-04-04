import { Module} from "@nestjs/common";
import { Pool } from "pg"

@Module({
    providers: [
        {
            provide: 'PG_POOL',
            useValue: new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'postgres',
                password: '38913891',
                port: 5432,
            }),
        },
    ],
    exports: ['PG_POOL']
})
export class DBModule {}