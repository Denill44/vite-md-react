import { MangasCarousel } from "./MangasCarousel";
import { Typography } from "@mui/material";
import { useRequest, getMangaList } from "../../api";


export function Home() {
  const { loading, data: mangas } = useRequest('order[followedCount]=desc&limit=10', getMangaList);

  if (loading) return <div>Loading home</div>
  return (
    <div>
      <Typography variant="h5">Most followed</Typography>
      <MangasCarousel mangas={mangas.data} sx={{ height: "300px" }} />
    </div>
  );
}