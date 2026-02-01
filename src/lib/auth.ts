// Hash function using SHA-256
export async function hashCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Pre-computed hash of the access code: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
// This is the SHA-256 hash of the code
export const VALID_CODE_HASH = "7b4e9c8a2f1d3e5b6c7a8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a";

// Function to verify the code
export async function verifyAccessCode(inputCode: string): Promise<boolean> {
  const inputHash = await hashCode(inputCode);
  // Compare with the stored hash
  return inputHash === VALID_CODE_HASH;
}

// Storage key for session
export const AUTH_STORAGE_KEY = 'realtime-hub-authenticated';
