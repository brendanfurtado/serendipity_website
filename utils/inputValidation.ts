// utils/inputValidation.ts - Updated version with deletion confirmation support
import DOMPurify from "isomorphic-dompurify";

// Input length limits
export const INPUT_LIMITS = {
  EMAIL: 254, // RFC 5321 limit
  TEXT_SHORT: 100,
  TEXT_MEDIUM: 500,
  TEXT_LONG: 2000,
  ADDITIONAL_INFO: 500,
  NAME: 100,
  AGE_MIN: 18,
  AGE_MAX: 120,
  JWT_TOKEN: 1000, // JWT tokens can be quite long
} as const;

export interface ValidationResult<T = string> {
  isValid: boolean;
  sanitizedValue?: T;
  error?: string;
}

/**
 * Validate and sanitize email addresses
 */
export function validateEmail(email: string): ValidationResult<string> {
  if (!email || typeof email !== "string") {
    return { isValid: false, error: "Email is required" };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length === 0) {
    return { isValid: false, error: "Email cannot be empty" };
  }

  if (trimmedEmail.length > INPUT_LIMITS.EMAIL) {
    return {
      isValid: false,
      error: `Email must be less than ${INPUT_LIMITS.EMAIL} characters`,
    };
  }

  // Enhanced email regex that handles most valid cases
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Check for common disposable email patterns
  const disposablePatterns = [
    "10minutemail",
    "tempmail",
    "guerrillamail",
    "mailinator",
    "yopmail",
    "throwaway",
    "temp-mail",
    "getnada",
  ];

  const domain = trimmedEmail.split("@")[1];
  if (disposablePatterns.some((pattern) => domain.includes(pattern))) {
    return { isValid: false, error: "Please use a permanent email address" };
  }

  return { isValid: true, sanitizedValue: trimmedEmail };
}

/**
 * Validate age input
 */
export function validateAge(age: number | string): ValidationResult<string> {
  if (age === undefined || age === null || age === "") {
    return { isValid: false, error: "Age is required" };
  }

  const ageNum = typeof age === "string" ? parseInt(age, 10) : age;

  if (isNaN(ageNum)) {
    return { isValid: false, error: "Age must be a valid number" };
  }

  if (ageNum < INPUT_LIMITS.AGE_MIN) {
    return {
      isValid: false,
      error: `You must be at least ${INPUT_LIMITS.AGE_MIN} years old`,
    };
  }

  if (ageNum > INPUT_LIMITS.AGE_MAX) {
    return {
      isValid: false,
      error: `Please enter a valid age (maximum ${INPUT_LIMITS.AGE_MAX})`,
    };
  }

  return { isValid: true, sanitizedValue: ageNum.toString() };
}

/**
 * Validate and sanitize text input with various options
 */
export function validateText(
  text: string,
  options: {
    maxLength?: number;
    minLength?: number;
    allowHtml?: boolean;
    required?: boolean;
    allowedCharacters?: RegExp;
  } = {}
): ValidationResult<string> {
  const {
    maxLength = INPUT_LIMITS.TEXT_MEDIUM,
    minLength = 0,
    allowHtml = false,
    required = false,
    allowedCharacters,
  } = options;

  if (!text || typeof text !== "string") {
    if (required) {
      return { isValid: false, error: "This field is required" };
    }
    return { isValid: true, sanitizedValue: "" };
  }

  let sanitizedText = text.trim();

  if (sanitizedText.length === 0 && required) {
    return { isValid: false, error: "This field cannot be empty" };
  }

  if (sanitizedText.length > maxLength) {
    return {
      isValid: false,
      error: `Text must be less than ${maxLength} characters`,
    };
  }

  if (sanitizedText.length < minLength) {
    return {
      isValid: false,
      error: `Text must be at least ${minLength} characters`,
    };
  }

  // Check for malicious patterns
  if (containsMaliciousContent(sanitizedText)) {
    return { isValid: false, error: "Invalid characters detected" };
  }

  // Apply character restrictions if specified
  if (allowedCharacters && !allowedCharacters.test(sanitizedText)) {
    return { isValid: false, error: "Text contains invalid characters" };
  }

  // Sanitize HTML if not allowed
  if (!allowHtml) {
    sanitizedText = DOMPurify.sanitize(sanitizedText, { ALLOWED_TAGS: [] });
  }

  return { isValid: true, sanitizedValue: sanitizedText };
}

