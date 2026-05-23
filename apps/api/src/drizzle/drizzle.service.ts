import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from '@/drizzle/schema'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private pool!: Pool
  db!: NodePgDatabase<typeof schema>

  async onModuleInit() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    })
    this.db = drizzle(this.pool, { schema })
  }

  async onModuleDestroy() {
    await this.pool.end()
  }
}
