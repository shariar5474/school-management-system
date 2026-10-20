import { ExaminationsService } from './examinations.service';

describe('ExaminationsService Result Calculation', () => {
  let service: ExaminationsService;
  let mockFirebaseService: any;
  let mockAuditService: any;

  beforeEach(() => {
    mockFirebaseService = {
      getFirestore: jest.fn(),
    };
    mockAuditService = {
      log: jest.fn().mockResolvedValue(undefined),
    };
    service = new ExaminationsService(mockFirebaseService, mockAuditService);
  });

  describe('calculateGrade', () => {
    it('should assign A+ (5.0) for marks >= 80%', () => {
      const res = service.calculateGrade(85);
      expect(res.grade).toBe('A+');
      expect(res.gradePoint).toBe(5.0);
    });

    it('should assign A (4.0) for marks 70-79%', () => {
      const res = service.calculateGrade(74);
      expect(res.grade).toBe('A');
      expect(res.gradePoint).toBe(4.0);
    });

    it('should assign A- (3.5) for marks 60-69%', () => {
      const res = service.calculateGrade(65);
      expect(res.grade).toBe('A-');
      expect(res.gradePoint).toBe(3.5);
    });

    it('should assign B (3.0) for marks 50-59%', () => {
      const res = service.calculateGrade(55);
      expect(res.grade).toBe('B');
      expect(res.gradePoint).toBe(3.0);
    });

    it('should assign C (2.0) for marks 40-49%', () => {
      const res = service.calculateGrade(45);
      expect(res.grade).toBe('C');
      expect(res.gradePoint).toBe(2.0);
    });

    it('should assign D (1.0) for marks 33-39%', () => {
      const res = service.calculateGrade(35);
      expect(res.grade).toBe('D');
      expect(res.gradePoint).toBe(1.0);
    });

    it('should assign F (0.0) for marks below 33%', () => {
      const res = service.calculateGrade(32);
      expect(res.grade).toBe('F');
      expect(res.gradePoint).toBe(0.0);
    });
  });
});
