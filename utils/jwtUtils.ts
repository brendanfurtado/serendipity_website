// utils/jwtUtils.ts
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

const JWT_ISSUER = "serendipity-dating";
const JWT_AUDIENCE = "deletion-confirmation";

export interface DeletionTokenPayload {
  email: string;
  requestId: string;
  type: "deletion-confirmation";
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string;
  [key: string]: any; // Index signature for JWTPayload compatibility
}

/**
 * Generate a JWT token for deletion confirmation
 * @param email - User's email address
 * @param requestId - Privacy request ID from database
 * @param expiresInHours - Token expiration time in hours (default: 2)
 * @returns JWT token string
 */
export async function generateDeletionToken(
  email: string,
  requestId: string,
  expiresInHours: number = 2
): Promise<string> {
  try {
    const payload = {
      email,
      requestId,
      type: "deletion-confirmation",
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setIssuer(JWT_ISSUER)
      .setAudience(JWT_AUDIENCE)
      .setExpirationTime(`${expiresInHours}h`)
      .sign(JWT_SECRET);

    return token;
  } catch (error) {
    console.error("Error generating deletion token:", error);
    throw new Error("Failed to generate deletion confirmation token");
  }
}

/**
 * Verify and decode a deletion confirmation JWT token
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export async function verifyDeletionToken(
  token: string
): Promise<DeletionTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    // Validate payload structure
    if (
      !payload.email ||
      !payload.requestId ||
      payload.type !== "deletion-confirmation"
    ) {
      console.error("Invalid token payload structure:", payload);
      return null;
    }

    return payload as DeletionTokenPayload;
  } catch (error) {
    if (error.name === "JWTExpired") {
      console.log("Deletion token expired:", error.message);
    } else {
      console.error("Error verifying deletion token:", error);
    }
    return null;
  }
}

/**
 * Extract token from URL query parameters or path
 * @param url - Full URL or search params
 * @returns Token string or null
 */
export function extractTokenFromUrl(
  url: string | URLSearchParams
): string | null {
  try {
    let searchParams: URLSearchParams;

    if (typeof url === "string") {
      const urlObj = new URL(url);
      searchParams = urlObj.searchParams;
    } else {
      searchParams = url;
    }

    return searchParams.get("token");
  } catch (error) {
    console.error("Error extracting token from URL:", error);
    return null;
  }
}

/**
 * Generate a secure deletion confirmation URL
 * @param baseUrl - Base URL of the application
 * @param token - JWT token
 * @returns Full confirmation URL
 */
export function generateDeletionConfirmationUrl(
  baseUrl: string,
  token: string
): string {
  const url = new URL("/confirm-deletion", baseUrl);
  url.searchParams.set("token", token);
  return url.toString();
}

/**
 * Validate JWT secret exists and is secure
 * @returns boolean indicating if JWT secret is properly configured
 */
export function validateJwtConfiguration(): boolean {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("JWT_SECRET environment variable is not set");
    return false;
  }

  if (secret.length < 32) {
    console.error("JWT_SECRET should be at least 32 characters long");
    return false;
  }

  if (secret === "your-secret-key-change-in-production") {
    console.error("JWT_SECRET is using default value - change for production");
    return false;
  }

  return true;
}

/**
 * Get token expiration time in milliseconds
 * @param token - JWT token
 * @returns Expiration timestamp or null if invalid
 */
export async function getTokenExpiration(
  token: string
): Promise<number | null> {
  try {
    const payload = await verifyDeletionToken(token);
    return payload?.exp ? payload.exp * 1000 : null;
  } catch (error) {
    return null;
  }
}
