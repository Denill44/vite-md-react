import { Box, Typography, Chip } from "@mui/material";
import { mangaUtil } from "../../utils/mangaUtil";
import { StarBorder } from "@mui/icons-material";
import { BookmarkBorder } from "@mui/icons-material";
import { MangaTags } from "../../components/MangaTags";


export function MangaDetails({ manga, sx, ...props }) {
  const { title, rating, author, artist, coverFileName } = mangaUtil(manga);
  let format = [],
    genres = [],
    theme = [];

  for (let i = 0, n = manga.attributes.tags.length; i < n; i++) {
    switch (manga.attributes.tags[i].attributes.group) {
      case 'format':
        format.push(manga.attributes.tags[i]);
        break;
      case 'genre':
        genres.push(manga.attributes.tags[i]);
        break;
      case 'theme':
        theme.push(manga.attributes.tags[i]);
        break;
    }
  }

  return (
    <Box sx={{ ...styles.container, ...sx }} {...props}>
      <Typography sx={styles.title} variant="h3">{title}</Typography>
      <Box sx={styles.cover}>
        <img alt={title} loading="lazy"
          src={`https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.512.jpg`}
        />
      </Box>
      <Box sx={styles.info}>
        <Box sx={styles.stats}>
          <Box sx={styles.stat}>
            <StarBorder />
            <Typography variant="body1">{rating}</Typography>
          </Box>
          <Box sx={styles.stat}>
            <BookmarkBorder />
            <Typography variant="body1">{manga.attributes.statistics.follows}</Typography>
          </Box>
        </Box>
        <Typography variant="body1">
          {`Publication: ${manga.attributes.year}, ${manga.attributes.status}`}
        </Typography>
        <Typography variant="body1">
          {`Author: ${author.join(", ")}`}
        </Typography>
        <Typography variant="body1">
          {`Artist: ${artist.join(", ")}`}
        </Typography>
        <Box sx={styles.tags}>
          <Typography variant="body1">
            {'Content rating: '}
          </Typography>
          <MangaTags contentRating={manga.attributes.contentRating} />
        </Box>
        {format.length > 0 &&
          <Box sx={styles.tags}>
            <Typography variant="body1">
              {'Format: '}
            </Typography>
            <MangaTags tags={format} />
          </Box>
        }
        {manga.attributes.publicationDemographic &&
          <Box sx={styles.tags}>
            <Typography variant="body1">
              {'Demographic: '}
            </Typography>
            <Chip label={manga.attributes.publicationDemographic} size="small" sx={{ textTransform: "capitalize" }} />
          </Box>
        }
        {genres.length > 0 &&
          <Box sx={styles.tags}>
            <Typography variant="body1">
              {'Genres: '}
            </Typography>
            <MangaTags tags={genres} />
          </Box>
        }
        {theme.length > 0 &&
          <Box sx={styles.tags}>
            <Typography variant="body1">
              {'Theme: '}
            </Typography>
            <MangaTags tags={theme} />
          </Box>
        }
      </Box>
      <Typography sx={styles.desc} variant="body2">{manga.attributes.description.en}</Typography>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: 1,
    maxWidth: "800px",
    flexWrap: "wrap"
  },
  title: {
    width: "100%"
  },
  cover: {
    width: {
      xs: "100%",
      sm: "45%",
      md: "30%",
    },
    display: "flex",
    justifyContent: "center",
    '& img': {
      maxWidth: "250px",
      minWidth: "100px",
      height: "auto",
      objectFit: "cover"
    }
  },
  info: {
    width: {
      xs: "100%",
      sm: "45%",
      md: "60%",
    },
    display: "flex",
    flexDirection: "column",
    gap: 1
  },
  stats: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2
  },
  stat: {
    display: "flex",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1
  },
  desc: {
    width: "100%",
  }
}