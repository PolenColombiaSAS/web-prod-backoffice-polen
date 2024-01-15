import { Box } from '@mui/material';
import { useRef, useState, useEffect } from 'react';

function StretchToEndOfPage({ children }) {
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const topPosition = containerRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const calculatedHeight = viewportHeight - topPosition;

        setHeight(calculatedHeight);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box ref={containerRef} sx={{ pb: 5, position: "relative" }} style={{
      minHeight: { xs: "600px", sm: "700px", md: "800px", lg: "900px", xl: "1000px" },
      height: `${height}px`,
      width: "100%",
      overflow: 'auto'
    }}>
      {children}
    </Box>
  );
}

export default StretchToEndOfPage;
