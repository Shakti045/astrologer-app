import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import SortAndFilter from './SortAndFilter';


const HomePageHeaderRight = ({onSearchIconPress,setFilters,filters}:{onSearchIconPress:()=>void,setFilters:(props:FilterProps)=>void,filters:FilterProps}) => {
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    
      const closeModal = () => {
        setFilterModalVisible(false);
      };
    
  return (
    <View style={styles.container}>
    <Pressable onPress={()=>setFilterModalVisible(!filterModalVisible)}>
        {
            (filters.experties.length>0 || filters.languages.length>0 || filters.sortvalue>0) ? <Icon1 name='filter-check' size={20} color='black'/> : <Icon name='filter' size={20} style={{opacity:0.7}} color='black'/>
        }
      </Pressable>
      <Pressable onPress={onSearchIconPress}>
        <Icon name='search1' size={20} color='black'/>
      </Pressable>
      <Modal
        transparent={true}
        animationType="slide"
        visible={filterModalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <SortAndFilter closeModal={closeModal} setFilters={setFilters} filters={filters}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default HomePageHeaderRight

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        gap:15
    },
    modalOverlay: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent:'flex-end'
      },
      modalContent: {
        width:'100%',
        backgroundColor: '#FFF',
        height: '50%',
      },
      closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#FF0000',
        borderRadius: 5,
      },
      buttonText: {
        color: '#FFF',
      },
})