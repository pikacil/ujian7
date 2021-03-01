import React, { useState, useEffect } from 'react'

import {Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button } from '@ui-kitten/components';

import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Register = ({navigation}) => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [repassword, setrepassword] = useState("")
  const [address, setaddress] = useState("")

  const Daftar = () => {
    console.log('Test Register')
    auth()
   .createUserWithEmailAndPassword(email,password)
   .then((response) => {
     console.log('User account created & signed in!');
     console.log("RESPONSE"+response)
     
       firestore()
       .collection('Users')
       .doc(email)
       .set({
      name: name,
      address: address,
      email: email,
      gender: '',
      umur :'',
      marital : '',
      gps: '',
      gambar: '',
      namaGambar: '',
    })
         
         .then(() => {
           navigation.navigate("Login")
           console.log('User added!');
         }).catch((error) => {
         Alert.alert("Maaf Gagal Simpan",JSON.stringify(error))
         
         });
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
        <Input style={styles.layout}
                placeholder='nama'
                    autoCapitalize="none"
                onChangeText={txtnama => setname(txtnama)} />
        <Layout style={styles.container}>
            <Input style={styles.layout}
                placeholder='E-mail'
                autoCapitalize="none"
                onChangeText={txtemail => setemail(txtemail)} />

           
            <Input style={styles.layout}
                placeholder='password'
                    secureTextEntry
                    autoCapitalize="none"
                onChangeText={txtpassword => setpassword(txtpassword)} />
           <Input style={styles.layout}
                placeholder='Repassword'
                    secureTextEntry
                    autoCapitalize="none"
                onChangeText={txtrepassword => setrepassword(txtrepassword)} />
                 <Input style={styles.layout}
                placeholder='alamat'
                    autoCapitalize="none"
                onChangeText={txtalamat => setaddress(txtalamat)} />

                <Button onPress={() => { Daftar() }}>
                    Login
            </Button>
            <Card style={styles.footerView}>
            <Text style={styles.footerText}>Already got an account? <Text onPress={() => navigation.navigate('Login')} style={styles.footerLink}>Login</Text></Text>
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

export default Register

