import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uniqueIndex,
  smallint,
  varchar,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 254 }).notNull(),
    password: text("password").notNull(),
  },
  ({ email }) => ({
    emailIdx: uniqueIndex("email_idx").on(email),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  profiles: many(profiles),
  usersToRoles: many(usersToRoles),
}));

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  sex: smallint("sex").notNull(),
  userId: integer("user_id"),
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

export const roles = pgTable(
  "roles",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 20 }).notNull(),
  },
  ({ name }) => ({
    nameIdx: uniqueIndex("name_idx").on(name),
  })
);

export const rolesRelations = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

export const usersToRoles = pgTable(
  "users_to_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.roleId),
  })
);

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.roleId],
    references: [roles.id],
  }),
}));
