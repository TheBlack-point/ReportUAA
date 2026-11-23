import { describe, it, expect } from 'vitest';
import { ClassificationService, IssueType, Department } from '../src/services/ClassificationService.ts';

describe('ClassificationService', () => {
  it('should send furniture to Maintenance', () => {
    const result = ClassificationService.classify(IssueType.Furniture, 'La silla está rota');
    expect(result).toBe(Department.Maintenance);
  });

  it('should send a computer without internet to Networks', () => {
    const result = ClassificationService.classify(IssueType.ScreensComputers, 'No hay internet');
    expect(result).toBe(Department.Networks);
  });

  it('should send a broken screen to Maintenance', () => {
    const result = ClassificationService.classify(IssueType.ScreensComputers, 'La pantalla está estrellada');
    expect(result).toBe(Department.Maintenance);
  });

  it('should send other computer problems to Systems', () => {
    const result = ClassificationService.classify(IssueType.ScreensComputers, 'No abre Word');
    expect(result).toBe(Department.Systems);
  });

  it('should send network equipment to Networks', () => {
    const result = ClassificationService.classify(IssueType.NetworkEquipment, 'El switch no prende');
    expect(result).toBe(Department.Networks);
  });
});