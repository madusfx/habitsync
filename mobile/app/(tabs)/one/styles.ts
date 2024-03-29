import styled from "styled-components/native";

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 16px;
  font-size: 26;
  font-weight: bold;
`;

export const Text = styled.Text`
  font-size: 20;
  font-weight: bold;
`;

export const Card = styled.TouchableOpacity`
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const HabitSquare = styled.View`
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #000000;
  margin-right: 10px;
`;

export const Input = styled.TouchableOpacity`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin: 24px 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
