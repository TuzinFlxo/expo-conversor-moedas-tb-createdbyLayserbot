import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function App() {
  const [moedaOrigem, setMoedaOrigem] = useState('BRL')
  const [moedaDestino, setMoedaDestino] = useState('USD')
  const [valorEntrada, setVAlorEntrada] = useState('33.33')
  const [resultado, setResultado] = useState('')

  const handleConverter = async () => {
    let URL = `https://economia.awesomeapi.com.br/last/${moedaOrigem}-${moedaDestino}`;
    try {
      let page = await fetch(URL);
      let json = await page.json();
      //console.log(json);
      let indice = parseFloat(json[`${moedaOrigem}${moedaDestino}`].high)
      let valor = parseFloat(valorEntrada)
      setResultado((indice*valor).toFixed(2))
    } catch (error) {
      setResultado(`Erro: ${error.message}`)
    }
   }

  const handleLimpar = () => {
    setResultado('');
    setVAlorEntrada('33.33333');
    setMoedaOrigem('BRL');
    setMoedaDestino('USD');
   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conveter Moedas</Text>
      <Text> </Text> 
      <Text> </Text>
      <View>
        <Text style={styles.tbMoeda}>Moeda Original:</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaOrigem}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaOrigem(itemValue)
          }>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Peso Argentino" value="ARS" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <Text> </Text>
      <Text> </Text>
      <View>
        <Text style={styles.tbMoeda}>Moeda de Destino:</Text>
        <Picker
          style={styles.picker}
          selectedValue={moedaDestino}
          onValueChange={(itemValue, itemIndex) =>
            setMoedaDestino(itemValue)
          }>
          <Picker.Item label="Real Brasileiro" value="BRL" />
          <Picker.Item label="Dólar Americano" value="USD" />
          <Picker.Item label="Peso Argentino" value="ARS" />
          <Picker.Item label="Libra Esterlina" value="GBP" />
          <Picker.Item label="Ouro" value="XAU" />
          <Picker.Item label="Bitcoin" value="BTC" />
        </Picker>
      </View>
      <Text> </Text>
      <Text> </Text>
      <View>
        <Text style={styles.tbMoeda}>Valo da conversão:</Text>
        <TextInput
          style={styles.input}
          value={valorEntrada}
          onChangeText={setVAlorEntrada}
          keyboardType='numeric'>
        </TextInput>
      </View>
      <Pressable onPress={handleConverter} style={styles.button}>
        <Text style={styles.buttonText}>Conveter</Text>
      </Pressable>
      <Pressable onPress={handleLimpar} style={styles.button}>
        <Text style={styles.buttonText}>Limpar</Text>
      </Pressable>
      <View><Text style={styles.lbResultado}>{resultado}</Text></View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
  picker: {
    color: '#FFFFFF',
    width: 200,
    height: 50,
    backgroundColor: '#525252',
  },
  input: {
    color: '#000000',
    textAlign: 'right',
    height: 40,
    width: 200,
    backgroundColor: '#ffff',
  },
  tbMoeda: {
    color: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    width: 200,
    height: 40,
    paddingBottom: 10,
    backgroundColor: '#525252',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    color: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  lbResultado: {
    color: '#ffff',
  },
});