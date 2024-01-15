import { useEffect, useState } from 'react';
import CustomFormFilterComponent from './CustomFormFilterComponent';
import CustomPopper from 'shared/ui-components/CustomPopper';
import { Grid } from '@mui/material';
import CustomButtons from 'shared/ui-components/button/CustomButtons';
import { useForm, useFieldArray } from 'react-hook-form';

const CustomFilterComponent = ({ onFilterChange, columns = [] }) => {

  const [showFilters, setShowFilters] = useState(false);

  const { register, handleSubmit, control, setValue,formState: { errors }, reset, watch } = useForm({
    defaultValues: {
      filters: [{ campo: '', operator: '', value: '' }]
    }
  }); 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "filters"
  });

  useEffect(() => {
    if (fields?.length == 0) {
      append({ campo: '', operator: '', value: '' });
    }
  }, [fields])

  const infoButtons = [
    { type: "applyFilter", action: null, data: null, onlyIcon: false, buttonType: "submit" }
  ]
  const onSubmitInternal = (data) => {
    const fieldsFilter = data.filters.map(field => {
      const selectedColumn = columns.find(col => col.field === field.campo);
      return {
        ...field,
        column: selectedColumn
      }
    })
    if (typeof onFilterChange === "function") {
      onFilterChange(fieldsFilter);
      setShowFilters(false)
      handleRemoveFilter()
    }
  };

  const handleRemoveFilter = () => {
    remove(0);
    append({ campo: '', operator: '', value: '' });
  };
  return (
    <>
      <CustomPopper
        iconName={"FilterList"}
        open={showFilters}
        setOpen={setShowFilters}
        popperWidth={300}
        popperPlacement={"bottom-start"}
        buttonPopperName={"Filtro"}
      >
        <form onSubmit={handleSubmit(onSubmitInternal)} style={{ width: "100%", height: "100%" }}>
          <Grid
            sx={{ mb: 3 }}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {fields.map((field, index) => (
              <Grid
                xs
                item
                key={field.id}
              >
                <CustomFormFilterComponent
                  control={control}
                  errors={errors}
                  index={index}
                  columns={columns}
                  watch={watch} 
                  setValue={setValue}
                />
              </Grid>
            ))}
          </Grid>
          <CustomButtons
            justifyContent={"flex-end"}
            infoButtons={infoButtons}
          />
        </form>
      </CustomPopper>
    </>

  );
};

export default CustomFilterComponent;
