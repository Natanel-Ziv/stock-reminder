import env from 'env-var';

const requiredString = (name: string) => env.get(name).required().asString();

export const PORT = env.get('PORT').asIntPositive() || 3023;