// Helper to generate SHA-256 hash using Web Crypto API (fully supported in Edge & Node.js runtimes)
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Base64 encoding/decoding using Web Standard APIs (Edge-compatible)
function base64Encode(str: string): string {
  try {
    return btoa(encodeURIComponent(str));
  } catch (e) {
    return btoa(str);
  }
}

function base64Decode(str: string): string {
  try {
    return decodeURIComponent(atob(str));
  } catch (e) {
    return atob(str);
  }
}

// Generate a signed session token
export async function signSession(username: string): Promise<string> {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry
  const payload = JSON.stringify({ username, expires });
  const base64Payload = base64Encode(payload);

  const secret = process.env.ADMIN_JWT_SECRET || 'dise-default-secret-key-2026';
  const signature = await sha256(base64Payload + '.' + secret);

  return `${base64Payload}.${signature}`;
}

// Verify a signed session token
export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [base64Payload, signature] = parts;
  const secret = process.env.ADMIN_JWT_SECRET || 'dise-default-secret-key-2026';
  const expectedSignature = await sha256(base64Payload + '.' + secret);

  if (signature !== expectedSignature) return false;

  try {
    const payloadJson = base64Decode(base64Payload);
    const payload = JSON.parse(payloadJson);
    
    // Check if session has expired
    if (payload.expires < Date.now()) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Session payload decode error:', error);
    return false;
  }
}
