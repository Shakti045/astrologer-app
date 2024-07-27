import { Pressable, StyleSheet, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Button, Text } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import { expertiseAreas, indianLanguages } from '../constants/indext';
import { ScrollView } from 'react-native';

const SortAndFilter = ({closeModal,setFilters,filters}:{closeModal:()=>void,setFilters:(props:FilterProps)=>void,filters:FilterProps}) => {
    const [filterClicked, setFilterClicked] = useState(1);
    const [selectedValue, setSelectedValue] = useState(filters.sortvalue || 0);
    const [experTies, setExperties] = useState<string[]>(filters.experties || []);
    const [languages, setLanguages] = useState<string[]>(filters.languages || []);



    const radioButtons = useMemo(() => ([
        {
            id: '1', 
            label: 'Experience: High to Low',
            value: 1
        },
        {
            id: '2',
            label: 'Experience: Low to High',
            value: 2
        },
        {
            id: '3',
            label: 'Price: High to Low',
            value: 3
        },
        {
            id: '4',
            label: 'Price: Low to High',
            value: 4
        },
    ]), []);
    
    const LanguageFilters = () =>{
      return (
        <ScrollView
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}>
            {
                indianLanguages.map((language)=>{
                    const contains = languages.findIndex((el)=>el===language) !== -1;
                    return (
                        <Pressable key={language} onPress={()=>{
                            if(contains){
                                setLanguages(languages.filter((el)=>el!==language));
                            }else{
                                setLanguages([...languages,language]);
                            }
                        }} style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:15}}>
                            {
                                contains ? <Icon name='checkcircle' size={20} color='black'/> : <Icon1 name='circle' size={20} color='black'/>
                            }
                            <Text>{language}</Text>
                        </Pressable>
                    )
                })
            }
        </ScrollView>
      )
    }



    const ExpertyFilter = () =>{
        return (
          <ScrollView
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}>
              {
                  expertiseAreas.map((experty)=>{
                      const contains = experTies.findIndex((el)=>el===experty) !== -1;
                      return (
                          <Pressable key={experty} onPress={()=>{
                              if(contains){
                                  setExperties(experTies.filter((el)=>el!==experty));
                              }else{
                                  setExperties([...experTies,experty]);
                              }
                          }} style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:15}}>
                              {
                                  contains ? <Icon name='checkcircle' size={20} color='black'/> : <Icon1 name='circle' size={20} color='black'/>
                              }
                              <Text>{experty}</Text>
                          </Pressable>
                      )
                  })
              }
          </ScrollView>
        )
      }



    const SortBy = () =>{
        return (
          <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false}>
              {
                  radioButtons.map((e)=>{
                      const contains = e.value === selectedValue;
                      return (
                          <Pressable key={e.id} onPress={()=>{
                              if(contains){
                                    setSelectedValue(0);
                              }else{
                                    setSelectedValue(e.value);
                              }
                          }} style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:15}}>
                              {
                                  contains ? <Icon name='checkcircle' size={20} color='black'/> : <Icon1 name='circle' size={20} color='black'/>
                              }
                              <Text>{e.label}</Text>
                          </Pressable>
                      )
                  })
              }
          </ScrollView>
        )
      }
  
    
    const filterHandler = () =>{
        setFilters({
            sortvalue: selectedValue,
            languages: languages,
            experties: experTies
        });
        closeModal();
    }
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center"}}>
        <Text style={{fontSize:20,fontWeight:'600'}}>Sort & Filter</Text>
        <Pressable onPress={closeModal}>
        <Icon name='close' size={20} color='black'/>
        </Pressable>
      </View>
      <View style={styles.separator} />


      <View style={styles.filterContainer}>
        <View style={{flexDirection:'column',alignItems:'flex-start',gap:10}}>
            <Pressable onPress={()=>setFilterClicked(1)} style={[filterClicked!==1 && styles.buttonNotselected,{width:100}]}><Text style={filterClicked===1 && {color:'blue'}}>Sort By</Text></Pressable>
            <Pressable onPress={()=>setFilterClicked(2)} style={[filterClicked!==2 && styles.buttonNotselected,{width:100}]}><Text style={filterClicked===2 && {color:'blue'}}>Language</Text></Pressable>
            <Pressable onPress={()=>setFilterClicked(3)} style={[filterClicked!==3 && styles.buttonNotselected,{width:100}]}><Text style={filterClicked===3 && {color:'blue'}}>Experty</Text></Pressable>
        </View>
        <View  style={styles.verticalseparator}></View>
        <View style={{flexDirection:'column',justifyContent:'flex-start'}}>
            {
                filterClicked === 1 && <SortBy/>
            }
            {
                filterClicked === 2 && <LanguageFilters/>
            }
            {
                filterClicked === 3 && <ExpertyFilter/>
            }
        </View>
      </View>


      <View>
    <View style={styles.separator} />
     <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
        <Button onPress={filterHandler} style={{borderRadius:5,width:150}} mode='contained'>Apply</Button>
     </View>
      </View>
    </View>
  )
}

export default SortAndFilter

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white',
        borderRadius:10,
        elevation:5,
        shadowOffset:{
        width:5,
        height:5
        },
        shadowColor:'black',
        shadowOpacity:0.25
    },
    separator: {
        height: 1,
        backgroundColor: '#2F2F2F',
        opacity: 0.3,
        marginVertical: 10,
    },
    verticalseparator: {
        width: 1, 
        backgroundColor: '#2F2F2F', 
        opacity: 0.3,
        marginHorizontal: 10, 
        height: '100%'
      },
      filterContainer: {
        flexDirection: 'row',
        height:'70%'
         // justifyContent: 'space-between',
        // alignItems: 'center',
      },
      buttonNotselected:{
            color:'black',
            opacity:0.4
      },
      
})