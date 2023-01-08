import React, { Fragment } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import useCalculator, { formatValue } from '../hooks/useCalculator';
import {
  CalculatorButton,
  CalculatorButtonsMap,
  Operation,
} from '../lib/calculator-buttons';
import CircleCount from './CircleCount';
import ResultArea from './ResultArea';

const Container = styled.View({
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  padding: 4,
});

const CountContainer = styled.View<{
  fullWidth?: boolean;
}>((props) => ({
  width: props.fullWidth ? '50%' : '25%',
  padding: 8,
}));

const Calculator = () => {
  const {
    value,
    memory,
    handleNumberPress,
    handleOperationPress,
    sliceValueOnPress,
  } = useCalculator();

  const handleButtonPress = (item: CalculatorButton) => {
    if (item.type === 'operation') {
      handleOperationPress(item.op as Operation);
    } else {
      handleNumberPress(item.op);
    }
  };

  const getItemLabel = (label: string) => {
    if (label === 'AC') {
      return Number(value) > 0 || memory ? 'C' : 'AC';
    }

    return label;
  };

  const renderItem = ({ item }: { item: CalculatorButton }) => {
    return (
      <CountContainer fullWidth={item.fullWidth}>
        <CircleCount
          text={getItemLabel(item.label)}
          onPress={() => handleButtonPress(item)}
          bgColor={item.color}
          fullWidth={item.fullWidth}
        />
      </CountContainer>
    );
  };

  return (
    <Fragment>
      <ResultArea
        onPress={sliceValueOnPress}
        count={formatValue(Number(value))}
      />

      <Container>
        <FlatList
          data={CalculatorButtonsMap}
          renderItem={renderItem}
          keyExtractor={(x) => x.op}
          numColumns={4}
        />
      </Container>
    </Fragment>
  );
};

export default Calculator;
