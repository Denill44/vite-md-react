import { useEffect, useState } from "react"


export const useRequest = (params = null, request = () => { }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await request(params, { signal: abortController.signal });
        setData(response);
        setLoading(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err);
          setLoading(false);
        }
      }
    };
    params && fetchData();
    return () => {
      abortController.abort();
    };
  }, [params, request])

  return { loading, data, error };
}

const fetcher = async (url = "", config = {}) => {
  const response = await fetch("https://api.mangadex.org/" + url, config);
  if (!response.ok) throw new Error();
  return await response.json();
}

const paginationUtil = (params = "") => {
  const query = new URLSearchParams(params);
  const limit = query.get('limit') || 24;
  const offset = ((parseInt(query.get('page'), 10) || 1) - 1) * limit;
  query.set('limit', limit);
  query.set('offset', offset);
  query.delete('page');
  return { query, limit }
}

export const getMangaStats = async (mangaIds = [], config = {}) => {
  const stats = await fetcher(`statistics/manga?${mangaIds}`, config);
  return stats;
}

export const getManga = async (id = "", config = {}) => {
  const mangaQuery = new URLSearchParams([['includes[]', 'cover_art'], ['includes[]', 'author'], ['includes[]', 'artist']])
  const [manga, stats] = await Promise.all([
    fetcher(`manga/${id}?${mangaQuery}`, config),
    getMangaStats(`manga[]=${id}`, config),
  ]);
  manga.data.attributes["statistics"] = stats.statistics[manga.data.id];
  return manga.data;
}

export const getMangaFeed = async (params = "", config = {}) => {
  const { query, limit } = paginationUtil(params);
  const id = query.get('id');
  query.delete('id');
  query.set('limit', 50);
  const chapters = await fetcher(`manga/${id}/feed?${query}`, config);
  chapters.totalPages = Math.ceil(chapters.total / limit);
  return chapters;
}

export const getMangaList = async (params = "", config = {}) => {
  const { query: mangasQuery, limit } = paginationUtil(params);
  mangasQuery.append('includes[]', 'cover_art');
  const mangas = await fetcher(`manga?${mangasQuery}`, config);
  mangas.totalPages = Math.ceil(mangas.total / limit);
  const statsQuery = new URLSearchParams(mangas.data.map((manga) => ['manga[]', manga.id]));
  const stats = await getMangaStats(statsQuery, config);
  for (let i = 0, n = mangas.data.length; i < n; i++) {
    mangas.data[i].attributes["statistics"] = stats.statistics[mangas.data[i].id];
  }
  return mangas;
}