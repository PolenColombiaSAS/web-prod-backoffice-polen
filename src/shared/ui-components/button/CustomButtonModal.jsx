import { forwardRef, useImperativeHandle, useRef } from "react";
import CustomModal from "../layout/CustomModal";
import CustomButtonsWithIconsAndLabel from "./CustomButtonsWithIconsAndLabel";
import CustomIconButton from "./CustomIconButton";

const CustomButtonModal = forwardRef(({
    children,
    stickyElement,
    iconName,
    color,
    buttonLabel,
    onlyIcon = true,
    zIndex,
    onCloseModal
}, ref) => {

    const modalRef = useRef();
    const handleButtonClick = () => {
        if (modalRef?.current) {
            modalRef.current.openModal();
        }
    }
    
    const handleOnCloseModal = () => {
        if (typeof onCloseModal === "function") {
            onCloseModal()
        }
    }
    const handleOnClose = () => {
        if (modalRef?.current) {
            modalRef.current.closeModal();
        }
    }

    useImperativeHandle(ref, () => ({
        closeModal: () => {
            handleOnClose();
        }
    }));
    return (
        <>
            {
                !onlyIcon
                    ? <CustomButtonsWithIconsAndLabel
                        iconName={iconName}
                        onAction={handleButtonClick}
                        name={buttonLabel}
                        variant='outlined'
                        color={color}
                    />
                    : <CustomIconButton iconName={iconName} color={color}  onAction={handleButtonClick} />
            }
            <CustomModal 
                ref={modalRef}
                stickyElement={stickyElement}
                zIndex={zIndex}
                onClose={handleOnCloseModal}
            >
                {children}
            </CustomModal>
        </>
    )
})

export default CustomButtonModal