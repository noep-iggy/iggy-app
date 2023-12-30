import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Stepper } from '@/components/Stepper';
import { useState } from 'react';
import {
  RegisterAddAnimal,
  RegisterHouse,
  RegisterUser,
} from '@/components/Register';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);

  function renderStep() {
    switch (currentStep) {
      case 0:
        return <RegisterUser setCurrentStep={setCurrentStep} />;
      case 1:
        return <RegisterHouse setCurrentStep={setCurrentStep} />;
      case 2:
        return <RegisterAddAnimal />;
    }
  }

  return (
    <UniversalSafeArea
      style={[
        {
          justifyContent: 'space-between',
          padding: 16,
        },
      ]}
      edges={['right', 'left', 'bottom']}
    >
      <Stepper currentStep={currentStep} totalSteps={3} />
      {renderStep()}
    </UniversalSafeArea>
  );
}
