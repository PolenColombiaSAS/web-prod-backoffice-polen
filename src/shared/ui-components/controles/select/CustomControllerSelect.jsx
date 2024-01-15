import { FormControl, FormHelperText, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import CustomSearchBox from "./CustomSearchBox";
import CustomModal from "../../layout/CustomModal";

const ITEM_HEIGHT = 48;

const CustomControllerSelect = ({
    name,
    control,
    defaultValue = "",
    rules = {},
    // setValue,
    label = "",
    valueProperty = "id",
    nameProperty = "nombre",
    formatLabel,
    errors,
    options = [],
    disabled = false,
    errorMessage,
    zIndexMenuDesplegable = 1000
}) =>
{
    const [labelId, setlabelId] = useState(uuidv4())
    const [optionsInternal, setoptionsInternal] = useState([])
    const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
    const [selectWidth, setSelectWidth] = useState(null);
    const [internatDisabled, setinternatDisabled] = useState(false)

    const modalRef = useRef();
    const fieldRef = useRef();

    const inputLabelRef = useRef(null);

    const theme = useTheme();

    useEffect(() =>
    {
        if (disabled)
        {
            setinternatDisabled(disabled);
        } else
        {
            if (optionsInternal.length === 1)
            {
                const uniqueOption = optionsInternal[0];
                if (fieldRef.current && !internatDisabled)
                {
                    fieldRef.current.onChange(uniqueOption.value);
                }
                // setValue(name, uniqueOption.value);
                setinternatDisabled(true);
            } else
            {
                setinternatDisabled(disabled);
            }
        }
    }, [optionsInternal, disabled]);

    useEffect(() =>
    {
        const optionsWithVisible = options.map(option =>
        {

            return ({
                obj: { ...option },
                value: option[valueProperty],
                label: typeof formatLabel === "function" ? formatLabel(option) : option[nameProperty],
                visible: true
            })
        });
        setoptionsInternal(optionsWithVisible)
    }, [options]);
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 6.5,
                width: selectWidth ? `${selectWidth}px` : 'auto'
            },
        },
        style: {
            zIndex: zIndexMenuDesplegable
        },
    };

    const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));

    const handleOnSearchTextField = (searchValue) =>
    {
        const filteredOptions = optionsInternal.map(option => ({
            ...option,
            visible: typeof option?.label === 'string' && option?.label?.toLowerCase().includes(searchValue.toLowerCase())
        }));
        setoptionsInternal(filteredOptions);
    };

    const handleOnOpenDropDownMenu = (event) =>
    {
        if (inputLabelRef.current)
        {
            setSelectWidth(inputLabelRef.current.offsetWidth);
        }
        if (isXsScreen)
        {
            if (modalRef?.current)
            {
                modalRef.current.openModal();
            }
        } else
        {
            setDropdownMenuOpen(true)
        }
    };
    const handleOnCloseDropDownMenu = () =>
    {
        setDropdownMenuOpen(false)
        handleOnSearchTextField("")
    };
    const handleOptionClick = (event, option) =>
    {
        if (modalRef?.current)
        {
            modalRef.current.closeModal();
        }

        if (fieldRef.current)
        {
            fieldRef.current.onChange(option?.value);
        }

        // setValue(name, option?.value);
        handleOnSearchTextField("")
    };



    return (
        <>
            {
                optionsInternal?.length == 0 &&
                <FormControl fullWidth>
                    <InputLabel id="">{label}</InputLabel>
                    <Select
                        labelId=""
                        id=""
                        disabled={true}
                        value={-1}
                        label={label}
                    >
                        <MenuItem value={-1}>No hay opciones disponibles</MenuItem>
                    </Select>
                </FormControl>
            }
            {
                optionsInternal?.length > 0 &&
                <Controller

                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    rules={rules}
                    render={({ field }) =>
                    {

                        fieldRef.current = field;
                        return (
                            <>
                                <FormControl
                                    ref={inputLabelRef}
                                    fullWidth
                                    error={Boolean(errors)}
                                >
                                    <InputLabel id={`label-id-${labelId}`}>{label}</InputLabel>
                                    <Select
                                        labelId={`label-id-${labelId}`}
                                        id={`select-id-${labelId}`}
                                        open={dropdownMenuOpen}
                                        onClose={handleOnCloseDropDownMenu}
                                        onOpen={handleOnOpenDropDownMenu}
                                        autoWidth
                                        {...field}
                                        disabled={internatDisabled}
                                        variant="outlined"
                                        label={label}
                                        error={Boolean(errors)}
                                        MenuProps={MenuProps}
                                    >
                                        <CustomSearchBox
                                            onSearchTextField={handleOnSearchTextField}
                                        />
                                        {optionsInternal?.length == 0 &&
                                            <MenuItem
                                                value={""}
                                            >
                                                No hay opciones disponibles
                                            </MenuItem>
                                        }
                                        {optionsInternal.map((option) => (
                                            <MenuItem

                                                key={option?.value}
                                                value={option?.value}
                                                sx={{ display: !option?.visible && "none", width: "100%" }}
                                            >
                                                {option?.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {
                                        errors &&
                                        <FormHelperText>
                                            {errorMessage ? errorMessage : "Seleccione una opcion"}
                                        </FormHelperText>
                                    }
                                </FormControl>
                            </>

                        )
                    }}
                />
            }
            <CustomModal
                ref={modalRef}
                sx={{
                    width: "95%",
                    maxHeight: "75%",
                }}
                stickyElement={
                    <CustomSearchBox
                        onSearchTextField={handleOnSearchTextField}
                        title="seleccione una opción"
                    />
                }
            >

                {optionsInternal.map((option) => (
                    <MenuItem
                        key={option?.value}
                        value={option?.value}
                        sx={{ display: !option?.visible && "none", width: "100%" }}
                        onClick={(event) => handleOptionClick(event, option)}
                    >
                        {option?.label}
                    </MenuItem>
                ))}
            </CustomModal>
        </>

    )
}
export default CustomControllerSelect

