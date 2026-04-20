import { env } from "./env";

export const CONTACT_RECIPIENT = env.CONTACT_EMAIL;

export const FROM_ADDRESS = `The Chambers of SSJ <${env.RESEND_FROM_EMAIL}>`;
