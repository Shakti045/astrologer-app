import {  FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {RootStackParamList} from '../App'
import CustomHeader from '../components/CustomHeader';
import { fetchAstrologers } from '../services/actions';
import AstroloerCard from '../components/AstroloerCard';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { Pressable } from 'react-native';
import HomePageHeaderRight from '../components/HomePageHeaderRight';


type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({navigation}:HomeProps) => {
  const [astrologers,setAstrologers] = useState<AstrologersFromApi[]>([]);
  const [hasMore,setHasMore] = useState(false);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(true);
  const [filters,setFilters] = useState<FilterProps>({
    languages:[],
    experties:[],
    sortvalue:0
  })

  const getAstrologers = async (addmore:boolean) => {
    try {
      setLoading(true);
      if(!addmore && page!=1){
        setPage(1);
      }
      const responce = await fetchAstrologers(addmore?page:1,5,filters);
      addmore?setAstrologers([...astrologers,...responce.astrologers]):setAstrologers(responce.astrologers);
      setHasMore(responce.hasMore)
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getAstrologers(false);
      return () => {
        // cleanup
        setAstrologers([]);
        setPage(1);
        setHasMore(false);
      };
    }, [filters])
  );
  useEffect(()=>{
    if(page>1){
      getAstrologers(true);
    }
  },[page])
  return (
    <View style={styles.container}>
      <CustomHeader isHomePage={true} title='Astrologer' headerRight={<HomePageHeaderRight filters={filters} onSearchIconPress = {()=>navigation.push('Search')} setFilters={setFilters} />}/>
      {
        astrologers.length>0 && <FlatList
        data={astrologers}
        keyExtractor={(item)=>item._id}
        renderItem={({item})=><>
         <Pressable onPress={()=>{
          navigation.push('AstrologerDetails',{id:item._id})
        }}>
          <AstroloerCard astrologer={item}/>
         </Pressable>
         {
          (hasMore &&  astrologers[astrologers.length-1]._id === item._id) && (
              <>
          <View style={{paddingBottom:10,marginTop:10,justifyContent:'center',alignItems:'center'}}>
           <Button mode='contained' onPress={()=>setPage(page+1)}>
          <Text style={{color:'white'}}>Load More</Text>
           </Button>
          </View>
          </>)
         }
        </>
        }
      />
      }
      {
          loading && <View style={styles.loadingcontainer}>
            <ActivityIndicator size='large' color='black'/>
          </View>
      }
      {
        astrologers.length === 0 && !loading && <View style={styles.loadingcontainer}>
          <Text style={{color:'black',fontWeight:'900'}}>No Astrologers Found</Text>
        </View>
      }
       <TouchableOpacity onPress={()=>navigation.navigate('AstrologerCreateUpdate',{isCreate:true})} style={styles.floatingButton}>
        <Text style={{fontSize: 30, color: 'black'}}>+</Text>
      </TouchableOpacity>
    </View>
  )
}


export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#FF5722', 
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loadingcontainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    minHeight:200
  }
});