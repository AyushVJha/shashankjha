import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export interface ContactAcknowledgementProps {
  name: string;
  purpose: string;
  subject: string;
  requestId: string;
}

const navy = "#0F1724";
const gold = "#C9A84C";
const muted = "#7C839A";
const border = "#E9E6DE";

export default function ContactAcknowledgement({
  name,
  purpose,
  subject,
  requestId,
}: ContactAcknowledgementProps) {
  return (
    <Html>
      <Head />
      <Preview>We&rsquo;ve received your message — The Chambers of SSJ</Preview>
      <Body style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "#FAF9F6", margin: 0, padding: "32px 0" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", background: "#fff", border: `1px solid ${border}`, borderRadius: 12, padding: "40px 32px" }}>
          <Text style={{ color: gold, fontSize: 11, textTransform: "uppercase", letterSpacing: 3, fontFamily: "Arial, sans-serif", fontWeight: 700, margin: 0 }}>
            The Chambers of SSJ
          </Text>

          <Heading style={{ color: navy, fontSize: 26, fontWeight: 500, margin: "12px 0 0", lineHeight: 1.2 }}>
            Thank you for reaching out, {name}.
          </Heading>

          <Hr style={{ borderColor: border, margin: "24px 0" }} />

          <Text style={{ color: navy, fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            We&rsquo;ve received your {purpose.toLowerCase()} regarding &ldquo;{subject}&rdquo; and it is now with our team.
          </Text>

          <Text style={{ color: navy, fontSize: 16, lineHeight: 1.7, margin: "16px 0 0" }}>
            You can expect a response within <strong>2&ndash;3 business days</strong>. For time-sensitive legal matters, please mention urgency in a follow-up reply.
          </Text>

          <Text style={{ color: navy, fontSize: 16, lineHeight: 1.7, margin: "16px 0 0" }}>
            This is an automated acknowledgement. You do not need to take any further action — Advocate Shashank Shekhar Jha or a member of his team will be in touch personally.
          </Text>

          <Hr style={{ borderColor: border, margin: "32px 0 16px" }} />

          <Text style={{ color: muted, fontSize: 13, fontFamily: "Arial, sans-serif", margin: 0, lineHeight: 1.6 }}>
            Warm regards,<br />
            <span style={{ color: navy, fontWeight: 600 }}>The Chambers of SSJ</span><br />
            A-57, 2nd Floor, Amar Colony, Lajpat Nagar IV, New Delhi 110024
          </Text>

          <Text style={{ color: muted, fontSize: 11, fontFamily: "Arial, sans-serif", margin: "20px 0 0" }}>
            Reference: {requestId}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
