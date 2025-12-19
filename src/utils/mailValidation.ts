/**
 * Sanitize string input by removing potentially dangerous characters
 * and trimming whitespace
 */
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent basic XSS
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .substring(0, 255); // Limit length
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321
};

/**
 * Validate name input
 */
export const isValidName = (name: string): boolean => {
  const trimmedName = name.trim();
  return (
    trimmedName.length >= 2 &&
    trimmedName.length <= 100 &&
    /^[a-zA-Z\s\u00C0-\u024F\u1E00-\u1EFF]+$/.test(trimmedName) // Letters, spaces, and common diacritics
  );
};

/**
 * Validate and sanitize form data
 */
export interface WaitlistFormData {
  name: string;
  email: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    name?: string;
    email?: string;
  };
  sanitizedData?: WaitlistFormData;
}

export const validateWaitlistForm = (data: WaitlistFormData): ValidationResult => {
  const errors: { name?: string; email?: string } = {};

  // Sanitize inputs first
  const sanitizedName = sanitizeString(data.name);
  const sanitizedEmail = sanitizeString(data.email.toLowerCase());

  // Validate name
  if (!sanitizedName) {
    errors.name = 'Nama wajib diisi';
  } else if (!isValidName(sanitizedName)) {
    errors.name = 'Nama harus berisi 2-100 karakter dan hanya huruf';
  }

  // Validate email
  if (!sanitizedEmail) {
    errors.email = 'Email wajib diisi';
  } else if (!isValidEmail(sanitizedEmail)) {
    errors.email = 'Format email tidak valid';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    sanitizedData: isValid
      ? { name: sanitizedName, email: sanitizedEmail }
      : undefined,
  };
};
