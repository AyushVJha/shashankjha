export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description?: string;
}

// Add YouTube video IDs below. Replace the placeholder IDs with actual video IDs.
// Example: If the YouTube URL is https://www.youtube.com/watch?v=dQw4w9WgXcQ
// then the youtubeId is "dQw4w9WgXcQ"
export const videos: Video[] = [
  {
    id: "video-1",
    youtubeId: "",
    title: "Add YouTube video ID in /data/videos.ts",
    description: "Replace the empty youtubeId with an actual YouTube video ID",
  },
  {
    id: "video-2",
    youtubeId: "",
    title: "Add YouTube video ID in /data/videos.ts",
    description: "Replace the empty youtubeId with an actual YouTube video ID",
  },
  {
    id: "video-3",
    youtubeId: "",
    title: "Add YouTube video ID in /data/videos.ts",
    description: "Replace the empty youtubeId with an actual YouTube video ID",
  },
  {
    id: "video-4",
    youtubeId: "",
    title: "Add YouTube video ID in /data/videos.ts",
    description: "Replace the empty youtubeId with an actual YouTube video ID",
  },
];
