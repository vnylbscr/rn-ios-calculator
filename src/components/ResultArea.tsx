import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

type Props = {
  count: number | string;
  onPress: () => void;
};

const height = Dimensions.get('window').height;

const Container = styled.View`
  height: ${height / 3.5};
  justify-content: flex-end;
  align-items: flex-end;
`;

const InnerContainer = styled.Pressable`
  margin-right: 20px;
`;

const ResultText = styled.Text`
  font-size: 80px;
  color: #fff;
`;

const ResultArea: React.FC<Props> = ({ count, onPress }) => {
  const touchX = React.useRef(0);

  return (
    <Container>
      <InnerContainer
        onTouchStart={(e) => (touchX.current = e.nativeEvent.locationX)}
        onTouchEnd={(e) => {
          const diff = e.nativeEvent.locationX - touchX.current;
          if (Math.abs(diff) > 50) {
            onPress();
          }
        }}
      >
        <ResultText numberOfLines={1} adjustsFontSizeToFit>
          {count}
        </ResultText>
      </InnerContainer>
    </Container>
  );
};

export default ResultArea;
