import { getDB } from './client'

type Migration = {
	name: string
	sql: string
}

const ENSURE_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS schema_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
`

const MIGRATIONS: Migration[] = [
	{
		name: '0001_init.sql',
		sql: `
-- Core tables
CREATE TABLE IF NOT EXISTS schema_migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('expense', 'income')),
  icon TEXT,
  color TEXT,
  is_system INTEGER NOT NULL DEFAULT 1 CHECK (is_system IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  note TEXT,
  occurred_at TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);
`,
	},
	{
		name: '0002_indexes.sql',
		sql: `
CREATE INDEX IF NOT EXISTS idx_transactions_occurred_at
ON transactions (occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_category_id
ON transactions (category_id);

CREATE INDEX IF NOT EXISTS idx_categories_type
ON categories (type);
`,
	},
]

export async function migrateDb(): Promise<void> {
	const db = await getDB()

	await db.execAsync(ENSURE_MIGRATIONS_TABLE_SQL)

	const appliedRows = await db.getAllAsync<{ name: string }>(
		'SELECT name FROM schema_migrations',
	)
	const applied = new Set(appliedRows.map((row) => row.name))

	for (const migration of MIGRATIONS) {
		if (applied.has(migration.name)) continue

		await db.withTransactionAsync(async () => {
			await db.execAsync(migration.sql)
			await db.runAsync(
				'INSERT INTO schema_migrations (name) VALUES (?)',
				migration.name,
			)
		})
	}
}
