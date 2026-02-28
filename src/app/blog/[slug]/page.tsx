import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "ott-regulation-india": {
    slug: "ott-regulation-india",
    title: "Why India Needs an OTT Regulatory Framework",
    date: "September 2024",
    readTime: "6 min read",
    content: `
      <p>The digital content landscape in India has experienced explosive growth over the past decade. With over 40 OTT platforms now operating in the country, streaming services have become one of the primary modes of entertainment consumption for millions of Indians.</p>

      <h2>The Current Landscape</h2>
      <p>Unlike traditional media — television, cinema, and print — which are governed by well-established regulatory frameworks, OTT platforms operate in what can be described as a regulatory grey zone. The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 introduced a self-regulatory mechanism, but its effectiveness has been widely questioned.</p>

      <h2>Why Self-Regulation Falls Short</h2>
      <p>The three-tier grievance redressal mechanism established under the IT Rules — comprising the platform&apos;s own grievance officer, a self-regulatory body, and an inter-departmental committee — has significant gaps. The self-regulatory bodies are funded and constituted by the very platforms they are meant to regulate, creating an inherent conflict of interest.</p>
      <p>Content that would never pass CBFC certification for theatrical release appears freely on streaming platforms. Gratuitous violence, objectionable content, and material that could potentially impact national security are accessible without meaningful age-gating or content warnings.</p>

      <h2>The Constitutional Balance</h2>
      <p>Any regulatory framework must carefully balance the fundamental right to free speech under Article 19(1)(a) of the Constitution with the reasonable restrictions permissible under Article 19(2). The goal is not censorship — it is responsible content governance that protects vulnerable audiences while preserving creative freedom.</p>

      <h2>A Proposed Framework</h2>
      <p>The PIL filed before the Supreme Court proposes the establishment of an independent statutory body — similar in structure to CBFC but adapted for the unique characteristics of digital content. This body would:</p>
      <ul>
        <li>Develop age-appropriate content classification standards</li>
        <li>Establish mandatory content warnings and age-gating mechanisms</li>
        <li>Create an independent grievance redressal process</li>
        <li>Ensure compliance without pre-censorship</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>As India moves toward becoming a trillion-dollar digital economy, the regulation of digital content is not merely a cultural question — it is a governance imperative. The Supreme Court&apos;s engagement with this issue signals that the judiciary recognizes the need for a comprehensive framework that serves both creative expression and public interest.</p>
    `,
  },
  "pil-as-instrument-of-change": {
    slug: "pil-as-instrument-of-change",
    title: "PIL as an Instrument of Social Change",
    date: "July 2024",
    readTime: "8 min read",
    content: `
      <p>Public Interest Litigation (PIL) has been one of the most transformative innovations in Indian jurisprudence. What began as a judicial experiment in the late 1970s has evolved into a powerful tool for social justice, giving voice to the voiceless and holding the state accountable to constitutional principles.</p>

      <h2>The Origins</h2>
      <p>The PIL movement in India was pioneered by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer, who recognized that the formal requirements of traditional litigation — filing fees, locus standi, and procedural complexity — effectively barred the poorest and most marginalized from accessing justice. By relaxing these requirements, the Supreme Court opened the doors of justice to ordinary citizens acting in the public interest.</p>

      <h2>Landmark Impact</h2>
      <p>Over the decades, PILs have been instrumental in shaping some of India&apos;s most significant legal and policy reforms:</p>
      <ul>
        <li><strong>Vishaka v. State of Rajasthan (1997)</strong> — Established sexual harassment guidelines in workplaces, later codified into law</li>
        <li><strong>MC Mehta v. Union of India</strong> — A series of PILs that fundamentally shaped India&apos;s environmental jurisprudence</li>
        <li><strong>Right to food, education, and livelihood</strong> — PILs expanded the scope of Article 21 far beyond its original text</li>
      </ul>

      <h2>The Contemporary Practice</h2>
      <p>Today, PILs continue to serve as a vital mechanism for addressing systemic failures. From seeking accountability for communal violence to demanding regulatory frameworks for new-age technologies, the PIL remains the citizen&apos;s most direct path to constitutional remedy.</p>
      <p>In my own practice, I have filed over 50 PILs before the Supreme Court and various High Courts. Each PIL represents not just a legal petition, but a voice for the constitutional values that define our republic.</p>

      <h2>Challenges and Criticisms</h2>
      <p>The PIL mechanism is not without its critics. Concerns about the misuse of PILs for personal or political gain have led courts to impose costs on frivolous petitioners. The Supreme Court has repeatedly warned against treating PILs as &ldquo;publicity interest litigations.&rdquo;</p>
      <p>However, these legitimate concerns should not obscure the fundamental value of PILs as instruments of democratic accountability. The solution lies in responsible filing, rigorous judicial scrutiny, and a commitment to genuine public interest.</p>

      <h2>The Path Forward</h2>
      <p>As India faces new challenges — from digital rights to environmental crises to communal harmony — the PIL will continue to evolve. Its strength lies in its adaptability and its grounding in the constitutional promise of justice, liberty, equality, and fraternity for all citizens.</p>
    `,
  },
  "digital-rights-constitution": {
    slug: "digital-rights-constitution",
    title: "Digital Rights and the Indian Constitution",
    date: "May 2024",
    readTime: "5 min read",
    content: `
      <p>The Indian Constitution, drafted over seven decades ago, could not have anticipated the digital revolution. Yet, through dynamic interpretation, Indian courts have been remarkably adept at extending constitutional protections into the digital realm.</p>

      <h2>Privacy as a Fundamental Right</h2>
      <p>The landmark <strong>K.S. Puttaswamy v. Union of India (2017)</strong> decision established privacy as a fundamental right under Article 21. In the digital age, this has profound implications for data protection, surveillance, and the relationship between citizens and the state in online spaces.</p>

      <h2>Free Speech in the Digital Age</h2>
      <p>Article 19(1)(a)&apos;s guarantee of free speech extends to online expression. However, the reasonable restrictions under Article 19(2) — sovereignty, security, public order, decency — apply equally. The challenge lies in defining these restrictions in a medium where content spreads instantaneously and borders are irrelevant.</p>
      <p>The Supreme Court&apos;s decision in <strong>Shreya Singhal v. Union of India (2015)</strong>, which struck down Section 66A of the IT Act, was a watershed moment for digital free speech. It established that vague and overbroad restrictions on online speech violate the Constitution.</p>

      <h2>The Right to Access</h2>
      <p>Courts have increasingly recognized internet access as an essential component of fundamental rights. The <strong>Anuradha Bhasin v. Union of India (2020)</strong> decision, arising from the Kashmir internet shutdown, established that internet restrictions must pass the tests of proportionality and necessity.</p>

      <h2>Emerging Challenges</h2>
      <p>Several critical issues demand constitutional engagement:</p>
      <ul>
        <li><strong>AI and automated decision-making</strong> — How do constitutional principles of fairness and non-discrimination apply to algorithmic governance?</li>
        <li><strong>Data sovereignty</strong> — As India develops its data protection framework, how do we balance individual rights with national security?</li>
        <li><strong>Digital identity</strong> — Aadhaar and similar systems raise fundamental questions about the right to exist without digital surveillance</li>
        <li><strong>Platform regulation</strong> — The power of social media platforms to control speech raises novel constitutional questions</li>
      </ul>

      <h2>Conclusion</h2>
      <p>The Constitution&apos;s genius lies in its ability to speak to circumstances its framers could never have imagined. As India navigates the digital age, the Constitution&apos;s foundational values — dignity, equality, liberty, and justice — provide the essential framework for protecting citizens&apos; rights in an increasingly connected world.</p>
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Note: In Next.js 15+, params is a Promise but generateMetadata can be async
  // For static generation, we handle it synchronously
  return {
    title: "Blog | Advocate Shashank Shekhar Jha",
    description: "Legal insights and thoughts on law, constitution, and public policy.",
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-4xl font-bold text-off-white mb-4">Post Not Found</h1>
          <Link href="/" className="text-saffron font-inter hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-saffron font-inter text-sm hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Header */}
        <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-off-white leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-off-white/40 font-inter text-sm mb-10">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <hr className="border-off-white/10 mb-10" />

        {/* Content */}
        <article
          className="prose prose-invert max-w-none
            [&_h2]:font-playfair [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-saffron [&_h2]:mt-10 [&_h2]:mb-4
            [&_p]:font-inter [&_p]:text-off-white/70 [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-5
            [&_ul]:font-inter [&_ul]:text-off-white/70 [&_ul]:pl-6 [&_ul]:mb-5
            [&_li]:mb-2 [&_li]:text-off-white/70
            [&_strong]:text-off-white [&_strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <hr className="border-off-white/10 mt-12 mb-8" />
        <div className="flex items-center justify-between">
          <Link
            href="/#blog"
            className="text-saffron font-inter text-sm hover:underline inline-flex items-center gap-1"
          >
            <ArrowLeft size={14} />
            All Articles
          </Link>
          <a
            href="https://twitter.com/shashank_ssj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-off-white/40 font-inter text-sm hover:text-saffron transition-colors"
          >
            Share on X →
          </a>
        </div>
      </div>
    </div>
  );
}
