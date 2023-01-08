import { renderHook, act } from '@testing-library/react-native';
import useCalculator, { BUTTONS, formatValue } from './useCalculator';

describe('useCalculator', () => {
  it('should initialize with an empty value and no operation or memory', () => {
    const { result } = renderHook(() => useCalculator());
    // console.log(result.current);

    expect(result.current.value).toBe('');
    expect(result.current.memory).toBe(null);
    expect(result.current.operation).toBe(null);
  });

  it('should handle number press events', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberPress('1');
    });
    act(() => {
      result.current.handleNumberPress('2');
    });
    expect(result.current.value).toBe('12');
  });

  it('should handle clear press events', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberPress('1');
      result.current.handleNumberPress('2');
      result.current.handleOperationPress(BUTTONS.ADD);
      result.current.handleNumberPress('3');
      result.current.handleOperationPress(BUTTONS.AC);
    });
    expect(result.current.value).toBe('');
    expect(result.current.memory).toBe(null);
    expect(result.current.operation).toBe(null);
  });

  it('should handle single operation press events', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberPress('1');
      result.current.handleOperationPress(BUTTONS.ADD);
      result.current.handleNumberPress('2');
      result.current.handleOperationPress(BUTTONS.EQUALS);
    });

    expect(result.current.value).toBe('2');
  });

  it('should handle sum operation', () => {
    const { result } = renderHook(() => useCalculator());
    act(() => {
      result.current.handleNumberPress('1');
      result.current.handleOperationPress(BUTTONS.ADD);
    });

    expect(result.current.value).toBe('1');
    expect(result.current.memory).toBe(null);
    expect(result.current.operation).toBe(BUTTONS.ADD);

    console.log(result.current);

    act(() => {
      result.current.handleNumberPress('2');
      result.current.handleOperationPress(BUTTONS.EQUALS);
    });

    expect(result.current.value).toBe('12');
  });

  it('should format values correctly', () => {
    const value = 123456789.123456789;
    const locale = 'tr-TR';

    expect(formatValue(value, locale)).toBe('123.456.789,12');
    expect(formatValue(0)).toBe('0');
    expect(formatValue(2222)).toBe('2.222');

    expect(formatValue(0.1)).toBe('0,1');
    expect(formatValue(0.01)).toBe('0,01');
  });
});
