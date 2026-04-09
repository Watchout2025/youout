import { fetchVideos } from "@/lib/data";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ search_query: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = (await searchParams).search_query;
  return {
    title: query ? `${query}` : "Search Results",
    description: `Search results for ${query} on YouOut.`,
  };
}

export default async function ResultsPage({ searchParams }: Props) {
  const query = (await searchParams).search_query || "";
  const initialVideos = await fetchVideos(query);

  return (
    <div className="max-w-[1100px] mx-auto pt-4 pb-10">
      <div className="flex items-center justify-between border-b border-[#303030] pb-2 mb-4 px-4 sm:px-0">
        <button className="flex items-center gap-2 hover:bg-[#272727] px-3 py-2 rounded-full transition-colors text-sm font-medium text-white">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {initialVideos.length > 0 ? (
        <InfiniteScroll initialVideos={initialVideos} searchQuery={query} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-white">No results found for &quot;{query}&quot;</h2>
          <p className="text-[#aaaaaa] mt-2">Try different keywords or check your spelling.</p>
        </div>
      )}
    </div>
  );
}
