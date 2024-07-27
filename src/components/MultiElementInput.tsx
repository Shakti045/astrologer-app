import { Pressable, Text, View ,Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-paper';


const MultiElementInput = ({addElement,elements,removeElement,labelText,selectedElements}:{addElement:(language:string)=>void,elements:string[],removeElement:(value:string)=>void,labelText:string,selectedElements:string[]}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const seventyfivepercentwidth = screenWidth * 0.75;
  return (
    <View style={{flexDirection:'column',gap:5}}>
      <Pressable onPress={()=>setModalVisible(true)}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,paddingVertical:20,backgroundColor:'#e6ecff',borderRadius:5}}>
        <Text style={{color:'black'}}>{
            selectedElements.length>0?`${selectedElements.length} item(s) selected`:labelText
          }</Text>
        <Icon1 name='caretdown' size={20} color='black'/>
      </View>
      </Pressable>
      {
        selectedElements.map((element)=>{
          return (
            <Pressable key={element} onPress={()=>removeElement(element)}>
              <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10,paddingVertical:20,backgroundColor:'#e6ecff',borderRadius:5}}>
                <Text style={{color:'black'}}>{element}</Text>
                <Icon1 name='closecircle' size={20} color='black'/>
              </View>
            </Pressable>
          )
        })
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
          
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
           <View style={{flexDirection:'column',gap:10,width:seventyfivepercentwidth}}>
           {
            elements.map((element)=>{
              const contains = selectedElements.findIndex((el)=>el===element) !== -1;
                return (
                    <Pressable key={element} onPress={()=>{
                      if(contains){
                        removeElement(element);
                      }else{
                        addElement(element);
                      }
                    }} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                      <Text style={{color:'black'}}>{element}</Text>
                      {
                        contains?<Icon1 name='checkcircle' size={20} color='black'/>:<Icon name={'circle'} size={20} color='black'/>
                      }
                    </Pressable>
                )
            })
           }
           </View>
           <Button style={{marginTop:14}} onPress={()=>setModalVisible(false)} mode='contained'>Confirm</Button>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MultiElementInput;


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
