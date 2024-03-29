import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.TextInput`
  margin-top: 24px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #a5b4fc;
  color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #a5b4fc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const TitleApp = styled.Text`
  font-size: 36px;
  color: #6366f1;
  font-weight: bold;
  text-align: center;
`;

export const TitleContainer = styled.Text`
  padding-top: 36px;
  background-color: #1e1b4b;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #6366f1;
  font-weight: bold;
  text-align: center;
`;


export const Text = styled.Text`
  font-weight: bold;
  text-align: center;
  color: #6366f1;
  font-size: 16px;
`;

export const Register = styled.TouchableOpacity`
  margin-top: 24px;
  text-align: center;
  font-weight: bold;
`;

export const UnderlinedText = styled.Text`
  text-decoration-line: underline;
`;