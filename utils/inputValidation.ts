// utils/inputValidation.ts
/**
 * Comprehensive input validation and sanitization utilities
 * Prevents SQL injection, XSS, and other malicious input
 */

// Maximum length constraints
export const INPUT_LIMITS = {
  EMAIL: 320, // RFC 5321 standard maximum
  ADDITIONAL_INFO: 2000, // Reasonable limit for text areas
  GENERAL_TEXT: 500, // For general text inputs
  NAME: 100, // For name fields
} as const;

// Allowed characters patterns
const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  SAFE_TEXT: /^[a-zA-Z0-9\s.,!?'"()-]+$/, // Basic safe characters
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
} as const;

// SQL injection detection patterns
const SQL_INJECTION_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|JAVASCRIPT)\b)/i,
  /(--|\/\*|\*\/|;|'|"|`)/,
  /(\bOR\b|\bAND\b).*[=<>]/i,
  /\b(WAITFOR|DELAY)\b/i,
  /(xp_|sp_)/i,
] as const;

// XSS detection patterns
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<\s*\w.*?>/gi,
] as const;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export interface ValidationOptions {
  maxLength?: number;
  allowHtml?: boolean;
  customPattern?: RegExp;
  required?: boolean;
}

/**
 * Validates and sanitizes email input
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  // Length check
  if (email.length > INPUT_LIMITS.EMAIL) {
    return {
      isValid: false,
      error: `Email must be less than ${INPUT_LIMITS.EMAIL} characters`,
    };
  }

  // Basic sanitization - trim whitespace
  const sanitized = email.trim().toLowerCase();

  // Format validation
  if (!PATTERNS.EMAIL.test(sanitized)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // SQL injection check
  if (containsSqlInjection(sanitized)) {
    return { isValid: false, error: "Invalid characters detected" };
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates and sanitizes text input with configurable options
 */
export function validateText(
  input: string,
  options: ValidationOptions = {}
): ValidationResult {
  const {
    maxLength = INPUT_LIMITS.GENERAL_TEXT,
    allowHtml = false,
    customPattern,
    required = false,
  } = options;

  if (!input && required) {
    return { isValid: false, error: "This field is required" };
  }

  if (!input) {
    return { isValid: true, sanitizedValue: "" };
  }

  // Length check
  if (input.length > maxLength) {
    return {
      isValid: false,
      error: `Input must be less than ${maxLength} characters`,
    };
  }

  // Basic sanitization
  let sanitized = input.trim();

  // SQL injection check
  if (containsSqlInjection(sanitized)) {
    return { isValid: false, error: "Invalid characters detected" };
  }

  // XSS check if HTML not allowed
  if (!allowHtml && containsXss(sanitized)) {
    return { isValid: false, error: "Invalid characters detected" };
  }

  // Custom pattern validation
  if (customPattern && !customPattern.test(sanitized)) {
    return { isValid: false, error: "Input contains invalid characters" };
  }

  // Additional sanitization for non-HTML content
  if (!allowHtml) {
    sanitized = sanitizeForDatabase(sanitized);
  }

  return { isValid: true, sanitizedValue: sanitized };
}

/**
 * Validates request type enum
 */
export function validateRequestType(requestType: string): ValidationResult {
  const allowedTypes = ["access", "delete", "opt-out"] as const;

  if (!requestType) {
    return { isValid: false, error: "Request type is required" };
  }

  if (!allowedTypes.includes(requestType as any)) {
    return {
      isValid: false,
      error: "Invalid request type selected",
    };
  }

  return { isValid: true, sanitizedValue: requestType };
}

/**
 * Validates opt-out type enum
 */
export function validateOptOutType(optOutType: string): ValidationResult {
  const allowedTypes = ["marketing", "all"] as const;

  if (!optOutType) {
    return { isValid: false, error: "Opt-out type is required" };
  }

  if (!allowedTypes.includes(optOutType as any)) {
    return {
      isValid: false,
      error: "Invalid opt-out type selected",
    };
  }

  return { isValid: true, sanitizedValue: optOutType };
}

/**
 * Checks for SQL injection patterns
 */
function containsSqlInjection(input: string): boolean {
  return SQL_INJECTION_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Checks for XSS patterns
 */
function containsXss(input: string): boolean {
  return XSS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Sanitizes input for database storage
 */
function sanitizeForDatabase(input: string): string {
  return (
    input
      // Remove null bytes
      .replace(/\0/g, "")
      // Escape single quotes
      .replace(/'/g, "''")
      // Remove or escape other potentially dangerous characters
      .replace(/[\x00-\x1f\x7f-\x9f]/g, "")
      // Normalize whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

/**
 * Rate limiting helper (for future implementation)
 */
export interface RateLimitCheck {
  isAllowed: boolean;
  remainingAttempts?: number;
  resetTime?: Date;
}

/**
 * Validates age input specifically
 */
export function validateAge(age: string | number): ValidationResult {
  const numericAge = typeof age === "string" ? parseInt(age, 10) : age;

  if (isNaN(numericAge)) {
    return { isValid: false, error: "Please enter a valid age" };
  }

  if (numericAge < 18) {
    return {
      isValid: false,
      error: "You must be at least 18 years old to use this service",
    };
  }

  if (numericAge > 120) {
    return { isValid: false, error: "Please enter a valid age" };
  }

  return { isValid: true, sanitizedValue: numericAge.toString() };
}

/**
 * Comprehensive form validation for privacy requests
 */
export function validatePrivacyRequestForm(data: {
  email: string;
  requestType: string;
  additionalInfo?: string;
}): { isValid: boolean; errors: Record<string, string>; sanitizedData?: any } {
  const errors: Record<string, string> = {};
  const sanitizedData: any = {};

  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  } else {
    sanitizedData.email = emailValidation.sanitizedValue;
  }

  // Validate request type
  const requestTypeValidation = validateRequestType(data.requestType);
  if (!requestTypeValidation.isValid) {
    errors.requestType = requestTypeValidation.error!;
  } else {
    sanitizedData.requestType = requestTypeValidation.sanitizedValue;
  }

  // Validate additional info
  if (data.additionalInfo) {
    const additionalInfoValidation = validateText(data.additionalInfo, {
      maxLength: INPUT_LIMITS.ADDITIONAL_INFO,
      allowHtml: false,
      required: false,
    });
    if (!additionalInfoValidation.isValid) {
      errors.additionalInfo = additionalInfoValidation.error!;
    } else {
      sanitizedData.additionalInfo = additionalInfoValidation.sanitizedValue;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: Object.keys(errors).length === 0 ? sanitizedData : undefined,
  };
}
