import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleApp = styled.Text`
  margin-top: 20%;
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-family: 'Montserrat_700Bold';
`;

export const Text = styled.Text`
  margin-top: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 22px;
  font-family: 'Montserrat_400Regular';
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`;

export const Button = styled.TouchableOpacity`
  margin-top: 24px;
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
