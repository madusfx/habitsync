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

export const ContainerTitle = styled.View`
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1b4b;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  text-align: center;
  font-family: 'Montserrat_700Bold';
`;

export const Text = styled.Text`
  margin-top: 8px;
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`;

export const ErrorText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 10px;
  font-family: 'Montserrat_400Regular';
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  text-align: center;
  color: white;
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`;

export const Input = styled.TextInput`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #6366f1;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: #6366f1;
  padding: 16px;
  border-radius: 10px;
  border: rgba(0, 0, 0, 0.5);
`;
