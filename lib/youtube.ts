const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

// 1. Mengambil Upcoming / Live Stream (Untuk Bagian Atas)
export async function getUpcomingStreams() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) return [];

  try {
    const upcomingRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=upcoming&order=date&maxResults=3&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 300 } }
    );
    const upcomingData = await upcomingRes.json();

    if (upcomingData.items && upcomingData.items.length > 0) {
      return upcomingData.items;
    }

    const liveRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&maxResults=3&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 300 } }
    );
    const liveData = await liveRes.json();

    return liveData.items || [];
  } catch (error) {
    console.error("Gagal mengambil upcoming streams:", error);
    return [];
  }
}

// 2. Mengambil Latest Streams (Video Panjang Terbaru) + Paginasi
export async function getLatestStreams(maxResults = 5, pageToken = '') {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return { items: [], nextPageToken: null, prevPageToken: null };
  }

  try {
    const pageTokenParam = pageToken ? `&pageToken=${pageToken}` : '';
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=${maxResults}${pageTokenParam}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const searchData = await searchRes.json();

    return {
      items: searchData.items || [],
      nextPageToken: searchData.nextPageToken || null,
      prevPageToken: searchData.prevPageToken || null,
    };
  } catch (error) {
    console.error("Gagal mengambil Latest Streams:", error);
    return { items: [], nextPageToken: null, prevPageToken: null };
  }
}

// 1. Ambil Statistik Channel (Subscribers & Total Views)
export async function getChannelStats() {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    return { subscriberCount: '0', viewCount: '0', videoCount: '0' };
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();
    const stats = data.items?.[0]?.statistics;

    return {
      subscriberCount: stats?.subscriberCount || '0',
      viewCount: stats?.viewCount || '0',
      videoCount: stats?.videoCount || '0',
      avatar: data.items?.[0]?.snippet?.thumbnails?.medium?.url || '',
      title: data.items?.[0]?.snippet?.title || 'Ochi Rasheo',
    };
  } catch (error) {
    console.error('Gagal mengambil channel stats:', error);
    return { subscriberCount: '0', viewCount: '0', videoCount: '0', avatar: '', title: '' };
  }
}

// 2. Ambil Stream Stats Lengkap (Views & Likes)
export async function getDetailedStreamStats(maxResults = 20) {
  if (!YOUTUBE_API_KEY || !CHANNEL_ID) return [];

  try {
    // Search video/stream terbaru
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const searchData = await searchRes.json();
    const videoIds = searchData.items?.map((item: any) => item.id.videoId).join(',');

    if (!videoIds) return [];

    // Ambil detail statistik (View & Like Count)
    const detailRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const detailData = await detailRes.json();

    return detailData.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails?.default?.url,
      views: parseInt(item.statistics.viewCount || '0', 10),
      likes: parseInt(item.statistics.likeCount || '0', 10),
    }));
  } catch (error) {
    console.error('Gagal mengambil detail stream stats:', error);
    return [];
  }
}