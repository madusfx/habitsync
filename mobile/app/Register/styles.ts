import styled from "styled-components/native";

export const Container = styled.View`
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
  background-color: #ffffff;
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
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.Text`
  margin-top: 24px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const Text = styled.Text`
  font-weight: bold;
  text-align: center;
`;

export const Register = styled.TouchableOpacity`
  margin-top: 24px;
  text-align: center;
  font-weight: bold;
`;

export const UnderlinedText = styled.Text`
  text-decoration-line: underline;
`;