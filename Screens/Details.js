
import { useEffect } from "react"
import * as React from 'react';
import { Text, View, StyleSheet, FlatList,Image, TextInput, Button, TouchableOpacity, SectionList } from 'react-native';
import { useState } from "react";
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

///Feature to be added MovieShuffle
 // API DOMAIN
const API_URL = 'https://api.themoviedb.org/3'
// API NAME Get Trending By Week
const API_NAME = '/movie/popular'
// API KEY For Securty
const API_KEY = '9cf94028fec53093dbf929b47de035b3'
const IMAGE_DOMAIN_URL = 'https://image.tmdb.org/t/p/w500/'
//EXAMPLE to get Movies List Hot Trends
//https://api.themoviedb.org/3/trending/all/week?api_key=your_api_key

//Initialize firebase with the config parameters
const firebaseConfig = {
  apiKey: "AIzaSyBf3ng3XVUYlEY7_vXa8lJKlj_KXN4SYsI",
  authDomain: "movietime-56b1b.firebaseapp.com",
  databaseURL: "https://movietime-56b1b.firebaseio.com",
  projectId: "movietime-56b1b",
  storageBucket: "movietime-56b1b.appspot.com",
  messagingSenderId: "1083472798234",
  appId: "1:1083472798234:web:e3ce4acfa54c0fbcc827a3",
  measurementId: "G-LRV02S5NQ2"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
const [movies, setMovies] = useState([]);
const [searchWord, setSearchWord] = useState('');
const [isModalVisible, setModalVisible] = useState(false);
const [list, setList] = useState();

useEffect(() => {
  fetchMovies();
  mylist(); 
}, []);

const toggleModal = () =>  {
  setModalVisible(!isModalVisible);
}

const fetchMovies = () => {
fetch(API_URL + API_NAME + '?api_key=' + API_KEY)
.then((response) => response.json())
.then((responseJson) => {
setMovies(responseJson);
}).catch((error) => {
console.log('Data fetching failed');
});
}

const favouritelist =(item) => {
  console.log('pressed');
  firebase.database().ref('favMovies/').push(
    {'moviename': item.title,
    'movieId': item.id,
    'movieDesc':item.overview
   }
  );
}

const mylist = () => {
  firebase.database().ref('favMovies/').on('value',snapshot => {
    const data = snapshot.val();
    const list = Object.values(data);
    setList(list);
    console.log(list);
    <View style={styles.container}> {list.map(item => <Text> { item.title }</Text>)} </View>
  })
}

return (
<View style={styles.container}>
  <Text style={styles.header}>Welcome to Movie Playlist</Text>
 <TextInput style={styles.inputBox}
   placeholder="search a movie..." 
  onChangeText={(text) => setSearchWord(text)}/> 
  <View  style={styles.chooseBtn}>
  <Button  title="popular"/>
  <Button  title="trending"></Button>
  
  <Button  title="MyList" onPress = {mylist} />
  </View>
  
{movies && movies.results && movies.results.length>0 ? (
<FlatList
data={movies.results}
renderItem={({ item }) =>
  
  <TouchableOpacity style={{flexDirection:'column', margin:10}} >
    <Image style={styles.images} source={{uri: IMAGE_DOMAIN_URL+ item.backdrop_path}} />
    <Text style= {{fontSize:20, color:'white', textAlign:'center', backgroundColor:'#330603', padding:10}}>{item.title}</Text>  
    <Button title="add" onPress={() =>favouritelist(item)}/>
  </TouchableOpacity>}
keyExtractor={(item) => item.id.toString()}
//onRefresh={this.onRefresh}
//refreshing={this.state.refreshing}
></FlatList>)
 : null}

 </View>
);
}

const styles = StyleSheet.create({
container: {
marginTop:'5%',
color: 'black',
flex: 1,
justifyContent: 'center',

backgroundColor: '#223345',
padding: 8,
},
header: {
fontSize: 20,
textTransform: "uppercase",
textAlign:'center',
color:'white'
},
images: {
  width:'100%',
  height:300,
},
chooseBtn: {
  flexDirection: 'row',
  justifyContent:'space-around'
},
inputBox: {
  backgroundColor: 'white',
  borderWidth:1,
  width: '100%',
  height:50,
  borderRadius:8,
  margin: 'auto',
  marginBottom:20,
  
}
});
/* import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  
  const renderItem = ({ item }) => (
    <Text>{item.original_title} </Text>
  );
  const [popular, setPopular] = useState([])
  const url= 'https://api.themoviedb.org/3/movie/popular?api_key=9cf94028fec53093dbf929b47de035b3'
    //set favourite state
      //call Api
      useEffect(()=>{
        fetch(url)
        .then(response => response.json())
        .then(data=> {
          setPopular(data.results);
          console.log(data.results)})
        .catch(err=> console.log(err))
      },[])
  return (
    <View style={styles.container}>
      <Text>Hello Why is it not working</Text>   
      <FlatList 
      data = {popular}
      keyExtractor= {item => item.id}
      renderItem={renderItem}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
}); */