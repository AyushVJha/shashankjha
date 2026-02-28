export interface Case {
  id: string;
  title: string;
  court: string;
  year: number;
  status: "Ongoing" | "Filed" | "Disposed" | "Landmark" | "Dismissed" | "Withdrawn for refiling";
  category: string[];
  description: string;
  fullDescription?: string;
}

export const cases: Case[] = [
  {
    id: "ott-regulation-2024",
    title: "OTT Platform Regulation Petition",
    court: "Supreme Court of India",
    year: 2024,
    status: "Filed",
    category: ["PIL", "Supreme Court"],
    description:
      "Filed PIL seeking establishment of a regulatory body for OTT platforms like Netflix and Amazon Prime, citing lack of content certification and concerns over unregulated content.",
    fullDescription:
      "This petition before the Supreme Court of India seeks the establishment of a dedicated regulatory body for Over-The-Top (OTT) streaming platforms in India. The petition argues that the current self-regulatory mechanism is insufficient to address concerns around uncertified content, gratuitous violence, obscenity, and potential threats to national security.",
  },
  {
    id: "palghar-sadhus",
    title: "Palghar Sadhus Justice PIL",
    court: "Supreme Court of India",
    year: 2023,
    status: "Ongoing",
    category: ["PIL", "Supreme Court"],
    description:
      "Sought CBI investigation into the tragic lynching incident in Palghar, Maharashtra, demanding accountability and justice for the victims.",
    fullDescription:
      "This PIL sought a CBI investigation into the incident in Palghar, Maharashtra in April 2020. The petition argued that the local police investigation was inadequate and that the gravity of the crime warranted an independent federal investigation.",
  },
  {
    id: "temple-land-encroachment",
    title: "Temple Land Protection PIL",
    court: "Supreme Court of India",
    year: 2023,
    status: "Filed",
    category: ["PIL", "Supreme Court"],
    description:
      "PIL seeking nationwide survey and protection of temple lands from illegal encroachment, with directions for proper management mechanisms.",
    fullDescription:
      "This Public Interest Litigation sought directions from the Supreme Court for a comprehensive nationwide survey of temple lands that have been illegally encroached upon. The petition seeks government action to identify, reclaim, and protect these properties.",
  },
  {
    id: "consumer-rights-ncdrc",
    title: "Consumer Rights Victory — NCDRC",
    court: "National Consumer Disputes Redressal Commission",
    year: 2023,
    status: "Disposed",
    category: ["High Court"],
    description:
      "Successfully represented consumers in a landmark dispute before NCDRC regarding deficiency in services by a major corporation, setting important precedent.",
    fullDescription:
      "Successfully represented a group of consumers before the National Consumer Disputes Redressal Commission (NCDRC) in a case involving significant deficiency in services by a major corporation. The commission ruled in favor of the consumers.",
  },
  {
    id: "delhi-hc-property",
    title: "Property Rights — Delhi High Court",
    court: "Delhi High Court",
    year: 2022,
    status: "Disposed",
    category: ["High Court"],
    description:
      "Successfully argued a complex property dispute involving ancestral property rights and partition claims under Hindu Succession Act.",
    fullDescription:
      "This case before the Delhi High Court involved a complex dispute over ancestral property rights, partition claims, and issues of adverse possession. The matter required interpretation of the Hindu Succession Act and personal law provisions.",
  },
  {
    id: "cyber-crime-it-act",
    title: "Cyber Crime & IT Act Defense",
    court: "Various High Courts",
    year: 2023,
    status: "Ongoing",
    category: ["High Court", "Ongoing"],
    description:
      "Multiple matters involving cyber crime defense, online defamation, and IT Act violations across different High Court jurisdictions.",
    fullDescription:
      "Handling multiple cases across various High Courts involving cyber crimes, online harassment, defamation through social media, and violations under the Information Technology Act, 2000.",
  },
  {
    id: "nclt-insolvency",
    title: "Corporate Insolvency Resolution",
    court: "NCLT Delhi",
    year: 2022,
    status: "Disposed",
    category: ["High Court"],
    description:
      "Represented creditors in insolvency resolution process before NCLT Delhi under the Insolvency and Bankruptcy Code, 2016, achieving maximum recovery.",
    fullDescription:
      "Represented a consortium of operational creditors in an insolvency resolution process before the National Company Law Tribunal (NCLT), Delhi bench. The successful resolution ensured maximum recovery for the creditors.",
  },
  {
    id: "matrimonial-custody",
    title: "Child Custody Litigation",
    court: "Delhi High Court",
    year: 2024,
    status: "Ongoing",
    category: ["High Court", "Ongoing"],
    description:
      "Representing parent in sensitive child custody matter, arguing the welfare-of-the-child principle as paramount consideration under Indian law.",
    fullDescription:
      "This ongoing matter before the Delhi High Court involves a contested child custody dispute where the welfare-of-the-child principle is being argued as the paramount consideration under the Guardians and Wards Act, 1890.",
  },
];
