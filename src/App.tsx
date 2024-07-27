import React,{JSX} from 'react'
import { StatusBar } from 'react-native'


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'



import Home from './screens/Home'
import AstrologerDetails from './screens/AstrologerDetails'
import Search from './screens/Search'
import AstrologerCreateUpdate from './screens/AstrologerCreateUpdate'


export type RootStackParamList = {
  Home: undefined;
  AstrologerDetails: {
    id: string;
  };
  Search: undefined;
  AstrologerCreateUpdate: {
    isCreate: boolean;
    astrologer?: AstrologerFullDetails
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = ():JSX.Element => {
  return (
    <>
    <StatusBar  barStyle='dark-content' backgroundColor='#cccc00'  />
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
        <Stack.Screen name="AstrologerDetails" component={AstrologerDetails} options={{ headerShown: false }} />
        <Stack.Screen name="AstrologerCreateUpdate" component={AstrologerCreateUpdate} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App;
