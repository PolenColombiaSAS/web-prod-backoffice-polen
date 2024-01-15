import { useEffect, useRef, useState } from 'react';
import CustomViewFile from '../CustomViewFile';
import CustomViewImage from '../CustomViewImage';
import CustomDragAndDrop from '../dragAndDrop/CustomDragAndDrop';
import GridFilesPreview from './GridFilesPreview';

const CustomFileUpload = ({ onUploadFiles, onSendForApproval, uploadedDocuments,
  tipoDocumentos = [], handleOnDeleteElement, elementRemoved, disabledDragAndDrop,
  buttonsPadre }) => {

  const [elements, setelements] = useState([])

  useEffect(() => {
    setelements(uploadedDocuments)
  }, [uploadedDocuments]);

  useEffect(() => {
    if (elementRemoved) {
      onDeleteElementInternal(elementRemoved)
    }
  }, [elementRemoved]);

  const dragAndDropRef = useRef();

  const handleOpenDragAndDrop = () => {
    if (dragAndDropRef?.current) {
      dragAndDropRef.current.openDragAndDrop();
    }
  };
  const handleSubmitInternal = ({ typeSubmit, data }) => {
    console.log("data",data);
    switch (typeSubmit) {
      case 1:
        onUploadFiles(data)
        break;
      case 2:
        onSendForApproval(data)
        break;
      default:
        break;
    }
  }


  const onDeleteElementInternal = (element) => {
    const updatedElement = elements.filter(item => item?.id !== element?.id);
    setelements(updatedElement);
  }
  const handleOnDropFiles = (droppedFiles = []) => {
    if (droppedFiles.length > 0) {
      setelements(
        [
          ...elements,
          ...droppedFiles.map((file, i) => {
            return {
              ...file,
              element: file.type === "application/pdf"
                ? <CustomViewFile pdfUrl={file.blobURL} displayToolbar={false} key={i} />
                : <CustomViewImage previewUrls={file.blobURL} key={i} />
            }
          })
        ]
      )
    }
  }
  return (
    <CustomDragAndDrop
      ref={dragAndDropRef}
      disabledDragAndDrop={disabledDragAndDrop}
      onDropEmit={handleOnDropFiles}
    >
      {
        <GridFilesPreview
          openDragAndDropFunction={handleOpenDragAndDrop}
          disabledDragAndDrop={disabledDragAndDrop}
          onSubmit={handleSubmitInternal}
          elements={elements}
          onDeleteElement={handleOnDeleteElement}
          tipoDocumentos={tipoDocumentos}
          buttonsPadre={buttonsPadre}
          onClickDragAndDropInitialMessage={handleOpenDragAndDrop}
        />
      }
    </CustomDragAndDrop>
  );
};

export default CustomFileUpload;
