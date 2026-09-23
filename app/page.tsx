import { getUpcomingStreams, getLatestStreams } from '@/lib/youtube';
import ClientPageWrapper from '@/components/ClientPageWrapper';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Schedule from '@/components/Schedule';
import Videos from '@/components/Videos';
import Music from '@/components/Music';
import Data from '@/components/Data';
import ScrollToTop from '@/components/ScrollToTop';

export default async function Home() {
  // Data fetching dari YouTube API di Server Component
  const [upcomingStreams, latestStreamsData] = await Promise.all([
    getUpcomingStreams(),
    getLatestStreams(5),
  ]);

  return (
    <ClientPageWrapper>
      <main className="min-h-screen bg-[#f7faf7]">
        <Navbar />
        <Hero />
        <Schedule streams={upcomingStreams} />
        <Videos 
          initialVideos={latestStreamsData.items} 
          initialNextPageToken={latestStreamsData.nextPageToken}
          initialPrevPageToken={latestStreamsData.prevPageToken}
        />
        <Music />
        <Data />

        <ScrollToTop />

        <footer className="bg-white border-t border-ochi-light py-8 text-center text-xs text-ochi-dark">
          <p>&copy; {new Date().getFullYear()} Ochi Rasheo ch. All Rights Reserved.</p>
        </footer>
      </main>
    </ClientPageWrapper>
  );
}