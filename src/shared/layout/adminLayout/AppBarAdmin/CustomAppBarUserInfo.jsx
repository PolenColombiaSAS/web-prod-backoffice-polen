import { Box, Typography } from "@mui/material";

const CustomAppBarUserInfo = ({ user }) => {
  return (
    <Box sx={{
      display: { xs: 'none', md: 'flex' },
      flexDirection: "column"
    }}>
      <Typography sx={{ mx: 3 }}>{user.nombres} {user.apellidos}</Typography>
      {/* <Typography sx={{ mx: 3 }}>{user.rol}</Typography> */}
    </Box>
  );
}

  export default CustomAppBarUserInfo
  