import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Stepper } from '@/components/Stepper';
import { useState } from 'react';
import { RegisterHouse, RegisterUser } from '@/components/Register';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);

  function renderStep() {
    switch (currentStep) {
      case 0:
        return <RegisterUser setCurrentStep={setCurrentStep} />;
      case 1:
        return <RegisterHouse setCurrentStep={setCurrentStep} />;
    }
  }

  return (
    <UniversalSafeArea
      style={[
        {
          padding: 16,
          justifyContent: 'space-around',
        },
      ]}
    >
      <Stepper currentStep={currentStep} totalSteps={3} />
      {renderStep()}
    </UniversalSafeArea>
  );
}
