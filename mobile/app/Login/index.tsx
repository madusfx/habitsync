import { useState } from 'react';
import { Input, Container, Button, Text, UnderlinedText, Register, Title, TitleApp, TitleContainer } from './styles';
import axios from 'axios';
import api from '@/utils/api';
import { saveToken, saveUserId } from '@/utils/auth';
import { View } from '@/components/Themed';
import { globalStyles } from '@/constants/globalStyles';

const goToRegister = (navigation: any) => {
  navigation.navigate('Register');
};

const goToHome = (navigation: any) => {
  navigation.navigate('Home');
};

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  function Login() {
    const data = {
      email: email,
      password: password,
    }
    console.log(data);
    axios
    api.post('/users/login', data)
    .then(function (response) {
      console.log(response);
      saveToken(response);
      saveUserId(response);
      goToHome(navigation)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
    <TitleContainer>
      <TitleApp>HabitSync</TitleApp>
    </TitleContainer>
    <View style={globalStyles.container}>
    
    <Container>
      <Title>Login</Title>
      <Input 
        placeholder='E-mail' 
        value={email}
        onChangeText={handleEmailChange}
      />
      <Input 
        placeholder='Senha' 
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry={true} 
      />
      <Button onPress={Login}>
        <Text>Logar</Text>
      </Button>
      <Register onPress={() => goToRegister(navigation)}>
        <Text>
          Ainda não possui uma conta?{"\n"}
          <UnderlinedText>Se cadastre aqui</UnderlinedText>
        </Text>
      </Register>
    </Container>
    </View>
    </>
  );
}
