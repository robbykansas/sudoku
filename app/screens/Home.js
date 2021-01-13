import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from 'react-redux'
import { dataPlayer, resetStatus } from '../store/action'

export default function Home({ navigation }) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetStatus())
  })
  function goGame(){
    if (name === '' || difficulty === '') {
      Alert.alert(
        'Invalid',
        'Please input your name and difficulties',
        [
          {text: 'Yes', onPress: () => console.log('invalid')}
        ],
        {
          cancelable: false
        }
      )
    } else {
      dispatch(dataPlayer(name, difficulty))
      navigation.navigate("Game")
    }
  }
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={styles.logo}>Sudoku</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Name" 
            placeholderTextColor="#003f5c"
            onChangeText={text => setName(text)}/>
        </View>
      </View>
      <View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.dif}>Difficulty</Text>
        </View>
        <RNPickerSelect 
          onValueChange={(value) => setDifficulty(value)}
          style={styles.inputAndroid}
          items={[
            { label: 'EASY', value: 'easy'},
            { label: 'MEDIUM', value: 'medium'},  
            { label: 'HARD', value: 'hard'},
            { label: 'RANDOM', value: 'random'}
          ]}
        />
      </View>
      <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.buttonPlay} onPress={goGame}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>PLAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20,
    alignItems:'center',
  },
  inputText:{
    height:50,
    color:'#fff',
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#90ee90",
    marginBottom:40,
  },
  dif:{
    fontWeight:"bold",
    fontSize:20,
    color:"#90ee90",
  },
  buttonPlay:{
    width:"80%",
    backgroundColor:"#90ee90",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});