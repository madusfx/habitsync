import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToken(response: any) {
  const token = response.data.accessToken;
    try {
        await AsyncStorage.setItem('accessToken', token);
        console.log('Token salvo com sucesso.');
    } catch (error) {
        console.log('Erro ao salvar token:', error);
    }
};

export async function saveUserId(response: any) {
  const userId = response.data.userId;
    try {
        await AsyncStorage.setItem('userId', userId);
        console.log('userId salvo com sucesso.');
    } catch (error) {
        console.log('Erro ao salvar userId:', error);
    }
};

export async function getToken() {
  try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token !== null) {
        return token;
      } else {
          console.log('Nenhum token encontrado.');
          return null;
      }
  } catch (error) {
      console.log('Erro ao recuperar token:', error);
      return null;
  }
};

export async function getUserId() {
  try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId !== null) {
        return userId;
      } else {
          console.log('Nenhum userId encontrado.');
          return null;
      }
  } catch (error) {
      console.log('Erro ao recuperar userId:', error);
      return null;
  }
};