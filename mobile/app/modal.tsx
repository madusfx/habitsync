import { Text } from '@/components/Themed';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <View style={styles.card}>
        <Text style={styles.text}>Nome: Teste Nome</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.text}>E-mail: Teste E-mail</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 16,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#181616',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    marginTop: 36,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 24,
    shadowColor: '#181616',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  }
});
