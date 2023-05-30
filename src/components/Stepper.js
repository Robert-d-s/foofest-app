import { ChakraProvider } from "@chakra-ui/react";
// import chakraTheme from "@chakra-ui/theme";

import { Box } from "@chakra-ui/react";

import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from "@chakra-ui/react";

// const { Box, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } = chakraTheme.components;

// const theme = extendBaseTheme({
//   components: {
//     Box,
//     Step,
//     StepIcon,
//     StepIndicator,
//     StepNumber,
//     StepSeparator,
//     StepStatus,
//     StepTitle,
//     Stepper,
//   },
// });

const steps = [{ title: "Tickets" }, { title: "Campsite" }, { title: "Personal details" }, { title: "Payment" }];

export default function StepperBar() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <ChakraProvider>
      <Stepper index={activeStep} size="md">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </ChakraProvider>
  );
}
