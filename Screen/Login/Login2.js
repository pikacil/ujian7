import React, { useState, useEffect } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';

import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import auth from '@react-native-firebase/auth';

const Login2 = ({navigation}) => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const Login = () => {
    console.log('Test Register')
           auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('User account  signed in!');
            console.log("RESPONSE"+response)
            navigation.navigate('Menu')
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }
        
            console.error(error);
          });
   
   }
    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Layout style={styles.container}>
            <Input style={styles.layout}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                autoCapitalize="none"
                onChangeText={txtemail => setemail(txtemail)} />

           
            <Input style={styles.layout}
                placeholder='Masukan umur anda'
                placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    autoCapitalize="none"
                onChangeText={txtpassword => setpassword(txtpassword)} />


                <Button onPress={() => { Login() }}>
                    Login
            </Button>
           
           
        </Layout>
        </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',

    },
    
    layout: {
        margin: 15,
        alignItems: 'center',
    },

    containerPicture: {


        flexDirection: 'column',
        justifyContent: 'space-between'

    },
    avatar: {
        alignItems: 'center',
        margin: 8,
    },
  

});

export default Login2

