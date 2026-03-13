import { getDB } from './client'
type CategoryType = 'expense' | 'income'

type SeedCategory = {
	key: string
	name: string
	type: CategoryType
	icon: string
	color: string
}

const DEFAULT_CATEGORIES: SeedCategory[] = [
	{
		key: 'food',
		name: 'Food',
		type: 'expense',
		icon: 'restaurant',
		color: '#EF4444',
	},
	{
		key: 'transport',
		name: 'Transport',
		type: 'expense',
		icon: 'car',
		color: '#F59E0B',
	},
	{
		key: 'housing',
		name: 'Housing',
		type: 'expense',
		icon: 'home',
		color: '#8B5CF6',
	},
	{
		key: 'salary',
		name: 'Salary',
		type: 'income',
		icon: 'cash',
		color: '#10B981',
	},
]

const UPSERT_CATEGORY_SQL = `
INSERT INTO categories (key, name, type, icon, color, is_system)
VALUES ($key, $name, $type, $icon, $color, 1)
ON CONFLICT(key) DO UPDATE SET
  name = excluded.name,
  type = excluded.type,
  icon = excluded.icon,
  color = excluded.color,
  is_system = 1,
  updated_at = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
`

export async function seedDb(): Promise<void> {
	const db = await getDB()

	await db.withTransactionAsync(async () => {
		for (const category of DEFAULT_CATEGORIES) {
			await db.runAsync(UPSERT_CATEGORY_SQL, {
				$key: category.key,
				$name: category.name,
				$type: category.type,
				$icon: category.icon,
				$color: category.color,
			})
		}

		await db.runAsync(`
INSERT INTO app_meta (key, value)
VALUES ('seed_version', '1')
ON CONFLICT(key) DO UPDATE SET
  value = '1',
  updated_at = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
`)
	})
}