/**
 * Validate privacy request types
 */
export function validatePrivacyRequestType(
  requestType: string
): ValidationResult<string> {
  const allowedTypes = ["access", "delete", "opt-out"];

  if (!requestType || typeof requestType !== "string") {
    return { isValid: false, error: "Request type is required" };
  }

  const sanitizedType = requestType.trim().toLowerCase();

  if (!allowedTypes.includes(sanitizedType)) {
    return { isValid: false, error: "Invalid request type" };
  }

  return { isValid: true, sanitizedValue: sanitizedType };
}

/**
 * Validate opt-out types
 */
export function validateOptOutType(
  optOutType: string
): ValidationResult<string> {
  const allowedTypes = ["marketing", "all"];

  if (!optOutType || typeof optOutType !== "string") {
    return { isValid: false, error: "Opt-out type is required" };
  }

  const sanitizedType = optOutType.trim().toLowerCase();

  if (!allowedTypes.includes(sanitizedType)) {
    return { isValid: false, error: "Invalid opt-out type" };
  }

  return { isValid: true, sanitizedValue: sanitizedType };
}

/**
 * Validate JWT tokens
 */
export function validateJwtToken(token: string): ValidationResult<string> {
  if (!token || typeof token !== "string") {
    return { isValid: false, error: "Token is required" };
  }

  const trimmedToken = token.trim();

  if (trimmedToken.length === 0) {
    return { isValid: false, error: "Token cannot be empty" };
  }

  if (trimmedToken.length > INPUT_LIMITS.JWT_TOKEN) {
    return { isValid: false, error: "Invalid token format" };
  }

  // Basic JWT format validation (three parts separated by dots)
  const parts = trimmedToken.split(".");
  if (parts.length !== 3) {
    return { isValid: false, error: "Invalid token format" };
  }

  // Check for valid base64url characters in each part
  const base64UrlRegex = /^[A-Za-z0-9_-]*$/;
  for (const part of parts) {
    if (!base64UrlRegex.test(part)) {
      return { isValid: false, error: "Invalid token format" };
    }
  }

  return { isValid: true, sanitizedValue: trimmedToken };
}

/**
 * Check for malicious content patterns
 */
function containsMaliciousContent(text: string): boolean {
  // SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--|\/\*|\*\/|;)/,
    /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
  ];

  // XSS patterns
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];

  // Path traversal patterns
  const pathTraversalPatterns = [
    /\.\.\//g,
    /\.\.\\/g,
    /%2e%2e%2f/gi,
    /%2e%2e%5c/gi,
  ];

  const allPatterns = [
    ...sqlPatterns,
    ...xssPatterns,
    ...pathTraversalPatterns,
  ];

  return allPatterns.some((pattern) => pattern.test(text));
}

/**
 * Comprehensive validation for privacy request forms
 */
export function validatePrivacyRequestForm(data: {
  email?: string;
  requestType?: string;
  additionalInfo?: string;
}): {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: {
    email: string;
    requestType: string;
    additionalInfo?: string;
  };
} {
  const errors: Record<string, string> = {};
  const sanitizedData: any = {};

  // Validate email
  const emailValidation = validateEmail(data.email || "");
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  } else {
    sanitizedData.email = emailValidation.sanitizedValue;
  }

  // Validate request type
  const requestTypeValidation = validatePrivacyRequestType(
    data.requestType || ""
  );
  if (!requestTypeValidation.isValid) {
    errors.requestType = requestTypeValidation.error!;
  } else {
    sanitizedData.requestType = requestTypeValidation.sanitizedValue;
  }

  // Validate additional info (optional)
  if (data.additionalInfo && data.additionalInfo.trim()) {
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

/**
 * Validate IP addresses
 */
export function validateIpAddress(ip: string): ValidationResult<string> {
  if (!ip || typeof ip !== "string") {
    return { isValid: false, error: "IP address is required" };
  }

  const trimmedIp = ip.trim();

  // IPv4 regex
  const ipv4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  // IPv6 regex (simplified)
  const ipv6Regex =
    /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

  if (
    !ipv4Regex.test(trimmedIp) &&
    !ipv6Regex.test(trimmedIp) &&
    trimmedIp !== "unknown"
  ) {
    return { isValid: false, error: "Invalid IP address format" };
  }

  return { isValid: true, sanitizedValue: trimmedIp };
}
