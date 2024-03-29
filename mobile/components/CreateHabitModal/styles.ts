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

export const Input = styled.TextInput`
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: rgba(0, 0, 0, 0.5);
`;

export const Button = styled.TouchableOpacity`
  margin-top: 16px;
  background-color: white;
  padding: 6px;
  border-radius: 10px;
  border: rgba(0, 0, 0, 0.5);
`;
