/**
 * Firestore pagination helper utilities.
 * Provides common patterns for paginating Firestore queries.
 */
import * as admin from 'firebase-admin';

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

/**
 * Flexible pagination helper supporting both (query, page, limit) and (query, paginationDto, searchFields)
 */
export async function paginateQuery<T = any>(
  query: admin.firestore.Query,
  pageOrDto?: number | { page?: number; limit?: number; search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' },
  limitOrFields?: number | string[],
  collectionRef?: admin.firestore.CollectionReference,
  countQuery?: admin.firestore.Query,
): Promise<PaginatedResult<T>> {
  let page = 1;
  let limit = 20;

  if (typeof pageOrDto === 'number') {
    page = pageOrDto || 1;
    limit = (typeof limitOrFields === 'number' ? limitOrFields : 20) || 20;
  } else if (pageOrDto && typeof pageOrDto === 'object') {
    page = Number(pageOrDto.page) || 1;
    limit = Number(pageOrDto.limit) || 20;
  }

  const offset = (page - 1) * limit;

  // Get total count
  let total = 0;
  const countSource = countQuery || collectionRef || (query as any);
  try {
    if (countSource && typeof countSource.count === 'function') {
      const countSnapshot = await countSource.count().get();
      total = countSnapshot.data().count;
    }
  } catch {
    total = 0;
  }

  // Apply pagination
  const snapshot = await query.offset(offset).limit(limit).get();

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];

  if (total === 0 && data.length > 0) {
    total = data.length;
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

/**
 * Builds a standard Firestore ordering query.
 */
export function applyOrdering(
  query: admin.firestore.Query,
  sortBy: string,
  sortOrder: 'asc' | 'desc',
): admin.firestore.Query {
  return query.orderBy(sortBy, sortOrder);
}
