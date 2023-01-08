import { CircleCountColor } from '../components/CircleCount';

export interface CalculatorButton {
  label: string;
  color: CircleCountColor;
  fullWidth?: boolean;
  op: CalculatorOperation;
  type: 'number' | 'operation';
}

export type Operation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'percent'
  | 'sign'
  | 'clear'
  | 'decimal'
  | 'equals';

export type NumberOperation =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9';

export type CalculatorOperation = Operation | NumberOperation;

export const CalculatorButtonsMap: CalculatorButton[] = [
  {
    label: 'AC',
    color: 'gray',
    op: 'clear',
    type: 'operation',
  },
  {
    label: '+/=',
    color: 'gray',
    op: 'sign',
    type: 'operation',
  },
  {
    label: '%',
    color: 'gray',
    op: 'percent',
    type: 'operation',
  },
  {
    label: '÷',
    color: 'yellow',
    op: 'divide',
    type: 'operation',
  },
  {
    label: '7',
    color: 'black',
    op: '7',
    type: 'number',
  },
  {
    label: '8',
    color: 'black',
    op: '8',
    type: 'number',
  },
  {
    label: '9',
    color: 'black',
    op: '9',
    type: 'number',
  },
  {
    label: 'X',
    color: 'yellow',
    op: 'multiply',
    type: 'operation',
  },
  {
    label: '4',
    color: 'black',
    op: '4',
    type: 'number',
  },
  {
    label: '5',
    color: 'black',
    op: '5',
    type: 'number',
  },
  {
    label: '6',
    color: 'black',
    op: '6',
    type: 'number',
  },
  {
    label: '-',
    color: 'yellow',
    op: 'subtract',
    type: 'operation',
  },
  {
    label: '1',
    color: 'black',
    op: '1',
    type: 'number',
  },
  {
    label: '2',
    color: 'black',
    op: '2',
    type: 'number',
  },
  {
    label: '3',
    color: 'black',
    op: '3',
    type: 'number',
  },
  {
    label: '+',
    color: 'yellow',
    op: 'add',
    type: 'operation',
  },
  {
    label: '0',
    color: 'black',
    fullWidth: true,
    op: '0',
    type: 'number',
  },
  {
    label: ',',
    color: 'black',
    op: 'decimal',
    type: 'operation',
  },
  {
    label: '=',
    color: 'yellow',
    op: 'equals',
    type: 'operation',
  },
];
