import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

const FileRejectionComponent = ({ rejectedFiles }) => {
    const rejectedFilesInfo = rejectedFiles.map(file => {
        return {
            name: file.file.name,
            type: file.file.type,
            reason: file.errors[0].message
        };
    });

    return (
        <>
            <Typography variant="body2">Los siguientes archivos no han sido aceptados:</Typography>
            <List>
                {rejectedFilesInfo.map((fileInfo, index) => (
                    <div key={index}>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="body1" component="span" fontWeight="bold">
                                            Nombre Archivo:
                                        </Typography>
                                        {` ${fileInfo.name}`}
                                    </>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1" component="span" fontWeight="bold">
                                            Razón:
                                        </Typography>
                                        {` ${fileInfo.reason}`}
                                    </>
                                }
                            />
                        </ListItem>
                        {index !== (rejectedFilesInfo.length - 1) && <Divider />}
                    </div>
                ))}
            </List>
        </>
    );
}

export default FileRejectionComponent