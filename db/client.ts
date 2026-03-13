import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite'

let dbPromise: Promise<SQLiteDatabase> | null = null

export async function getDB(): Promise<SQLiteDatabase> {
	if (!dbPromise) {
		dbPromise = (async () => {
			const db = await openDatabaseAsync('rdm-fintrac.db')
			await db.execAsync('PRAGMA foreign_keys = ON')
			return db
		})()
	}
	return dbPromise
}
 