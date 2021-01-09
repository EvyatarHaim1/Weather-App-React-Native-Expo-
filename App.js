import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import *  as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';

const apiKey = 'd8eee5e8e18aa41e451dd8d410253ec1';
const BASE_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?`

export default function App() {

  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ currentWeather, setCurrentWeather ] = useState(null);
  const [ unitSystem, setUnitSystem ] = useState('metric');
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

        const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${apiKey}`
        const response = await fetch(weatherURL);
        const result = await response.json()

        if(response.ok) {
          setCurrentWeather(result);
        } else {
          setErrorMessage(result.message)
        }

    } catch (error){
      setErrorMessage(error.message)
    }
  }
  
  if(currentWeather){
    return (
      <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.main}>
            <WeatherInfo currentWeather={currentWeather}/>
          </View>
      </View>
    )} else {
      return (
        <View style={styles.container}>
          <StatusBar style="auto" />
           <Text>{errorMessage}</Text>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  }
});
