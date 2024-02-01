import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Stepper } from '@/components/Stepper';
import { useState } from 'react';
import {
  AddJoinCode,
  JoinChildHouse,
  JoinParentHouse,
} from '@/components/Join';
import { JoinCodeDto, JoinCodeTypeEnum } from '@/types';
import { KeyboardAvoidingView, Platform } from 'react-native';

export default function Join() {
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState<JoinCodeDto>();

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <AddJoinCode setCode={setCode} setCurrentStep={setCurrentStep} />
        );
      case 1:
        if (code)
          return code.type === JoinCodeTypeEnum.PARENT ? (
            <JoinParentHouse joinCode={code} />
          ) : (
            <JoinChildHouse joinCode={code} />
          );
    }
  }

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <UniversalSafeArea
        style={[
          {
            justifyContent: 'space-between',
            padding: 16,
          },
        ]}
        edges={['right', 'left', 'bottom']}
      >
        <Stepper currentStep={currentStep} totalSteps={2} />
        {renderStep()}
      </UniversalSafeArea>
    </KeyboardAvoidingView>
  );
}
