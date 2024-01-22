import { useRequest, getManga, getMangaFeed } from "../../api";
import { useParams } from "react-router-dom";
import { MangaDetails } from "./MangaDetails";
import { Pagination, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ChapterCard } from "../../components/ChapterCard";


export function Title() {
  const [query, setQuery] = useSearchParams();
  const { titleId } = useParams();
  const { loading: loadingManga, data: manga } = useRequest(titleId, getManga);
  const { loading: loadingChapters, data: chapters } = useRequest(`id=${titleId}&translatedLanguage[]=en&order[volume]=desc&order[chapter]=desc&includes[]=scanlation_group&` + query, getMangaFeed);

  const handlePagination = (e, newPage) => {
    e.preventDefault();
    setQuery(prev => {
      prev.set("page", newPage);
      return prev;
    })
  }

  if (loadingManga) return <div>Loading title</div>
  return (
    <>
      <MangaDetails manga={manga} />
      {loadingChapters ? <div>Loading chapters</div> :
        <>
          <Box>
            {chapters.data.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            <Pagination
              size="small"
              page={parseInt(query.get("page"), 10) || 1}
              count={chapters.totalPages}
              siblingCount={2}
              onChange={handlePagination}
            />
          </Box>
        </>
      }
    </>
  );
}