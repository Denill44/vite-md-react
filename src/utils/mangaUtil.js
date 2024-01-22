export const mangaUtil = (manga) => {
  const title = Object.values(manga.attributes.title)[0];
  const rating = manga.attributes.statistics.rating.average ?
    manga.attributes.statistics.rating.average.toPrecision(3) :
    "N/A";
  let author = [],
    artist = [],
    coverFileName, end;
  for (let i = 0, n = manga.relationships.length; i < n; i++) {
    switch (manga.relationships[i].type) {
      case 'author':
        author.push(manga.relationships[i].attributes?.name);
        break;
      case 'artist':
        artist.push(manga.relationships[i].attributes?.name);
        break;
      case 'cover_art':
        coverFileName = manga.relationships[i].attributes?.fileName;
        end = true;
        break;
    }
    if (end) break;
  }
  return { title, rating, author, artist, coverFileName };
}