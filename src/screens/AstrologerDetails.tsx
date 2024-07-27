import { Alert, ScrollView, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../components/CustomHeader'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import { deleteAstrologer, getFullDetailsofAstrologer } from '../services/actions'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import AstrologerCard from '../components/AstroloerCard'
import Icon from 'react-native-vector-icons/AntDesign';
import Snackbar from 'react-native-snackbar'

type AstrologerDetailsProps = NativeStackScreenProps<RootStackParamList, 'AstrologerDetails'>;

const AstrologerDetails = ({route,navigation}:AstrologerDetailsProps) => {
  const [astrologer,setAstrologer] = useState<AstrologerFullDetails>();
  const [loading,setLoading] = useState(true);
  const [deleteLoading,setDeleteLoading] = useState(false);
  const {id} = route.params;

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      const responce = await deleteAstrologer(id);
      if(responce === true){
        Snackbar.show({
          text: 'Account deleted successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.replace('Home');
      }
    } catch (error) {
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
    }finally{
      setDeleteLoading(false);
    }
  }

  const getDetailsofAstrologer = async () => {
    try {
      setLoading(true);
      const data = await getFullDetailsofAstrologer(id);
      if(data?.astrologer){
        setAstrologer(data.astrologer);
      }
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
      getDetailsofAstrologer();
  },[id])
  return (
    <View style={styles.mainContainer}>
      <CustomHeader isHomePage={false} title='Astrologer Details'/>
      {
        loading?<View style={styles.loadingcontainer}><ActivityIndicator animating={true} size='large'/></View>:(
          <View style={styles.container}>
            <AstrologerCard astrologer={astrologer!}/>
            <ScrollView style={styles.bioContainer}>
              {
                <Text>{astrologer?.bio}</Text>
              }
              {
                <Text>{astrologer?.bio}</Text>
              }
            </ScrollView>
            <View style={{flexDirection:'row',gap:15,justifyContent:'center',alignItems:'center',paddingBottom:10}}>
              {
                deleteLoading?<ActivityIndicator animating={true} size='small'/>:(
                <>
                  <TouchableNativeFeedback onPress={()=>{
                 navigation.replace('AstrologerCreateUpdate',{isCreate:false,astrologer})
                 }}>
                 <Icon name='edit' size={30} color='black'/>
                 </TouchableNativeFeedback>
                 <TouchableNativeFeedback onPress={()=>{
                    Alert.alert('Account delete', 'Do you want to delete account ?', [
                   {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => handleDelete()},
                  ]);
                }}>
                 <Icon name='delete' size={30} color='black'/>
                </TouchableNativeFeedback>
              </>
                )
              }
            </View>
          </View>
        )
      }
    </View>
  )
}

export default AstrologerDetails

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  loadingcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container:{
    flex:1,
    flexDirection:'column',
    gap:10,
  },
  bioContainer:{
    margin:10,
    padding:10,
    backgroundColor:'#f2f2f2',
    borderRadius:10
  }
})