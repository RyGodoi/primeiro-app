import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid, ScrollView
 } from 'react-native';

export default function App() {

  const [estado,setarEstado] = useState('leitura');
  const [anotacao,setarAnotacao] = useState('');


useEffect(()=>{
  (async () => {
    try{
      const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
      setarAnotacao(anotacaoLeitura);
    }catch(error){}
  })();
},[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao', anotacao)
    }catch(error){

    }
  }

  function atualizarTexto() {
    setarEstado('leitura');
    setData();
    ToastAndroid.show('Salvo com sucesso!', ToastAndroid.SHORT);
  }

  if (estado=='leitura') {
    return (
      <View style={{height:'100%'}}>
        <StatusBar hidden />
      <ScrollView >
        {/*<StatusBar style="light" />*/}
        <View style={style.header}>
        <Text style={style.alinhamentoTexto}>Aplicativo Anotação</Text>
        </View>

        {(anotacao != null && anotacao != '')?
        <View style={{padding:20}}>
          <Text style={style.anotacao}>{anotacao}</Text>
        </View>
        :
        <View style={{padding:20, opacity:0.5}}>
          <Text style={style.anotacao}>Nenhuma anotação encontrada! </Text>
        </View>
        }


      </ScrollView>
        {(anotacao != null && anotacao != '')?
      <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={style.btnAnotacao}><Text style={style.btnEstilo}>Editar</Text></TouchableOpacity>
      :
      <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={style.btnAnotacao}><Text style={style.btnEstilo}>Criar</Text></TouchableOpacity>
      }
      </View>
    );
  }else if (estado== 'atualizando') {
    return (
      <View style={{height:'100%'}}>
        <StatusBar hidden />
        {/*<StatusBar style="light" />*/}
        <View style={style.header}>
        <Text style={style.alinhamentoTexto}>Aplicativo Anotação</Text>
        </View>
        <View>
          <TextInput autoFocus={true} style={style.textInput} numberOfLines={20} onChangeText={(text)=>setarAnotacao(text)} multiline={true} value={anotacao}></TextInput>
        </View>
        <TouchableOpacity onPress={()=> atualizarTexto()}   style={style.btnAnotacao}><Text style={style.btnEstilo}>Salvar</Text></TouchableOpacity>
      </View>
    );
  }

};


const style = StyleSheet.create({
  header:{
    width:'100%',
    padding:20,
    backgroundColor:'#069'
  },
  alinhamentoTexto:{
    textAlign:'center',
    color:'white',
    fontSize:30
  },
  anotacao:{
    fontSize:15
  },
  btnAnotacao:{
    position:'absolute',
    right:20,
    bottom:20,
    padding:20,
    backgroundColor:'#069',
    borderRadius:100,
  },
  btnEstilo:{
    color:'white',
    position:'relative',
    textAlign:'center',
    fontSize:20
  },
  textInput:{
    width:'100%',
    height:'80%',
    backgroundColor:'#F3F3F3',
    padding:10,
    fontSize:16
  }
})