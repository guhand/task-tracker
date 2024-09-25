import { BadRequestException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { Config } from 'src/common/config/config';

export const roles = ['Admin', 'User'];

export const taskStatus = ['ToDo', 'InProgress', 'Resolved', 'Reopened'];

export const taskTypes = ['Bug', 'Enhancement'];

export async function generateToken(
  id: number,
  roleId: number,
): Promise<string> {
  const data = {
    userId: id,
    roleId,
  };
  const secretKey: string = Config.SECRET_KEY;
  const expirationSeconds = { expiresIn: 60 * 60 * 24 * 7 }; // one week
  const token = sign(data, secretKey, expirationSeconds);
  if (!token) throw new BadRequestException('Failed to create a token');
  return token;
}

export interface PaginatedResponse {
  from: number;
  to: number;
  total: number;
  totalPages: number;
  data: any[];
}

/**
 * @function paginationResponse
 * @description Create a pagination response.
 *
 * @param {number} page - Current page number.
 * @param {number} total - Total items.
 * @param {number} itemsPerPage - Number of items per page.
 * @param {any[]} data - Data for the current page.
 * @returns {PaginationResponse} The pagination response.
 */
export const paginatedResponse = (
  page: number,
  total: number,
  itemsPerPage: number,
  data: any[],
): PaginatedResponse => {
  let totalPages = Math.ceil(total / itemsPerPage);
  let from = 1,
    to = data.length;

  if (data.length == 0) {
    from = 0;
    to = 0;
    total = 0;
    totalPages = 0;
  }

  if (page > 0) {
    from = page <= totalPages ? page * itemsPerPage - 9 : 1;
    to = from + 9 > total ? total : from + 9;
    total > 0 ? from : (from = 0);
  }

  return {
    from,
    to,
    total,
    totalPages,
    data,
  };
};
