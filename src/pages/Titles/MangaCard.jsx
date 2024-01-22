import { BookmarkBorder, StarBorder } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { MangaTags } from "../../components/MangaTags";
import { Link } from "react-router-dom";
import { mangaUtil } from "../../utils/mangaUtil";


export function MangaCard({ manga, sx, ...props }) {
  const { title, coverFileName, rating } = mangaUtil(manga);

  return (
    <Box sx={{ ...styles.container, ...sx }} {...props}>
      <Box sx={styles.cover}>
        <Link to={`/titles/${manga.id}`} state={manga}>
          <img alt={title} loading="lazy"
            src={`https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`}
          />
        </Link>
      </Box>
      <Box sx={styles.body}>
        <Box sx={styles.title}>
          <Link to={`/titles/${manga.id}`} state={manga} style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6" lineHeight="normal">{title}</Typography>
          </Link>
        </Box>
        <Box sx={styles.stats}>
          <Box sx={styles.stat}>
            <StarBorder />
            <Typography variant="body2">{rating}</Typography>
          </Box>
          <Box sx={styles.stat}>
            <BookmarkBorder />
            <Typography variant="body2">{manga.attributes.statistics.follows}</Typography>
          </Box>
          <Box sx={styles.stat}>
            <Typography variant="body2"
              sx={{ '::first-letter': { textTransform: "capitalize" } }}
            >
              {manga.attributes.status}
            </Typography>
          </Box>
        </Box>
        <Box sx={styles.tags}>
          <MangaTags tags={manga.attributes.tags} contentRating={manga.attributes.contentRating} />
        </Box>
        <Box sx={styles.desc}>
          <Typography variant="body2">{manga.attributes.description.en}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: "flex",
    height: "270px",
    margin: 1,
    padding: 1,
    gap: 1,
    backgroundColor: "background.paper",
    boxShadow: 1
  },
  cover: {
    flex: 1,
    minWidth: 0,
    '& img': {
      aspectRatio: "2/3",
      width: "100%",
      height: "auto",
      objectFit: "cover"
    }
  },
  body: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    gap: 1,
    minWidth: 0,
    minHeight: 0
  },
  title: {
    flexShrink: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    lineClamp: 2,
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  stats: {
    flexShrink: 0,
    display: "flex",
    gap: 1,
    overflow: "hidden",
    position: "relative",
    '::after': {
      content: '""',
      position: "absolute",
      backgroundImage: (theme) => `linear-gradient(to right, rgba(255,0,0,0), ${theme.palette.background.paper})`,
      right: 0,
      height: "100%",
      width: "0.9em"
    }
  },
  stat: {
    display: "flex"
  },
  tags: {
    display: "flex",
    flexShrink: 0,
    gap: 0.5,
    overflow: "hidden",
    position: "relative",
    '::after': {
      content: '""',
      position: "absolute",
      backgroundImage: (theme) => `linear-gradient(to right, rgba(255,0,0,0), ${theme.palette.background.paper})`,
      right: 0,
      height: "100%",
      width: "0.9em"
    }
  },
  desc: {
    overflow: "hidden",
    position: "relative",
    height: "100%",
    '::after': {
      content: '""',
      position: "absolute",
      backgroundImage: (theme) => `linear-gradient(to bottom, rgba(255,0,0,0), ${theme.palette.background.paper})`,
      bottom: 0,
      height: "0.9em",
      width: "100%"
    }
  }
}