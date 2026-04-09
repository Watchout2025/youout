import ClientSideVideoList from "@/components/ClientSideVideoList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Later",
  description: "Videos you've saved to watch later on YouOut.",
};

export default function WatchLaterPage() {
  return <ClientSideVideoList title="Watch later" type="watch-later" />;
}
