import styled from 'styled-components/native';

const StyledCircleButton = styled.TouchableOpacity<
  Omit<Props, 'text' | 'onPress'>
>((props) => ({
  height: 88,
  width: props.fullWidth ? '100%' : 84,
  borderRadius: 50,
  backgroundColor:
    props.bgColor === 'black'
      ? props.theme.colors.buttonBackgroundBlack
      : props.bgColor === 'gray'
      ? props.theme.colors.buttonBackgroundGray
      : props.theme.colors.buttonBackgroundYellow,
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledCircleText = styled.Text<{
  bgColor?: CircleCountColor;
}>((props) => ({
  color:
    props.bgColor === 'gray'
      ? props.theme.colors.buttonBackgroundBlack
      : props.theme.colors.textBase,
  fontSize: 40,
  // fontWeight: 'bold',
  textAlign: 'center',
}));

export type CircleCountColor = 'yellow' | 'gray' | 'black';

type Props = {
  text: string;
  onPress: () => void;
  fullWidth?: boolean;
  bgColor?: CircleCountColor;
};

export default function CircleCount({ text, ...rest }: Props) {
  return (
    <StyledCircleButton {...rest}>
      <StyledCircleText bgColor={rest.bgColor}>{text}</StyledCircleText>
    </StyledCircleButton>
  );
}
