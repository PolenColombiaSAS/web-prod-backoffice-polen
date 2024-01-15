import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import CustomButtons from './button/CustomButtons';


const CustomHorizontalNonLinearStepper = forwardRef(({
    children,
    stepsLabel = [],
    onStepChange,
    onNext,
    onTerminar,
    showButton = true,
    onShowBtnNext,
    onShowBtnPrevious,
    onShowBtnFinish,

}, ref) => {
    const [internalActiveStep, setInternalActiveStep] = useState(0);

    useEffect(() => {
        if (typeof onStepChange === "function") {
            onStepChange(internalActiveStep)
        }
        if (typeof onShowBtnNext === "function") {
            onShowBtnNext((stepsLabel.length - 1) !== internalActiveStep)
        }
        if (typeof onShowBtnPrevious === "function") {
            onShowBtnPrevious(internalActiveStep !== 0)
        }
        if (typeof onShowBtnFinish === "function") {
            onShowBtnFinish((stepsLabel.length - 1) === internalActiveStep)
        }
    }, [internalActiveStep])


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    useImperativeHandle(ref, () => ({
        onNext: () => {
            handleNext();
        },
        onBack: () => {
            handleBack();
        },
        onFinish: () => {
            handleOnTerminar()
        }
    }));

    const handleNext = async () => {
        if (typeof onNext === 'function') {
            const canContinue = await onNext();
            if (canContinue) {
                setInternalActiveStep(internalActiveStep + 1);
            }
        } else {
            setInternalActiveStep(internalActiveStep + 1);
        }
    };

    const handleBack = () => {
        setInternalActiveStep(internalActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setInternalActiveStep(step);
    };
    const handleOnTerminar = () => {
        if (typeof onTerminar === 'function') {
            onTerminar()
        }
    }
    const customButtonsInfo = [
        {
            type: "back",
            action: handleBack,
            disabled: internalActiveStep === 0,
            variant: "text",
        },
        (stepsLabel.length - 1) !== internalActiveStep && {
            type: "next",
            action: handleNext,
            variant: "text"
        },
        (stepsLabel.length - 1) === internalActiveStep && {
            type: "finish",
            action: handleOnTerminar,
            variant: "text"
        },

    ]

    return (
        <>
            <Grid container
            >
                <Grid item xs={12} sx={{ py: 5 }}>
                    <Box style={{ overflow: matches ? 'auto' : 'hidden' }}>
                        <Stepper
                            // alternativeLabel
                            nonLinear
                            activeStep={internalActiveStep}
                            orientation="horizontal"
                        >
                            {stepsLabel.map((label, index) => (
                                <Step
                                    key={label}
                                >
                                    <StepButton color="inherit" onClick={handleStep(index)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box >
                        {children}
                    </Box>
                </Grid>
                {showButton &&
                    <Grid item xs={12}>
                        <CustomButtons
                            justifyContent={"flex-end"}
                            infoButtons={customButtonsInfo} />
                    </Grid>
                }
            </Grid>
        </>
    );
})
export default CustomHorizontalNonLinearStepper