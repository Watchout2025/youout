import ClientSideVideoList from "@/components/ClientSideVideoList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liked Videos",
  description: "Videos you've liked on YouOut.",
};

export default function LikedVideosPage() {
  return <ClientSideVideoList title="Liked videos" type="liked" />;
}
