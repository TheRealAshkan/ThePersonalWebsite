
import { SetMetadata } from '@nestjs/common';
import Role from '../enums/Role';

export const ROLES_KEY = 'role';
export const Roles = (role: Role[]) => SetMetadata(ROLES_KEY, role);



import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const GateGuard = (role: Role): any =>
  applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard),
  );