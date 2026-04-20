import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

export const submissionStatus = pgEnum("submission_status", [
  "received",
  "read",
  "replied",
  "spam",
]);

export const contactSubmissions = pgTable(
  "contact_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    purpose: text("purpose").notNull(),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    status: submissionStatus("status").default("received").notNull(),
    emailMessageId: text("email_message_id"),
    requestId: text("request_id").notNull(),
  },
  (t) => [
    index("contact_submissions_request_id_idx").on(t.requestId),
    index("contact_submissions_created_at_idx").on(t.createdAt),
    index("contact_submissions_status_idx").on(t.status),
  ]
);

export const newsletterSubscribers = pgTable(
  "newsletter_subscribers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    confirmed: boolean("confirmed").default(false).notNull(),
    confirmToken: text("confirm_token").notNull(),
    unsubscribeToken: text("unsubscribe_token").notNull(),
    confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    source: text("source").default("footer").notNull(),
  },
  (t) => [
    index("newsletter_confirm_token_idx").on(t.confirmToken),
    index("newsletter_unsubscribe_token_idx").on(t.unsubscribeToken),
  ]
);

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type NewNewsletterSubscriber = typeof newsletterSubscribers.$inferInsert;
