import { ScrollView } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 30%; */
  padding: 16px;
`;

export const CardsContainer = styled(ScrollView)`
  width: 100%;
  flex: 1;
  padding: 16px;
`;

export const ButtonsContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
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
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const HabitSquare = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid white;
  border-radius: 8px;
  margin-right: 10px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 24px;
  width: 45%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
