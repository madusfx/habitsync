import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ContainerModal = styled.View`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

export const Text = styled.Text`
  margin: 16px 0px 12px 0;
  font-weight: bold;
  text-align: center;
  font-size: 14px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const HabitSquare = styled.View`
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid #000000;
  margin-right: 10px;
`;
