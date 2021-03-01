import React, { useState, useEffect } from 'react'

import {Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';

import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")

  const Login = () => {
   
           auth()
          .signInWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('User account  signed in!');
            console.log("RESPONSE"+response)
            console.log(JSON.stringify(response.user));
            navigation.navigate('Menu',{datanama:response.user.email,})
            // console.log(SON.stringify(datanama))
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
                autoCapitalize="none"
                onChangeText={txtemail => setemail(txtemail)} />

           
            <Input style={styles.layout}
                placeholder='password'
                    secureTextEntry
                    placeholder='Password'
                    autoCapitalize="none"
                onChangeText={txtpassword => setpassword(txtpassword)} />


                <Button onPress={() => { Login() }}>
                    Login
            </Button>
            <Card style={styles.footerView}>
            <Text style={styles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate('Register')} style={styles.footerLink}>Sign up</Text></Text>
            </Card>
           
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
    footerView: {
      flex: 1,
      alignItems: "center",
      marginTop: 20
  },
  footerText: {
      fontSize: 16,
      color: '#2e2e2d'
  },
  footerLink: {
      color: "#788eec",
      fontWeight: "bold",
      fontSize: 16
  },

});

export default Login

