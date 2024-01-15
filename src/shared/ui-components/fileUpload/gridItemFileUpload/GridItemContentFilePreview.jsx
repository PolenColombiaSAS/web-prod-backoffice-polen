import { Stack } from '@mui/material';
import GridItemContainerFilePreview from './GridItemContainerFilePreview';
import GridItemContainerBadgeImageUpdloal from './GridItemContainerBadgeImageUpdload';

const GridItemContentFilePreview = ({ children, onDelete, imageUploaded, disableDeleteButton }) => {

    return (
        <GridItemContainerFilePreview
            disableDeleteButton={disableDeleteButton}
            onDeleteElement={onDelete}
        >
            <GridItemContainerBadgeImageUpdloal imageUploaded={imageUploaded} />
            <Stack>
                {children}
            </Stack>
        </GridItemContainerFilePreview>
    )
}
export default GridItemContentFilePreview