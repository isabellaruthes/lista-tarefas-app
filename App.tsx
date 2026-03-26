import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
};

export default function App() {
  const [tarefa, setTarefa] = useState<string>('');
  const [lista, setLista] = useState<Tarefa[]>([]);

  const adicionarTarefa = () => {
    if (!tarefa.trim()) return;

    const nova: Tarefa = {
      id: Date.now().toString(),
      texto: tarefa,
      concluida: false
    };

    setLista((prev) => [...prev, nova]);
    setTarefa('');
  };

  const toggleTarefa = (id: string) => {
    setLista((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, concluida: !item.concluida }
          : item
      )
    );
  };

  const removerTarefa = (id: string) => {
    setLista((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputArea}>
        <TextInput
          placeholder="Digite uma tarefa..."
          placeholderTextColor="#94a3b8"
          value={tarefa}
          onChangeText={setTarefa}
          style={styles.input}
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => toggleTarefa(item.id)}>
              <Text
                style={[
                  styles.texto,
                  item.concluida && styles.concluida
                ]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    paddingTop: 60
  },

  titulo: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20
  },

  inputArea: {
    flexDirection: 'row',
    marginBottom: 20
  },

  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 10
  },

  botao: {
    marginLeft: 10,
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10
  },

  botaoTexto: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10
  },

  texto: {
    color: '#fff',
    fontSize: 16
  },

  concluida: {
    textDecorationLine: 'line-through',
    color: '#94a3b8'
  },

  delete: {
    fontSize: 18
  }
});
