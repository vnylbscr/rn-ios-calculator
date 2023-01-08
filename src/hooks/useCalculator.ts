import { useCallback, useEffect, useState } from 'react';
import { Operation } from '../lib/calculator-buttons';
import 'intl';
import 'intl/locale-data/jsonp/en';
/**
 * Whether the operation is a single operation or not.
 *
 */
function isSingleOperation(op: string) {
  return op === 'percent' || op === 'sign' || op === 'decimal' || op === 'sign';
}

/**
 * Whether the operation is a double operation or not.
 */
function isDoubleOperation(op: string) {
  return (
    op === 'add' || op === 'subtract' || op === 'multiply' || op === 'divide'
  );
}
/**
 *
 * @returns value - The current value of the calculator
 * @returns handleNumberPress - A function that handles number presses
 * @returns handleOperationPress - A function that handles operation presses
 * @returns handleEqualsPress - A function that handles equals presses
 * @returns sliceValueOnPress - A function that handles slice value presses
 * @returns memory - The current memory of the calculator
 * @returns operation - The current operation of the calculator
 */
function useCalculator() {
  const [value, setValue] = useState<string>('');
  const [memory, setMemory] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const calculateDoubleNumber = useCallback(
    (n1: number, n2: number, op: Operation) => {
      if (op === 'add') {
        return n1 + n2;
      } else if (op === 'subtract') {
        return n1 - n2;
      } else if (op === 'multiply') {
        return n1 * n2;
      } else if (op === 'divide') {
        return n1 / n2;
      } else {
        return n2;
      }
    },
    []
  );

  const calculateSingle = useCallback((n1: number, op: Operation) => {
    if (op === 'percent') {
      return n1 / 100;
    } else if (op === 'sign') {
      return n1 * -1;
    } else if (op === 'decimal') {
      return n1 / 10;
    } else {
      return n1;
    }
  }, []);

  const performDoubleOperation = useCallback(
    (nextOperation: string | null) => {
      if (memory && operation) {
        const result = calculateDoubleNumber(
          memory,
          Number(value),
          operation as Operation
        );

        setMemory(result);
        setValue(String(result));
        setOperation(nextOperation);
      } else if (!memory && value) {
        setMemory(Number(value));
        setValue('');
        setOperation(nextOperation);
      } else {
        setOperation(nextOperation);
      }
    },
    [memory, operation, value, calculateDoubleNumber]
  );

  useEffect(() => {
    if (value && memory && operation) {
      if (value === memory.toString()) {
        setMemory(value ? Number(value) : null);
        setValue('');
        setOperation(operation);
        return;
      }
    }
  }, [value, memory, operation]);

  const performSingleOperation = useCallback(
    (op: Operation) => {
      if (value) {
        const result = calculateSingle(Number(value), op);
        setValue(String(result));
      }
    },
    [value, calculateSingle]
  );

  const handleNumberPress = useCallback(
    (num: string) => {
      setValue(value + num);
    },
    [value]
  );

  const handleClearPress = useCallback(() => {
    setValue('');
    setMemory(null);
    setOperation(null);
  }, []);

  const handleEqualsPress = useCallback(() => {
    performDoubleOperation(null);
  }, [performDoubleOperation]);

  useEffect(() => {
    if (value === '0') {
      setValue('');
    }
  }, [value]);

  const handleOperationPress = useCallback(
    (op: Operation) => {
      if (op === BUTTONS.AC) {
        handleClearPress();
        return;
      }

      if (op === BUTTONS.EQUALS) {
        if (value && !memory) {
          // if memeory is null, set it to the current value
          return;
        }
        handleEqualsPress();
      } else if (isSingleOperation(op)) {
        performSingleOperation(op);
      } else if (isDoubleOperation(op)) {
        performDoubleOperation(op);
      }
    },
    [value, memory, operation, performDoubleOperation, performSingleOperation]
  );

  const sliceValueOnPress = useCallback(() => {
    if (value && value.length > 1) {
      setValue(value.slice(0, -1));
    }
  }, [value]);

  console.log('value', value);
  console.log('memory', memory);
  console.log('operation', operation);

  return {
    value,
    handleNumberPress,
    handleOperationPress,
    handleEqualsPress,
    sliceValueOnPress,
    memory,
    operation,
  };
}

export const formatValue = (value: number, locale = 'tr-TR') => {
  const formatted = value.toLocaleString(locale, {
    maximumFractionDigits: 2,
  });

  return formatted;
};

export default useCalculator;

export enum BUTTONS {
  AC = 'clear',
  SIGN = 'sign',
  PERCENT = 'percent',
  DIVIDE = 'divide',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  MULTIPLY = 'multiply',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SUBTRACT = 'subtract',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  ADD = 'add',
  ZERO = '0',
  DECIMAL = 'decimal',
  EQUALS = 'equals',
}
