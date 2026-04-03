// utils/dataGenerator.ts

/**
 * Generates a random string of given length.
 * @param length - length of the string (default 10)
 */
export function generateString(length = 10): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generates a random username with prefix.
 * @param prefix - optional prefix (default 'user')
 */
export function generateUsername(prefix = 'user'): string {
  return `${prefix}_${generateString(6)}`;
}

/**
 * Generates a random email.
 * @param domain - optional domain (default 'example.com')
 */
export function generateEmail(domain = 'example.com'): string {
  return `${generateUsername()}@${domain}`;
}

/**
 * Generates a random password.
 * Includes letters, numbers, and special characters.
 */
export function generatePassword(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}