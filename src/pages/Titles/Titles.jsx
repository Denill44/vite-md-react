import { useRequest, getMangaList } from "../../api";
import { MangaCard } from "./MangaCard";
import { Pagination, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";


export function Titles() {
  const [query, setQuery] = useSearchParams();
  const { loading, data: mangas } = useRequest(query, getMangaList);

  const handlePagination = (e, newPage) => {
    e.preventDefault();
    setQuery(prev => {
      prev.set("page", newPage);
      return prev;
    })
  }

  if (loading) return <div>Loading titles</div>
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {mangas.data.map((manga) => (
          <Box key={manga.id} sx={styles.cardWrapper}>
            <MangaCard manga={manga} />
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          size="small"
          page={parseInt(query.get("page"), 10) || 1}
          count={mangas.totalPages}
          siblingCount={2}
          onChange={handlePagination}
        />
      </Box>
    </>
  );
}

const styles = {
  cardWrapper: {
    width: {
      xs: "100%",
      sm: "50%",
      md: "33%",
    }
  }
}