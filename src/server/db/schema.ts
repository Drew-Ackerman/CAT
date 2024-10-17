import { relations, sql } from "drizzle-orm";
import { index, int, integer, primaryKey, real, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `stg-cypress-project_${name}`);

export const users = createTable("user", {
  id: int("id").notNull().primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("email_verified", {
    mode: "timestamp",
  }).default(sql`(unixepoch())`),
  image: text("image", { length: 255 }),
  role: text("role").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  cats: many(cats),
  notes: many(notes),
}));

export const accounts = createTable(
  "account",
  {
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));


export const cats = createTable("cat", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  tag: text("tag", { length: 15 }).notNull().unique(),
  color: text("color", { length: 15 }),
  sex: integer("sex", { mode: "boolean" }),
  researcherId: int("researcherId").references(() => users.id),
});

export const catRelations = relations(cats, ({ many, one }) => ({
  notes: many(notes),
  researcher: one(users, {
    fields: [cats.researcherId],
    references: [users.id],
    relationName: "researcher",
  }),
}));

export const notes = createTable("notes", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  text: text("text", { length: 1000 }).notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  temperament: real("temperament").notNull().default(5.0),
  radioactivity: int("radioactivity").notNull().default(3),
  catId: int("catId").references(() => cats.id),
  researcherId: int("researcherId").references(() => users.id),
});

export const notesRelations = relations(notes, ({ one }) => ({
  cat: one(cats, {
    fields: [notes.catId],
    references: [cats.id],
    relationName: "cats",
  }),
  researcher: one(users, {
    fields: [notes.researcherId],
    references: [users.id],
    relationName: "notes",
  }),
}));
