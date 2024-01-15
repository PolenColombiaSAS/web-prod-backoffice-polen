import { CircularProgress, Backdrop } from "@mui/material";
import { useLoadingContext } from "../../context/loading";
const LoadingContextElement=()=> {
  const { loading } = useLoadingContext();
  
  return (
    <Backdrop
      sx={{ color: "white", zIndex: 300000}}
      open={loading}
    >
      <CircularProgress color="inherit" size="100px" />
    </Backdrop>
  );
}
export default LoadingContextElement