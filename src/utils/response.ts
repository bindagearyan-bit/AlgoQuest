export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
}

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  ...(message && { message }),
});

export const errorResponse = (message: string, errors?: unknown): ApiResponse => ({
  success: false,
  message,
  ...(errors && { errors }),
});

export const paginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
) => ({
  success: true,
  data,
  pagination: {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
  ...(message && { message }),
});
