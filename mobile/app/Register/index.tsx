import { useState } from 'react';
import { Input, Container, Button, Text, UnderlinedText, Register, Title } from './styles';
import axios from 'axios';
import api from '@/utils/api';

const goToLogin = (navigation: any) => {
  navigation.navigate('Login');
};

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  function NewRegister() {
    const data = {
      name: name,
      email: email,
      password: password,
    }
    console.log(data);
    axios
    api.post('/users', data)
    .then(function (response) {
      console.log(response);
      goToLogin(navigation);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Container>
      <Title>Registro</Title>
      <Input 
        placeholder="Nome"
        value={name}
        onChangeText={handleNameChange}
      />
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
      <Button onPress={NewRegister}>
        <Text>Registrar</Text>
      </Button>
      <Register onPress={() => goToLogin(navigation)}>
        <Text>
          Já possui uma conta?{"\n"}
          <UnderlinedText>Faça login aqui</UnderlinedText>
        </Text>
      </Register>
    </Container>
  );
}
