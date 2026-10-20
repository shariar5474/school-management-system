import { ResultsService } from './results.service';
import { BadRequestException } from '@nestjs/common';

describe('ResultsService Template Validation', () => {
  let service: ResultsService;
  let mockFirebaseService: any;
  let mockAuditService: any;

  beforeEach(() => {
    mockFirebaseService = {
      getFirestore: jest.fn(),
    };
    mockAuditService = {
      log: jest.fn().mockResolvedValue(undefined),
    };
    service = new ResultsService(mockFirebaseService, mockAuditService);
  });

  it('should accept exactly the 3 valid templates: classic, modern, premium', () => {
    expect(ResultsService.VALID_TEMPLATES).toEqual(['classic', 'modern', 'premium']);
  });

  it('should reject invalid template identifiers', async () => {
    await expect(
      service.activateTemplate(
        {
          templateId: 'unknown_template' as any,
          schoolId: 'default',
        },
        'admin_1',
      ),
    ).rejects.toThrow(BadRequestException);
  });
});
