import UniversalSafeArea from '@/components/Commons/UniversalSafeArea';
import { Stepper } from '@/components/Stepper';
import {
  RegisterAddAnimal,
  RegisterHouse,
  RegisterUser,
} from '@/components/Register';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { RegisterPayment } from '@/components/Register/RegisterPayment';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { BillingPlanTypeEnum } from '@/types';

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const splashImage = require('@/assets/images/app/splash.png');
  const [purshaseType, setPurshaseType] = useState(BillingPlanTypeEnum.MONTHLY);

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <RegisterPayment
            purshaseType={purshaseType}
            setPurshaseType={setPurshaseType}
            setCurrentStep={setCurrentStep}
          />
        );
      case 1:
        return <RegisterUser setCurrentStep={setCurrentStep} />;
      case 2:
        return (
          <RegisterHouse
            purshaseType={purshaseType}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return <RegisterAddAnimal />;
    }
  }

  return (
    <UniversalSafeArea
      style={[{ height: '100%' }]}
      asView
      edges={['right', 'left', 'bottom', 'top']}
    >
      {currentStep === 0 ? (
        <ImageBackground style={{ height: '100%' }} source={splashImage}>
          <Stepper currentStep={currentStep} totalSteps={4} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {renderStep()}
          </KeyboardAvoidingView>
        </ImageBackground>
      ) : (
        <ScrollView style={{ paddingHorizontal: 16 }}>
          <Stepper currentStep={currentStep} totalSteps={4} />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {renderStep()}
          </KeyboardAvoidingView>
        </ScrollView>
      )}
    </UniversalSafeArea>
  );
}
