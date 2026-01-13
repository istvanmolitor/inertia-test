# Database Setup - User Admin

## Probléma

A `/admin/user/user-groups` felület üres, mert a szükséges adatbázis táblák még nem lettek létrehozva.

## Megoldás

### Opció 1: Artisan Migrate (Ajánlott)

Ha működik a PHP, futtasd:

```bash
php artisan migrate
```

### Opció 2: Manuális Tábla Létrehozás

Ha PHP verzió probléma van, futtasd a következő SQL scripteket manuálisan:

```bash
sqlite3 database/database.sqlite << 'EOF'
-- User Groups Table
CREATE TABLE IF NOT EXISTS user_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    is_default INTEGER NOT NULL DEFAULT 0,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT,
    updated_at TEXT
);

-- Permissions Table
CREATE TABLE IF NOT EXISTS permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_at TEXT,
    updated_at TEXT
);

-- User Group Permissions (pivot table)
CREATE TABLE IF NOT EXISTS user_group_permissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_group_id INTEGER NOT NULL,
    permission_id INTEGER NOT NULL,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (user_group_id) REFERENCES user_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Memberships (user - user_group pivot)
CREATE TABLE IF NOT EXISTS memberships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    user_group_id INTEGER NOT NULL,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_group_id) REFERENCES user_groups(id) ON DELETE CASCADE
);
EOF
```

### Opció 3: Teszt Adatok Létrehozása

Miután a táblák létrejöttek, adj hozzá teszt adatokat:

```bash
sqlite3 database/database.sqlite << 'EOF'
-- Insert test user groups
INSERT INTO user_groups (name, description, is_default, created_at, updated_at)
VALUES 
    ('Administrators', 'Full system access', 0, datetime('now'), datetime('now')),
    ('Users', 'Regular users', 1, datetime('now'), datetime('now')),
    ('Moderators', 'Content moderators', 0, datetime('now'), datetime('now'));

-- Insert test permissions
INSERT INTO permissions (name, description, created_at, updated_at)
VALUES 
    ('user.admin', 'Access user administration', datetime('now'), datetime('now')),
    ('user.create', 'Create new users', datetime('now'), datetime('now')),
    ('user.edit', 'Edit users', datetime('now'), datetime('now')),
    ('user.delete', 'Delete users', datetime('now'), datetime('now'));

-- Assign permissions to Administrators group (id=1)
INSERT INTO user_group_permissions (user_group_id, permission_id, created_at, updated_at)
VALUES 
    (1, 1, datetime('now'), datetime('now')),
    (1, 2, datetime('now'), datetime('now')),
    (1, 3, datetime('now'), datetime('now')),
    (1, 4, datetime('now'), datetime('now'));
EOF
```

## Ellenőrzés

Táblák listázása:

```bash
sqlite3 database/database.sqlite ".tables"
```

User groups számának ellenőrzése:

```bash
sqlite3 database/database.sqlite "SELECT COUNT(*) FROM user_groups;"
```

Összes user group listázása:

```bash
sqlite3 database/database.sqlite "SELECT * FROM user_groups;"
```

## Következő Lépések

1. Futtasd le a megfelelő opciót a fentiek közül
2. Frissítsd az oldalt a böngészőben: `/admin/user/user-groups`
3. Most már látnod kellene a user groups listát!

## Alternatíva: PHP Artisan használata Docker-rel

Ha a helyi PHP verzió nem megfelelő:

```bash
docker run --rm -v $(pwd):/app -w /app php:8.4-cli php artisan migrate
```

