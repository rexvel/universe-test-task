import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea, Button } from '@/components';

interface FormValues {
  text: string;
}

interface Props {
  onConvert: (text: string) => void;
  isLoading?: boolean;
  apiError?: string | null;
}

export const ConversionForm: React.FC<Props> = ({
  onConvert,
  isLoading = false,
  apiError = null,
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      text: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.text.trim() === '') {
      setValidationError('Text cannot be empty');
      console.error(errors);
    } else {
      setValidationError(null);
      onConvert(data.text);
    }
  };

  const displayError = validationError || apiError;

  return (
    <section className="p-2 md:p-4">
      <article>
        <h2 className="text-xl font-semibold mb-3">Convert Text to PDF</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Textarea
              {...register('text')}
              placeholder="Enter your text here"
              className="flex-grow w-full"
              disabled={isLoading}
            />
            {displayError && <p className="text-red-500 text-sm mt-1">{displayError}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Converting...' : 'Convert text to pdf'}
          </Button>
        </form>
      </article>
    </section>
  );
};
