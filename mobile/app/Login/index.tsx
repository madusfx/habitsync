import { useState } from 'react';
import { Input, Container, Button, Text, UnderlinedText, Register, Title, TitleApp } from './styles';
import api from '@/utils/api';
import { saveToken, saveUserId } from '@/utils/auth';
import { View } from '@/components/Themed';
import { globalStyles } from '@/constants/globalStyles';
import InputComponent from '@/components/InputComponent';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/utils/yup-schema';
import { ErrorText } from '../Register/styles';

const goToRegister = (navigation: any) => {
  navigation.navigate('Register');
};

const goToHome = (navigation: any) => {
  navigation.navigate('Home');
};

export default function LoginScreen({ navigation }: any) {
  const {
    control, 
    handleSubmit, 
    setError,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  function onSubmit(data: any) {
    api.post('/users/login', data)
    .then(function (response) {
      console.log(response);
      saveToken(response);
      saveUserId(response);
      reset();
      goToHome(navigation)
    })
    .catch(function (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setError("password", {
          type: "manual",
          message: "Credenciais inválidas.",
        });
      } else {
        console.error("Erro inesperado:", error);
      }
    });
  }

  return (
    <>
    <View style={globalStyles.container}>
    <TitleApp>HABITSYNC</TitleApp>
    <Container>
      <Title>LOGIN</Title>
      <InputComponent 
        placeholder="E-mail"
        name="email" 
        control={control}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <InputComponent 
        placeholder="Senha"
        name="password"
        control={control}
        secureTextEntry={true} 
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Logar</Text>
      </Button>
      <Register onPress={() => goToRegister(navigation)}>
        <Text>
          Ainda não possui uma conta?{"\n"}
          <UnderlinedText>Cadastre-se clicando aqui</UnderlinedText>
        </Text>
      </Register>
    </Container>
    </View>
    </>
  );
}
