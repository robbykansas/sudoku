import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'

export default function Finish({ navigation }) {
  const name = useSelector(state => state.name)
  const difficulty = useSelector(state => state.difficulty)
  function goHome() {
    navigation.push('Home')
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.word}>Congrats {name} you solved sudoku with {difficulty} difficulties </Text> 
      </View>
      <View style={{width: '100%', justifyContent:'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.buttonHome} onPress={goHome}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Home</Text>
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
    alignItems: 'center'
  },
  word: {
    marginTop: 20,
    fontWeight:"bold",
    fontSize:20,
    color:"#90ee90",
    textAlign: 'center'
  },
  buttonHome:{
    width:"80%",
    backgroundColor:"#90ee90",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
})