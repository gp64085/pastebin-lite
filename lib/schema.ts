import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const pastes = pgTable("pastes", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  expiresAt: timestamp("expires_at"),
  remainingViews: integer("remaining_views"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
