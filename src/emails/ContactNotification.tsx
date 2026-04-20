import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  subject: string;
  message: string;
  timestampIST: string;
  ip: string;
  userAgent: string;
  requestId: string;
}

const navy = "#0F1724";
const gold = "#C9A84C";
const muted = "#7C839A";
const border = "#E9E6DE";

export default function ContactNotification(props: ContactNotificationProps) {
  const {
    name,
    email,
    phone,
    purpose,
    subject,
    message,
    timestampIST,
    ip,
    userAgent,
    requestId,
  } = props;

  return (
    <Html>
      <Head />
      <Preview>{`New ${purpose} — ${name}: ${subject}`}</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", background: "#FAF9F6", margin: 0, padding: "32px 0" }}>
        <Container style={{ maxWidth: 640, margin: "0 auto", background: "#fff", border: `1px solid ${border}`, borderRadius: 12, padding: 32 }}>
          <Heading style={{ color: navy, fontSize: 22, margin: 0 }}>
            New contact form submission
          </Heading>
          <Text style={{ color: muted, fontSize: 13, marginTop: 4 }}>
            Received {timestampIST}
          </Text>
          <Hr style={{ borderColor: border, margin: "20px 0" }} />

          <Section>
            <Field label="Purpose" value={purpose} highlight />
            <Field label="Name" value={name} />
            <Field label="Email" value={email} />
            <Field label="Phone" value={phone || "—"} />
            <Field label="Subject" value={subject} />
          </Section>

          <Hr style={{ borderColor: border, margin: "20px 0" }} />

          <Heading as="h3" style={{ color: navy, fontSize: 15, margin: "0 0 12px" }}>
            Message
          </Heading>
          <Text
            style={{
              color: navy,
              fontSize: 15,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              background: "#FAF9F6",
              border: `1px solid ${border}`,
              borderRadius: 8,
              padding: 16,
              margin: 0,
            }}
          >
            {message}
          </Text>

          <Hr style={{ borderColor: border, margin: "24px 0 12px" }} />

          <Text style={{ color: muted, fontSize: 12, margin: 0 }}>
            Request ID: <span style={{ color: navy }}>{requestId}</span>
          </Text>
          <Text style={{ color: muted, fontSize: 12, margin: "4px 0 0" }}>
            IP: {ip} &middot; UA: {userAgent}
          </Text>
          <Text style={{ color: muted, fontSize: 12, margin: "12px 0 0" }}>
            Reply directly to this email — it will go straight to the submitter (<span style={{ color: gold }}>{email}</span>).
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div style={{ display: "block", marginBottom: 10 }}>
      <Text style={{ color: muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
        {label}
      </Text>
      <Text style={{ color: highlight ? gold : navy, fontSize: 15, margin: "2px 0 0", fontWeight: highlight ? 600 : 400 }}>
        {value}
      </Text>
    </div>
  );
}
