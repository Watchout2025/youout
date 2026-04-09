import CategoryChips from "@/components/CategoryChips";
import InfiniteScroll from "@/components/InfiniteScroll";
import { fetchVideos } from "@/lib/data";

export default async function Home() {
  const initialVideos = await fetchVideos();

  return (
    <div className="flex flex-col">
      <CategoryChips />
      <InfiniteScroll initialVideos={initialVideos} />
    </div>
  );
}
