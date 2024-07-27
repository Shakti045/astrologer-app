import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon  from 'react-native-vector-icons/Ionicons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { ActivityIndicator } from 'react-native-paper';
import { FlatList } from 'react-native';
import { searchAstrologers } from '../services/actions';
import AstrologerCard from '../components/AstroloerCard';

type SearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const Search = ({navigation}:SearchProps) => {
  const [loading,setLoading] = React.useState(false);
  const [astrologers,setAstrologers] = useState<AstrologersFromApi[]>([]);
  const [query,setQuery] = useState('');
  

  const getAstrologers = async () => {
    setLoading(true);
    try {
       const data = await searchAstrologers(query)
       if(data?.astrologers){
         setAstrologers(data.astrologers);
       }
    } catch (error) {
        
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(query && query.trim().length>2){
        getAstrologers();
    }
  },[query])
  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <Pressable onPress={()=>{
          navigation.goBack();
        }}>
          <Icon name='arrow-back' size={20} color='black'/>
        </Pressable>
        <TextInput value={query} onChangeText={(value)=>setQuery(value)} placeholder='Start searching astrologer name' style={{flex:1,color:'black',fontSize:20}} placeholderTextColor={'black'}/>
      </View>
      {
        loading?<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'}/></View>:(
          <FlatList
          data={astrologers}
          keyExtractor={(item)=>item._id}
          renderItem={({item})=>(
            <Pressable onPress={()=>{
              navigation.navigate('AstrologerDetails',{id:item._id});
            }}>
              <AstrologerCard astrologer={item}/>
            </Pressable>
          )}
          />
        )
      }
      {
        (astrologers.length === 0 && query.trim().length>2) && <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'black',fontWeight:'900'}}>No astrologers found</Text></View>
      }
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    gap:10,
  },
  inputcontainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    padding:10,
    // backgroundColor:'#e6ecff',
    borderRadius:5,
    borderBottomColor:'#666600',
    borderBottomWidth:1
  }
})