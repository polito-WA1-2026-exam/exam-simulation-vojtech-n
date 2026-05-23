import crypto from 'crypto';

export function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
};

export function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
};

export function verifyPassword(password, salt, storedHash) {
  const hash = hashPassword(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(storedHash)
  );
};