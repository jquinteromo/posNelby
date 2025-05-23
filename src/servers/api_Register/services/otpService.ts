// Generar código OTP (6 dígitos)
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Validar código OTP (simple)
export const validateOtp = (inputOtp: string, actualOtp: string): boolean => {
  return inputOtp === actualOtp;
};

