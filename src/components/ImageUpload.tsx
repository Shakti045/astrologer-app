import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Pressable, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import { ActivityIndicator } from 'react-native-paper';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/djq1vmvy4/image/upload';
const UPLOAD_PRESET = 'rfahuwwl'; 

const ImageUpload = ({onChnage,imgurl}:{onChnage:(url:string)=>void,imgurl:string}) => {

  const [uploading,setuploading] = useState<boolean>(false);
  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        if(uri){
          uploadImage(uri);
        }
      }
    });
  };

  const uploadImage = async (uri:string) => {
    setuploading(true);
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onChnage(response.data.secure_url);
    } catch (error) {
      console.error('Upload Error:', error);
    }finally{
      setuploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={selectImage} style={{width:200,height:200,borderRadius:100,borderStyle:'dotted',borderWidth:2,
        flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        {
          uploading?<ActivityIndicator animating={true} color='blue'/>: (
            imgurl ? <Image source={{ uri: imgurl }} style={styles.image} /> : (
              <View style={{flexDirection:'column',gap:3,alignItems:'center'}}>
                 <Text style={{color:'black'}}>Uplaod Profile Pic</Text>
                 <Icon name='upload' size={30} color='black'/>
              </View>
            )
          )
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default ImageUpload;
