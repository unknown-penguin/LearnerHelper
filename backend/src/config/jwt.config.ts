import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: 'YOUR_SECRET_KEY', 
  signOptions: { expiresIn: '1h' },
};