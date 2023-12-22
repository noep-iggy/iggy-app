/* eslint-disable indent */
import { UseFormSetError } from 'react-hook-form';

export function formatValidationErrorMessage(
  messages: string[] | string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: UseFormSetError<any>
) {
  if (!messages) return {};
  if (Array.isArray(messages)) {
    const validations = messages
      .map((m) => m.split('fields.')[1])
      .filter((m) => m);
    if (validations.length > 0) {
      validations.forEach((validation) => {
        const [item, type] = validation.split('.');
        setError(
          item,
          { type, message: `fields.${validation}` },
          { shouldFocus: true }
        );
      });
    } else {
      return undefined;
    }
  } else {
    const isValidation = messages.includes('fields.');
    if (!isValidation) return undefined;
    const [item, type] = messages.split('fields.')[1].split('.');
    setError(
      item,
      { type, message: `fields.${messages}` },
      { shouldFocus: true }
    );
  }
}
