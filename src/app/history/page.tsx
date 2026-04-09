import ClientSideVideoList from "@/components/ClientSideVideoList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
  description: "View your watch history on YouOut.",
};

export default function HistoryPage() {
  return <ClientSideVideoList title="Watch history" type="history" />;
}
