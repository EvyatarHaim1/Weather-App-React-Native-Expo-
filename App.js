import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import *  as Location from 'expo-location';
import WEATHER_API_KEY from './keys';

// const apiKey = WEATHER_API_KEY;
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);

  useEffect(() => {
     load()
  }, [])

  async function load(){
    try{
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app')
        return 
        }
        const location = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = location.coords

        const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
        const response = await fetch(weatherURL);
        const result = await response.json()

        if(response.ok) {
          setCurrentWeather(result);
        } else {
          setErrorMessage(result.message)
        }

    } catch (error){}
  }


  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
