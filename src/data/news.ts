export interface NewsItem {
  id: string;
  headline: string;
  publication: string;
  date: string;
  url: string;
  category: "Press" | "TV" | "Interview" | "Speaking";
}

export const news: NewsItem[] = [
  {
    id: "livelaw-ott-regulation",
    headline:
      "Supreme Court Seeks Centre\u2019s Affidavit On Steps Being Taken For OTT Regulation",
    publication: "Live Law",
    date: "Feb 2021",
    url: "https://www.livelaw.in/top-stories/supreme-court-seeks-centres-affidavit-on-steps-being-taken-for-ott-regulation-169940",
    category: "Press",
  },
  {
    id: "livelaw-west-bengal-sit",
    headline:
      "Plea In Supreme Court Seeks Independent Investigation Into West Bengal Violence During Waqf Act Protests",
    publication: "Live Law",
    date: "Apr 2025",
    url: "https://www.livelaw.in/top-stories/plea-in-supreme-court-seeks-independent-investigation-into-west-bengal-violence-during-anti-waqf-act-protests-289379",
    category: "Press",
  },
  {
    id: "livelaw-stubble-burning",
    headline:
      "\u201CYou Think It Is Going To Stop?\u201D: Supreme Court Refuses Urgent Listing For PIL To Ban Stubble Burning",
    publication: "Live Law",
    date: "Nov 2022",
    url: "https://www.livelaw.in/top-stories/you-think-it-is-going-to-stop-supreme-court-refuses-urgent-listing-for-pil-to-ban-stubble-burning-213738",
    category: "Press",
  },
  {
    id: "livelaw-firecrackers-ban",
    headline:
      "\u201CWhy Do You Want To Increase Pollution?\u201D: Supreme Court Asks While Hearing Plea To Lift Firecrackers Ban",
    publication: "Live Law",
    date: "Oct 2022",
    url: "https://www.livelaw.in/top-stories/why-do-you-want-to-increase-pollution-supreme-court-asks-while-hearing-plea-to-lift-firecrakers-ban-in-delhi-ncr-211287",
    category: "Press",
  },
  {
    id: "livelaw-kunal-kamra-contempt",
    headline:
      "Kunal Kamra\u2019s Statements Against Supreme Court Be Produced In Ongoing Contempt Proceedings, AG Suggests",
    publication: "Live Law",
    date: "Mar 2022",
    url: "https://www.livelaw.in/news-updates/kunal-kamras-news-statements-against-supreme-court-be-produced-in-ongoing-contempt-proceedings-attorney-general-suggests-193793",
    category: "Press",
  },
  {
    id: "livelaw-murshidabad-violence",
    headline:
      "Murshidabad Violence: Supreme Court Allows Filing Of Fresh Plea After Rebuking Petitioner",
    publication: "Live Law",
    date: "Apr 2025",
    url: "https://www.livelaw.in/top-stories/supreme-court-pleas-seeking-independent-investigation-into-murshidabad-violence-289860",
    category: "Press",
  },
];
