import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';


import {  ActivityIndicator, Button, TextInput } from 'react-native-paper';
import MultiElementInput from './MultiElementInput';
import ImageUpload from './ImageUpload';
import { createAstrologer, updateAstrologer } from '../services/actions';
import Snackbar from 'react-native-snackbar';
import { expertiseAreas, indianLanguages } from '../constants/indext';

const AstrologerSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    experience: yup.number().required('Experience is required').min(0,'Experience can not be negative'),
    languages: yup.array().of(yup.string()).required().min(1,'Atleast 1 language required'),
    experties: yup.array().of(yup.string()).required().min(1,'Atleast 1 experty is required'),
    price: yup.number().required('Price is required').min(0,'Price can not be negative'),
    imageUrl: yup.string().required('Image is required'),
    bio: yup.string().required('Bio is required').min(1000,'At least 1000 characters is required'),
});

const AstrologerForm = ({isCreate,astrologer,goToHomePage}:{isCreate:boolean,astrologer?:AstrologerFullDetails,goToHomePage:()=>void}) => {
    const [loading,setloading] = useState(false);
    const initialValues:Astrologer = {
        name: isCreate?'':astrologer?.name || '',
        experience: isCreate?0:astrologer?.experience || 0,
        languages: isCreate?[]:astrologer?.languages || [],
        experties: isCreate?[]:astrologer?.experties || [],
        price: isCreate?0:astrologer?.price || 0,
        imageUrl: isCreate?'':astrologer?.imageUrl || '',
        bio: isCreate?'':astrologer?.bio || '',
    }

    let resetHandler: ((e?: React.SyntheticEvent<any>) => void) | null = null;
    async function actionHandler(values:Astrologer){
        setloading(true);
        try {
            if(isCreate){
              const responce  = await createAstrologer({...values,isCreate:true,price:+values.price,experience:+values.experience});
              if(responce === true){
                Snackbar.show({duration:Snackbar.LENGTH_SHORT,text:'Astrologer created successfully'})
                resetHandler && resetHandler();
              }
            }else{
              const responce = await updateAstrologer({...values},astrologer?._id!);
                if(responce === true){
                    Snackbar.show({duration:Snackbar.LENGTH_SHORT,text:'Astrologer updated successfully'})
                    resetHandler && resetHandler();
                    goToHomePage();
                }
            }
        } catch (error) {
            Snackbar.show({duration:Snackbar.LENGTH_SHORT,text:'Something went wrong'})
        }finally{
            setloading(false);
        }
    }
  return (
    <ScrollView style={styles.formContainer} >
     <Formik
        initialValues={initialValues}
        validationSchema={AstrologerSchema}
        onSubmit={(values) => {
            actionHandler(values);
        }}
     >
        {({ handleChange, handleSubmit, values, errors, touched , setFieldValue ,handleReset }) => {
            resetHandler = handleReset;
            return (
                <View style={styles.form}>
               <View style={styles.container}>
                <TextInput label='Astrologer Name'  onChangeText={handleChange('name')} value={values.name}/>
                {
                 errors.name && touched.name && <Text style = {styles.errorText}>{errors.name}</Text>
                }
               </View>
               <View style={styles.container}>
               <View  style={styles.inputConrainer}>
                    <TextInput style={styles.input} label='Experience' onChangeText={handleChange('experience')} value={values.experience.toString()} keyboardType='numeric'/>
                    <TextInput style={styles.input} label='Price' onChangeText={handleChange('price')} value={values.price.toString()} keyboardType='numeric'/>
                </View>
                {
                    ((errors.experience && touched.experience) || (errors.price && touched.price)) && <Text style = {styles.errorText}>{errors.experience?errors.experience:errors.price}</Text>
                }
               </View>
                <View style={styles.container}>
                <MultiElementInput labelText = 'Select your languages' addElement={(language:string)=>{
                    values.languages.push(language);
                    setFieldValue('languages',values.languages);
                }} elements={indianLanguages}
                selectedElements= {values.languages}
                 removeElement={(language:string)=>{
                    values.languages = values.languages.filter((lang)=>lang!==language);
                    setFieldValue('languages',values.languages);
                }}/>
                {
                    errors.languages && touched.languages && <Text style = {styles.errorText}>{errors.languages}</Text>
                }
                </View>
                <View style={styles.container}>
                <MultiElementInput labelText = 'Select your experties' addElement={(experty:string)=>{
                    values.experties.push(experty);
                    setFieldValue('experties',values.experties);
                }} elements={expertiseAreas} 
                   selectedElements= {values.experties} removeElement={(experty:string)=>{
                    values.experties = values.experties.filter((lang)=>lang!==experty);
                    setFieldValue('experties',values.experties);
                }}/>
                {
                    errors.experties && touched.experties && <Text style = {styles.errorText}>{errors.experties}</Text>
                }
                </View>
                <View style={styles.container}>
                 <ImageUpload onChnage = {(url:string)=>{
                        setFieldValue('imageUrl',url);
                 }} imgurl = {values.imageUrl}/>
                {
                    errors.imageUrl && touched.imageUrl && <Text style = {styles.errorText}>{errors.imageUrl}</Text>
                }
                </View>
                <View style={styles.container}>
                <TextInput multiline label='Bio'  onChangeText={handleChange('bio')} value={values.bio}/>
                {
                    errors.bio && touched.bio && <Text style = {styles.errorText}>{errors.bio}</Text>
                }
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Button disabled={loading} style={{width:100}} mode="contained-tonal" onPress={()=>{handleSubmit()}}>
                    {
                        !loading?<Text>Submit</Text>:<ActivityIndicator/>
                    }
                </Button>
                </View>
                <View style={{height:70}}></View>
            </View>
            )
        }}
     </Formik>
    </ScrollView>
  )
}

export default AstrologerForm;

const styles = StyleSheet.create({
    formContainer: {
        padding: 5
    },
    form:{
        flexDirection: 'column',
        gap: 10,
    },
    errorText:{
        color: 'red',
    },
    inputConrainer:{
        flexDirection: 'row',
        gap: 5,
    },
    input:{
        flex: 1,
    },
    container:{
        flexDirection: 'column',
        gap:5,
        marginBottom: 10,
    }
})