import { ArrowCircleLeftTwoTone, ArrowCircleRightTwoTone } from "@mui/icons-material";
import { IconButton, Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { mangaUtil } from "../../utils/mangaUtil";


export function MangasCarousel({ mangas, sx, ...props }) {
  const ref = useRef();
  const isPressed = useRef();
  const setIsPressed = (state) => isPressed.current = state;
  const [end, setEnd] = useState("left");
  const offSet = 16;

  const handleScroll = (e) => {
    const left = e.target.scrollLeft === 0;
    const right = e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
    if (left) setEnd("left");
    if (right) setEnd("right");
    if (!(left || right)) setEnd("none");
  }

  const scrollToRight = () => {
    if (isPressed.current) {
      ref.current.scrollLeft += offSet;
      requestAnimationFrame(scrollToRight);
    }
  };

  const scrollToLeft = () => {
    if (isPressed.current) {
      ref.current.scrollLeft -= offSet;
      requestAnimationFrame(scrollToLeft);
    }
  };

  return (
    <Box sx={{ ...styles.container, ...sx }} {...props}>
      <Box sx={styles.innerContainer} ref={ref} onScroll={handleScroll}>
        {mangas.map((manga) => {
          const { title, coverFileName } = mangaUtil(manga);
          return (
            <Box sx={styles.item} key={manga.id}>
              <Link to={`/titles/${manga.id}`} state={manga}>
                <img alt={manga.attributes.title} loading="lazy"
                  src={`https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`}
                />
              </Link>
              <Box sx={styles.itemBar}>
                <Typography sx={styles.itemBarText} variant="body2">
                  {title}
                </Typography>
                <Typography sx={styles.itemBarText} variant="caption">
                  {`Follows: ${manga.attributes.statistics.follows}`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <IconButton sx={{ visibility: end == "left" && "hidden", ...styles.nav }}
        color="inherit" size="large"
        onMouseDown={() => { setIsPressed(true); scrollToLeft(); }}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <ArrowCircleLeftTwoTone />
      </IconButton>
      <IconButton sx={{ right: 4, visibility: end == "right" && "hidden", ...styles.nav }}
        color="inherit" size="large"
        onMouseDown={() => { setIsPressed(true); scrollToRight(); }}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <ArrowCircleRightTwoTone />
      </IconButton>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    position: "relative",
    overflow: "hidden"
  },
  innerContainer: {
    display: "flex",
    gap: 1,
    overflowX: "auto",
    overflowY: "hidden",
    "::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  },
  nav: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
    opacity: 0.3,
    ":hover": { opacity: 1 },
    ".MuiSvgIcon-root": { fontSize: "inherit" }
  },
  item: {
    flexShrink: 0,
    position: "relative",
    '& img': {
      aspectRatio: 2 / 3,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  },
  itemBar: {
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)'
  },
  itemBarText: {
    color: "white",
    paddingLeft: "4px",
    paddingRight: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}