import { useState } from 'react';
import { contactService } from '@/lib/services/api-endpoints';
import type { ContactFormData } from '@/lib/types/api';

export interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useContactForm(): UseContactFormReturn {
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await contactService.sendMessage(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        resetForm();
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitError('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error sending contact message:', error);
      setSubmitError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setSubmitError(null);
  };

  return {
    formData,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
