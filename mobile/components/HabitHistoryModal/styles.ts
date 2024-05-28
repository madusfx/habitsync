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
  background-color: #1e1b4b;
  padding: 20px;
  border-radius: 10px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1b4b;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-family: 'Montserrat_700Bold';
`;

export const Text = styled.Text`
  margin: 16px 0px 12px 0;
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #6366f1;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;
