import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import CustomTypographyParagraph from './texto/customTypography/CustomTypographyParagraph';



export const CustomGUID = ({ id }) => {
  const [showFull, setShowFull] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipText, setTooltipText] = useState("Copiar al portapapeles");


  const truncated = `${id?.slice(0, 8)}...`;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setShowFull(!showFull);
  };
  const handleCopyClick = () => {
    navigator.clipboard.writeText(id)

    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTooltipOpen(true);
      setTooltipText("Copiado");
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
        setTooltipText("");
      }, 3000);
    });
  };
  return (
    id ?
      <span sx={{ m: 0, display: 'flex', alignItems: "flex-start" }}>
        <Tooltip title={tooltipText} open={tooltipOpen} placement="top-end" onClick={handleCopyClick}>
          <span
            sx={{ m: 0, }} onClick={handleCopyClick} onDoubleClick={handleDoubleClick}>

            <CustomTypographyParagraph sx={{ textAlign: "left" }}>
              {showFull ? id : truncated}
            </CustomTypographyParagraph>
          </span>
        </Tooltip>
      </span>
      : <></>

  );
};
