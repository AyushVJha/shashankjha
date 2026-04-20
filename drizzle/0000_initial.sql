CREATE TYPE "public"."submission_status" AS ENUM('received', 'read', 'replied', 'spam');--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"purpose" text NOT NULL,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"ip" text,
	"user_agent" text,
	"status" "submission_status" DEFAULT 'received' NOT NULL,
	"email_message_id" text,
	"request_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter_subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"confirmed" boolean DEFAULT false NOT NULL,
	"confirm_token" text NOT NULL,
	"unsubscribe_token" text NOT NULL,
	"confirmed_at" timestamp with time zone,
	"unsubscribed_at" timestamp with time zone,
	"source" text DEFAULT 'footer' NOT NULL,
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "contact_submissions_request_id_idx" ON "contact_submissions" USING btree ("request_id");--> statement-breakpoint
CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "newsletter_confirm_token_idx" ON "newsletter_subscribers" USING btree ("confirm_token");--> statement-breakpoint
CREATE INDEX "newsletter_unsubscribe_token_idx" ON "newsletter_subscribers" USING btree ("unsubscribe_token");