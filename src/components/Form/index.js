import React, { useState } from "react";
import { 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity ,
  Vibration,
  Keyboard,
  Pressable,
  FlatList
} from "react-native";
import ResultImc from "./ResultImc/";
import styles from "./styles";

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("preencha o peso e altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErroMessage] = useState(null);
  const [imcList, setImcList] = useState([]) 

  function imcCalculator() {
    //transforma a virgula em um ponto
    let heightFormat = height.replace(",",".");
    let totalImc = ((weight / (heightFormat * heightFormat)).toFixed(2));
    setImcList((arr) => [...arr, {id: new Date().getTime, imc: totalImc}]);
    setImc(totalImc)
  }

  function verificationImc() {
    if (imc === null) {
      Vibration.vibrate();
      setErroMessage("campo obrigatório*")
    }
    setMessageImc("Seu imc é igual:");
    setTextButton("Calcular Novamente");
  }

  function validationImc() {
    console.log(imcList)
    if (weight != null && height != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual:");
      setTextButton("Calcular Novamente");
      setErroMessage(null)
    }
    else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("preencha o peso e altura");
    }
  }

  return (
    // Pressable torna uma área clicavel e o Keyboard.dismissn faz desaparecer o teclado
    
      <View style={styles.formContext}>
          {imc == null ? 
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessege}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 1.75"
            keyboardType="numeric"
          />
          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessege}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex: 86.300"
            keyboardType="numeric"
          />
          <TouchableOpacity
            onPress={() => validationImc()}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
        : 
        <View style={styles.exhibitionResultImc}>
        <ResultImc messageResultIMc={messageImc} resultImc={imc} />
        <TouchableOpacity
            onPress={() => validationImc()}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
        }
        <FlatList
        showsVerticalScrollIndicator={false} 
        style={styles.listImcs} 
        data={imcList.reverse()} 
        renderItem={({item}) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC = </Text>
               {item.imc}
            </Text>
          )
        }}
        keyExtractor={(item) => {
          item.id
        }}
        />
      </View>
  );
}