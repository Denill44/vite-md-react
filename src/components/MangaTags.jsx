import { Chip } from "@mui/material";


export function MangaTags({ tags = [], contentRating = null, sx }) {
  const chipColor = contentRating === "safe" ? "success" :
    contentRating === "suggestive" ? "warning" :
      contentRating === "erotica" && "error";
  return (
    <>
      {contentRating != null &&
        <Chip label={contentRating} color={chipColor}
          size="small" sx={{ textTransform: "capitalize" }}
        />
      }
      {tags.map((tag) => {
        return (
          <Chip label={Object.values(tag.attributes.name)[0]} size="small" key={tag.id} sx={sx} />
        )
      })}
    </>
  );
}