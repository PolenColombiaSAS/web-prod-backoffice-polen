const dragAndDropThumbStyle = ({ isFocused, isDragAccept, isDragReject, previewUrls }) => {
    let borderColor = '#eaeaea'
    if (isFocused) {
        borderColor = '#2196f3';
    }
    if (isDragAccept) {
        borderColor = '#00e676';
    }
    if (isDragReject) {
        borderColor = '#ff1744';
    }
    const thumb = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        border: '5px dashed #eaeaea',
        borderColor: borderColor,
        backgroundColor: "#fafafa",
        width: "100%",
        height:"100%",
        margin:"auto",
        boxSizing: 'border-box',
        p:2
    };
    return thumb;
}
export default dragAndDropThumbStyle