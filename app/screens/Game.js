import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBoard, updateBoard, solver, validate, resetStatus } from '../store/action'

export default function Game({ navigation }) {
  const dispatch = useDispatch()
  const board = useSelector(state => state.board)
  const dummy = useSelector(state => state.dummy)
  const loading = useSelector(state => state.loading)
  const error = useSelector(state => state.error)
  const status = useSelector(state => state.status)
  const difficulty = useSelector(state => state.difficulty)
  
  useEffect(() => {
    if (difficulty) {
      dispatch(fetchBoard(difficulty))
    }
    if (status) {
      if (status.status === 'solved') {
        navigation.replace('Finish')
      } else if (status.status === 'unsolved') {
        Alert.alert(
          'Still Unsolved',
          'You must input all data',
          [
            {text: 'Yes', onPress: () => dispatch(resetStatus())}
          ],
          {
            cancelable: false
          }
        )
      } else if (status.status === 'broken') {
        Alert.alert(
          'Broken',
          'You must solve sudoku correctly',
          [
            {text: 'Yes', onPress: () => dispatch(resetStatus())}
          ],
          {
            cancelable: false
          }
        )
      }
    }
  }, [status])

  if (loading) return (
    <SafeAreaView>
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text> Loading </Text>
      </View>
    </SafeAreaView>
  );

  if (error) return (
    <SafeAreaView>
      <View style={[styles.container, {alignItems: 'center'}]}>
        <Text> Error </Text>
      </View>
    </SafeAreaView>
  );

  function sudokuSolver(data) {
    dispatch(solver(data))
  }

  function sudokuValidate(data) {
    dispatch(validate(data))
  }

  function ColumnComponent(props) {
    const { rows, index, dummy } = props
    const handlerChangeText = (text, sIndex) => {
      // setBoard(state => ({...state, board: state.board.map((row, i) => row.map((item, j) => {
      //   if(i === index && j === sIndex) {
      //     return Number(text)
      //   } else {
      //     return item
      //   }
      // }))}))

      // let newBoard = JSON.parse(JSON.stringify(board.board))
      // newBoard[index][sIndex] = Number(text)
      // setBoard(state => ({...state, board: newBoard}))
      // console.log(board, '<<<< board')
      dispatch(updateBoard(board, text, index, sIndex))
    }
    return (
      <View style={styles.boxRow}>
        {
        rows.map((columns, sIndex) => {
          return (
            <View key={sIndex}>
              {dummy.board[index][sIndex] > 0 ? <Text key={sIndex} style={[styles.boxColumn, {backgroundColor: '#90ee90'}]}>{columns}</Text> : 
                columns > 0 ? <TextInput 
                keyboardType = 'numeric'
                defaultValue = {columns.toString()}
                onChangeText = {(text) => handlerChangeText(text, sIndex)}
                style={styles.boxColumn}
              /> : 
              <TextInput 
                keyboardType = 'numeric'
                onChangeText = {(text) => handlerChangeText(text, sIndex)}
                style={styles.boxColumn}
              />}
              {/* <TextInput 
                style={ dummy.board[index][sIndex] > 0 ? [styles.boxColumn, {backgroundColor: '#90ee90'}] :
                        styles.boxColumn
                      }
                value={columns === 0 ? '' : String(columns)}
                keyboardType = 'numeric'
                textAlign='center'
                editable={dummy.board[index][sIndex] === 0 ? true : false}
                onChangeText = {(text) => handlerChangeText(text, sIndex)}
              /> */}
            </View>
          )
        })
        }
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {board.board.map((rows, index) => {
          return <ColumnComponent rows={rows} index={index} dummy={dummy} key={index}/>
        })}
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Button
            onPress={() => sudokuSolver(board)}
            title="Sudoku Solver"
            color="#841584"
          />
        </View>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <Button
            onPress={() => sudokuValidate(board)}
            title="Validate Answer"
            color="#7fffd4"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxRow: {
    width: 40,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
  },
  boxColumn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    display: 'flex',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
