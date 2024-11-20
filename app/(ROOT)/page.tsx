import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { Startup, Author } from "../../sanity/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const params = { search: query || null }
  
  // const session = await auth();


  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

  
  return (
    <>
      <section className="pink_container">
        <p className=" tag">Pitch, Vote, and Grow</p>
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className=" mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
