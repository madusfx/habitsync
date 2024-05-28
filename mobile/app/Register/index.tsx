import { Container, Button, Text, UnderlinedText, Register, Title, TitleApp, ErrorText } from './styles';
import { useForm } from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { globalStyles } from '@/constants/globalStyles';
import { registerSchema } from '@/utils/yup-schema';
import { View } from '@/components/Themed';
import api from '@/utils/api';
import InputComponent from '@/components/InputComponent';

const goToLogin = (navigation: any) => {
  navigation.navigate('Login');
};

export default function RegisterScreen({ navigation }: any) {
  const {
    control, 
    handleSubmit, 
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(data: any) {
    api.post(`/users`, data)
    .then(function (response) {
      console.log(response);
      goToLogin(navigation);
    })
    .catch(function (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        setError("email", {
          type: "manual",
          message: "Este e-mail já está cadastrado.",
        });
      } else {
        console.error("Erro inesperado:", error);
      }
    });
  }

  return (
    <View style={globalStyles.container}>
    <TitleApp>HABITSYNC</TitleApp>
    <Container>
      <Title>REGISTRO</Title>
      <InputComponent 
        placeholder="Nome"
        name="name"
        control={control}
      />
      {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      <InputComponent 
        placeholder='E-mail' 
        name="email"
        control={control}
      />
      {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
      <InputComponent 
        placeholder='Senha'
        name="password"
        secureTextEntry={true} 
        control={control}
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Registrar</Text>
      </Button>
      <Register onPress={() => goToLogin(navigation)}>
        <Text>
          Já possui uma conta?{"\n"}
          <UnderlinedText>Faça login aqui</UnderlinedText>
        </Text>
      </Register>
    </Container>
    </View>
  );
}
