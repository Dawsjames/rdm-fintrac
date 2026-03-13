CREATE INDEX IF NOT EXISTS idx_transactions_occurred_at
ON transactions (occurred_at DESC);

CREATE INDEX IF NOT EXISTS idx_transactions_category_id
ON transactions (category_id);

CREATE INDEX IF NOT EXISTS idx_categories_type
ON categories (type);
