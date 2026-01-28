export const env = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES: process.env.JWT_EXPIRES || '1d',
};

if (!env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}
