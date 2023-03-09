export interface GenerateOptions {
  length?: number;
  numbers?: boolean;
  symbols?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  excludeSimilar?: boolean;
  excludeAmbiguous?: boolean;
}

export function generatePassword(options: GenerateOptions): string {
  const length = options.length || 32;
  const includeNumbers = options.numbers || false;
  const includeSymbols = options.symbols || false;
  const includeLowercase = options.lowercase || false;
  const includeUppercase = options.uppercase || false;
  const excludeSimilar = options.excludeSimilar || false;
  const excludeAmbiguous = options.excludeAmbiguous || false;

  const numbers = '0123456789';
  const symbols = '!@#$%^&*_+-=';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const similar = 'il1Lo0O';
  const ambiguous = '{}[]()/\'"`~,;:.<>';

  let validChars = '';
  if (includeNumbers) validChars += numbers;
  if (includeSymbols) validChars += symbols;
  if (includeLowercase) validChars += lowercase;
  if (includeUppercase) validChars += uppercase;
  if (!excludeAmbiguous) validChars += ambiguous;
  if (excludeSimilar) validChars = validChars.replaceAll(new RegExp(`[${similar}]`, 'g'), '');




  let password = '';
  for (let i = 0; i < length; i++) {
    password += validChars.charAt(Math.floor(Math.random() * validChars.length));
  }


  return password;
}

