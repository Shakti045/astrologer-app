import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{JSX} from 'react'
import Icon  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const CustomHeader = ({title,isHomePage,headerRight}:{title:string,isHomePage:boolean,headerRight?:JSX.Element}):JSX.Element => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.headerLeft}>
        {
          !isHomePage && <Pressable onPress={()=>navigation.goBack()}><Icon name='arrow-back' size={20} color='black'/></Pressable>
        }
        <Text style={styles.title}>{title}</Text>
        </View>
        {
          headerRight && headerRight
        }
    </View>
  )
}

export default CustomHeader;

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15,
    backgroundColor:'yellow'
  },
  title:{
    fontSize:18,
    fontWeight:'bold',
    color:'black'
  },
  headerLeft:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  }
})