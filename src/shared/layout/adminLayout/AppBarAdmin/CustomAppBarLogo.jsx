import { Box, useMediaQuery, useTheme } from "@mui/material";

const CustomAppBarLogo = ({ srcLogo }) => {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{
      [theme.breakpoints.down('md')]: {
        flexGrow: 1,
      },
      display: "grid",
      placeItems: "center",
      mr: 5,
      backgroundColor: theme.palette.primary.main,
      // backgroundColor: "#1976d2",
      width: isDownMd ? "180px" : "220px"
    }}>
      <img src={srcLogo} alt={"Logo"} width={"100%"} />
    </Box>
  );
}

export default CustomAppBarLogo