import { Box, Typography } from "@mui/material";


export function ChapterCard({ chapter, sx, ...props }) {
  const volumeStr = chapter.attributes.volume ? `Vol. ${chapter.attributes.volume} ` : "";
  const titleStr = chapter.attributes.title ? ` - ${chapter.attributes.title}` : "";
  const info = volumeStr + `Ch. ${chapter.attributes.chapter}` + titleStr;
  const scanlationGroup = chapter.relationships.find((relationship) => relationship.type === "scanlation_group")?.attributes.name || "No group";
  return (
    <Box {...props} sx={{ ...style, ...sx }}>
      <Typography variant="body2">
        {info}
      </Typography>
      <Typography variant="caption">
        {scanlationGroup}
      </Typography>
    </Box>
  )
}

const style = {
  marginTop: 1,
  marginBottom: 1,
  padding: 1,
  backgroundColor: "background.paper",
}