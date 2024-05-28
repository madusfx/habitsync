import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 30%;
`;

export const Input = styled.TextInput`
  margin-top: 24px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const TitleApp = styled.Text`
  margin-top: 30%;
  font-size: 32px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-family: 'Montserrat_700Bold';
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-family: 'Montserrat_700Bold';
`;


export const Text = styled.Text`
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`;

export const Register = styled.TouchableOpacity`
  margin-top: 24px;
  text-align: center;
  font-weight: bold;
`;

export const UnderlinedText = styled.Text`
  text-decoration-line: underline;
`;