import {Box} from "@mui/material";

export const CustomImage = ({path, width, height}: { path: string, width?: string, height?: string }) => {
  return (
    <Box sx={{
      width: width ? width : '100%',
      height: height ? height : '100%',
      objectFit: 'cover',
      borderRadius: 'inherit'
    }} component='img' src={path}/>
  )
}
