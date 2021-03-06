import React from "react";
import { Text, View, TouchableOpacity, Share } from "react-native";
import styles from "./styles";

export default function ResultImc(props) {
  const onShare = async () => {
    const result = await Share.share({
      message: "Meu imc hoje é: " + props.resultImc
    })
  }
  return (
    <View style={styles.contextImc}>
      <View style={styles.boxShareButton}>
        <Text style={styles.titleResultImc}>{props.messageResultIMc}</Text>
        <Text style={styles.resultImc}>{props.resultImc}</Text>
        <TouchableOpacity 
          style={styles.shared} 
          onPress={onShare}>
          <Text style={styles.sharedText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
