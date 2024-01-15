import { Box, Chip, Grid } from "@mui/material";
import CustomSearchFilter from "./CustomSearchFilter";
import CustomFilterComponent from "./filterToolBar/CustomFilterComponent";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { buscarOperatorsTypePorValor } from "./filterToolBar/typeOperator";
import dayjs from "dayjs";
const ContainerCustomToolbar = ({ onSearchChange, onFilterChange, columns = [] }) => {
    const [fieldFilters, setFieldFilters] = useState([])

    useEffect(() => {
        if (fieldFilters) {
            if (typeof onFilterChange === "function") {
                const filters = []

                const currentDate = dayjs();
                fieldFilters.forEach(x => {
                    const optionSelected = buscarOperatorsTypePorValor(x.operator)
                    if (optionSelected.isValueNeed) {
                        if (optionSelected.value == "date.specifiedDay") {
                            const specifiedDay = dayjs(x.value); // Asumiendo que x.value es una fecha en formato de cadena válida
                            const filterStartSpecifiedDay = {
                                ...x,
                                operator: "date.gte",
                                value: `${specifiedDay.format('YYYY-MM-DD')}T00:00:00Z`
                            };
                            const filterEndSpecifiedDay = {
                                ...x,
                                operator: "date.lte",
                                value: `${specifiedDay.format('YYYY-MM-DD')}T23:59:59Z`
                            };
                            filters.push(filterStartSpecifiedDay);
                            filters.push(filterEndSpecifiedDay);
                        } else {
                            filters.push(x)
                        }
                    } else {
                        switch (x.operator) {
                            case "date.today":
                                const todayDate = currentDate;
                                const filterToday = {
                                    ...x,
                                    operator: "date.gt",
                                    value: `${todayDate.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterToday)
                                break;
                            case "date.yesterday":
                                const yesterdayDate = currentDate.subtract(1, 'day');
                                const filterYesterday = {
                                    ...x,
                                    operator: "date.gt",
                                    value: `${yesterdayDate.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterYesterday)
                                break;
                            case "date.thisWeek":
                                const startOfWeek = currentDate.startOf('week');
                                const filterStartOfWeek = {
                                    ...x,
                                    operator: "date.gte",
                                    value: `${startOfWeek.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterStartOfWeek);
                                break;
                            case "date.last7days":
                                const sevenDaysAgoDate = currentDate.subtract(7, 'day');
                                const filterSevenDaysAgo = {
                                    ...x,
                                    operator: "date.gt",
                                    value: `${sevenDaysAgoDate.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterSevenDaysAgo)
                                break;
                            case "date.thisMonth":
                                const startOfMonth = currentDate.startOf('month');
                                const filterStartOfMonth = {
                                    ...x,
                                    operator: "date.gte",
                                    value: `${startOfMonth.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterStartOfMonth);
                                break;
                            case "date.last30days":
                                const thirtyDaysAgoDate = currentDate.subtract(30, 'day');
                                const filterThirtyDaysAgo = {
                                    ...x,
                                    operator: "date.gt",
                                    value: `${thirtyDaysAgoDate.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterThirtyDaysAgo)
                                break;
                            case "date.lastMonth":
                                const firstDayLastMonth = currentDate.subtract(1, 'month').startOf('month');
                                const lastDayLastMonth = currentDate.startOf('month').subtract(1, 'day');
                                const filterStartLastMonth = {
                                    ...x,
                                    operator: "date.gte", // nota el cambio de 'gt' a 'gte' para incluir el primer día
                                    value: `${firstDayLastMonth.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                const filterEndLastMonth = {
                                    ...x,
                                    operator: "date.lte", // nota el cambio de 'lt' a 'lte' para incluir el último día
                                    value: `${lastDayLastMonth.format('YYYY-MM-DD')}T23:59:59Z`
                                };
                                filters.push(filterStartLastMonth);
                                filters.push(filterEndLastMonth);
                                break;
                            case "lastThreeMonth":
                                const threeMonthsAgoStart = currentDate.subtract(3, 'month').startOf('month');
                                const filterStartThreeMonthsAgo = {
                                    ...x,
                                    operator: "date.gte",
                                    value: `${threeMonthsAgoStart.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterStartThreeMonthsAgo);
                                break;
                            case "lastSixMonth":
                                const sixMonthsAgoStart = currentDate.subtract(6, 'month').startOf('month');
                                const filterStartSixMonthsAgo = {
                                    ...x,
                                    operator: "date.gte",
                                    value: `${sixMonthsAgoStart.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterStartSixMonthsAgo);
                                break;
                            case "date.thisYear":
                                const startOfYear = currentDate.startOf('year');
                                const filterStartOfYear = {
                                    ...x,
                                    operator: "date.gte",
                                    value: `${startOfYear.format('YYYY-MM-DD')}T00:00:00Z`
                                };
                                filters.push(filterStartOfYear);
                                break;
                            default:
                                break;
                        }
                    }
                })


                onFilterChange(filters);
            }
        }
    }, [fieldFilters])


    const handleOnFilterChange = (data = []) => {
        const newDataWithId = data.map(x => {
            const id = uuidv4()
            const optionSelected = buscarOperatorsTypePorValor(x.operator)
            const tipoFiltrado = x.operator.split(".")[0]
            if (tipoFiltrado == "date") {
                if (optionSelected.isValueNeed) {
                    x.value = x.value.format('YYYY-MM-DD')
                }
            }
            return {
                ...x,
                id
            }
        })


        const filters = [...fieldFilters, ...newDataWithId]
        setFieldFilters(filters)

    }
    const handleDelete = (fieldFilterDelete) => {
        const newFieldFilter = fieldFilters.filter(x => x.id != fieldFilterDelete.id)
        setFieldFilters(newFieldFilter)
    }
    return (
        <Box sx={{
            p: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
           
        }}>
            <Grid container alignItems="center" sx={{py:1}} spacing={1}>
                <Grid item xs={12} sm={12} md={6} order={{ xs: 2, sm: 2, md: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <CustomFilterComponent onFilterChange={handleOnFilterChange} columns={columns} />
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6} order={{ xs: 1, sm: 1, md: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CustomSearchFilter onSearchChange={onSearchChange}
                            sx={{ width: { xs: "100%", sm: "100%", md: "300px" } }}
                        />
                    </Box>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={12} >
                    <Box display="flex" flexWrap="wrap">
                        {fieldFilters.map((field) => {
                            const tipoFiltrado = field.operator.split(".")[0]
                            const iconLabel =
                                tipoFiltrado == "string" ?
                                    (<FindInPageIcon />)
                                    : (tipoFiltrado == "date" ?
                                        <CalendarMonthIcon />
                                        : null)
                            const operador = field.operator.split(".")[1]
                            const value = field.value ? ` - "${field.value}"` : "";
                            const labelComponent = <Box sx={{ display: "flex", alignItems: "center" }}>
                                {iconLabel} <strong>{field?.column?.headerName}</strong>{`: ${operador}${value}`}
                            </Box>
                            return (
                                <Chip sx={{ mr: 3, mb: 1 }} key={field.id} label={labelComponent} onDelete={() => { handleDelete(field) }} />
                            )
                        })}
                    </Box>

                </Grid>
            </Grid>
        </Box>
    );
}
export default ContainerCustomToolbar
