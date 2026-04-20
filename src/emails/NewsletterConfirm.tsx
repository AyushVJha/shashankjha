import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";

export interface NewsletterConfirmProps {
  confirmUrl: string;
  unsubscribeUrl: string;
}

const navy = "#0F1724";
const gold = "#C9A84C";
const muted = "#7C839A";
const border = "#E9E6DE";

export default function NewsletterConfirm({
  confirmUrl,
  unsubscribeUrl,
}: NewsletterConfirmProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your subscription — The Chambers of SSJ</Preview>
      <Body style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#FAF9F6", margin: 0, padding: "32px 0" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", background: "#fff", border: `1px solid ${border}`, borderRadius: 12, padding: "40px 32px" }}>
          <Text style={{ color: gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 3, fontFamily: "Arial, sans-serif", fontWeight: 700, margin: 0 }}>
            The Chambers of SSJ
          </Text>

          <Heading style={{ color: navy, fontSize: 24, fontWeight: 500, margin: "12px 0 0", lineHeight: 1.2 }}>
            Please confirm your subscription
          </Heading>

          <Hr style={{ borderColor: border, margin: "20px 0" }} />

          <Text style={{ color: navy, fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Thank you for subscribing to updates from Advocate Shashank Shekhar Jha. Click the button below to confirm your email address.
          </Text>

          <div style={{ textAlign: "center", margin: "28px 0" }}>
            <Button
              href={confirmUrl}
              style={{
                background: gold,
                color: "#fff",
                padding: "14px 32px",
                borderRadius: 999,
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Confirm Subscription
            </Button>
          </div>

          <Text style={{ color: muted, fontSize: 13, fontFamily: "Arial, sans-serif", margin: 0, wordBreak: "break-all" }}>
            Or copy this link: <Link href={confirmUrl} style={{ color: gold }}>{confirmUrl}</Link>
          </Text>

          <Hr style={{ borderColor: border, margin: "28px 0 12px" }} />

          <Text style={{ color: muted, fontSize: 12, fontFamily: "Arial, sans-serif", margin: 0, lineHeight: 1.6 }}>
            If you didn&rsquo;t sign up, you can safely ignore this email, or{" "}
            <Link href={unsubscribeUrl} style={{ color: muted, textDecoration: "underline" }}>
              unsubscribe
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
