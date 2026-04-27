"use client";
import React, {useEffect, useRef, useState} from "react";
import Spinner from '@/app/(admin)/admin/components/Spinner';

interface ApiResponse {
  success?: boolean;
  status?: string;
  message?: string;
  [key: string]: unknown;
}
// For type safety, define a FormData type matching dynamic fields
type FormData = { [key: string]: string | number | boolean | undefined };
// For responsive behavior
const DESKTOP_BREAKPOINT = 640; // Tailwind `sm`

// Defines each field's properties dynamically
export interface FieldSchema {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "date" | "select" | "textarea" | "password" | "timeRange" | "checkbox";
  required?: boolean;
  options?: { label: string; value: string }[];  // for select inputs
  placeholder?: string;
  disabled?: boolean;
  /** Optional callback when this field’s value changes */
  onChange?: (value: string | number | boolean | undefined, formData: FormData) => void;
}

interface DynamicFormModalProps {
  visible: boolean;
  title: string;
  fields: FieldSchema[];
  initialData?: FormData;
  onSubmitAction: (data: FormData) => Promise<ApiResponse>;
  onCloseAction: () => void;
}

export default function DynamicFormModal({
  visible,
  title,
  fields,
  initialData = {},
  onSubmitAction,
  onCloseAction,
}: DynamicFormModalProps) {
  // Track desktop vs mobile
  const [isDesktop, setIsDesktop] = useState(false);
  // Wizard step for desktop
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect desktop vs mobile
  useEffect(() => {
    function update() {

      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Sync form data when modal opens, but only update if different from initialData
  useEffect(() => {
    if (visible) {
      setFormData(prev => {
        if (JSON.stringify(prev) !== JSON.stringify(initialData)) {
          return initialData;
        }
        return prev;
      });
    }
  }, [visible, initialData]);

  // Chunk fields into pages of 4 for desktop wizard
  const chunkSize = 4;
  const pages: FieldSchema[][] = [];
  for (let i = 0; i < fields.length; i += chunkSize) {
    pages.push(fields.slice(i, i + chunkSize));
  }
  const totalSteps = isDesktop ? pages.length : 1;
  const currentFields = isDesktop ? pages[step] : fields;

  // Close modal on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onCloseAction();
      }
    }
    if (visible) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [visible, onCloseAction]);

  if (!visible) return null;

  // Close when clicking outside the modal content
  function handleBackdropClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onCloseAction();
    }
  }

  // Update individual field value
  function handleChange(name: string, value: string | number | boolean | undefined) {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Form submission handler with validation
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setApiError(null);
    setShowSaved(false);
    setIsSaving(true);
    try {
      const newErrors: Record<string, string> = {};
      fields.forEach(field => {
        const value = formData[field.name];
        // Empty check for all fields
        if (value === undefined || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.name] = `${field.label} is required`;
          return;
        }
        // Number validation
        if (field.type === 'number') {
          if (typeof value !== 'number' || isNaN(value)) {
            newErrors[field.name] = `${field.label} must be a valid number`;
            return;
          }
        }
        // Email format validation
        if (field.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(String(value))) {
            newErrors[field.name] = `${field.label} must be a valid email`;
            return;
          }
        }
        // Date format validation
        if (field.type === 'date') {
          if (isNaN(Date.parse(String(value)))) {
            newErrors[field.name] = `${field.label} must be a valid date`;
            return;
          }
        }
        // Password length validation
        if (field.type === 'password') {
          if (typeof value === 'string' && value.length < 8) {
            newErrors[field.name] = `${field.label} must be at least 8 characters`;
            return;
          }
        }
      });
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      const response: ApiResponse = await onSubmitAction(formData);
      if (response.success === false || response.status === 'error') {
        setApiError(response.message || 'Submission failed');
        return;
      }
      setErrors({});
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    } catch (err) {
      setApiError((err as Error).message || 'Submission failed');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-lg shadow-xl w-full max-w-full sm:max-w-xl p-6 overflow-auto max-h-[90vh] sm:overflow-visible"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onCloseAction}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Show step indicator on desktop */}
            {isDesktop && totalSteps > 1 && (
              <div className="mb-4 text-sm font-medium">
                Step {step + 1} of {totalSteps}
              </div>
            )}
            {apiError && (
              <div className="text-red-600 mb-4">
                {apiError}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentFields.map(field => (
                <div key={field.name} className="flex flex-col">
                  <label htmlFor={field.name} className="mb-1 font-medium">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={String(formData[field.name] ?? "")}
                      onChange={e => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={field.disabled}
                      className="border p-2 rounded"
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={String(formData[field.name] ?? "")}
                      onChange={e => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={field.disabled}
                      className="border p-2 rounded"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <input
                      id={field.name}
                      name={field.name}
                      type="checkbox"
                      checked={Boolean(formData[field.name])}
                      onChange={e => handleChange(field.name, e.target.checked)}
                      disabled={field.disabled}
                      className="h-4 w-4"
                    />
                  ) : field.type === "timeRange" ? (
                    <input
                      id={field.name}
                      name={field.name}
                      type="time"
                      className="border rounded px-2 py-1"
                      value={String(formData[field.name] ?? "")}
                      onChange={e => handleChange(field.name, e.target.value)}
                      required={field.required}
                      disabled={field.disabled}
                    />
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.type === 'password' ? 'new-password' : undefined}
                      placeholder={field.placeholder}
                      value={String(formData[field.name] ?? "")}
                      onChange={e =>
                        handleChange(
                          field.name,
                          field.type === "number"
                            ? e.target.valueAsNumber
                            : e.target.value
                        )
                      }
                      required={field.required}
                      disabled={field.disabled}
                      className="border p-2 rounded"
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                disabled={isSaving}
              >
                {isSaving ? <Spinner colorClass="white" /> : 'Save'}
              </button>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={onCloseAction}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                {isDesktop && step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-4 py-2 rounded border hover:bg-gray-100"
                  >
                    Previous
                  </button>
                )}
                {isDesktop && step < totalSteps - 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSaving && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-white border shadow-md rounded flex items-center space-x-2">
          <Spinner colorClass="purple"/>
          <span>Saving...</span>
        </div>
      )}
      {showSaved && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-white border shadow-md rounded flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8.414 8.414a1 1 0 01-1.414 0L3.293 11.12a1 1 0 011.414-1.414l3.172 3.172 7.707-7.707a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Saved</span>
        </div>
      )}
    </div>
  );
}