import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import CustomHeader from '../components/CustomHeader';
import AstrologerForm from '../components/AstrologerForm';

type AstrologerCreateUpdateProps = NativeStackScreenProps<RootStackParamList, 'AstrologerCreateUpdate'>;

const AstrologerCreateUpdate = ({navigation,route}:AstrologerCreateUpdateProps) => {
  const {isCreate,astrologer} = route.params;
  return (
    <View>
      <CustomHeader isHomePage={false} title={isCreate?'Add A New Astrologer':'Update Astrologer Details'}/>
      <AstrologerForm goToHomePage = {()=>{
          navigation.popToTop();
      }} isCreate={isCreate} astrologer ={astrologer} />
    </View>
  )
}

export default AstrologerCreateUpdate

const styles = StyleSheet.create({})