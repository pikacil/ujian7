import React, { useState, useEffect } from 'react'

import { Layout, Text, Input, IndexPath, Select, SelectItem, Card, Avatar, Button, Datepicker, Icon } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import { Alert, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const CalendarIcon = (props) => (
    <Icon {...props} name='calendar' />
);
const lstkategori = ["Bencana", "Sakit", "Anak Sakit"]
let camera = null;
const Ijin = ({ navigation, route }) => {
    const [dateawal, setDateawal] = React.useState(new Date());
    const [dateakhir, setDateakhir] = React.useState(new Date());
    const { datanama, dataUmur } = route.params;
    const [usernama, setDatanama] = useState(datanama)
    const [kategori, setkategori] = useState(0)
    const [perihal, setPerihal] = useState("")
    const [keterangan, setketerangan] = useState("")
    const [gambar, setGambar] = useState('https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/p844030/ChelseaIslan.jpg')
    // const [namaGambar,setNamaGambar] = useState()

    const renderOption = (title) => (

        <SelectItem key={title} title={title} />
    );




    const saveImage = () => {

        const namefile = "" + new Date();

        const reference = storage().ref(namefile);

        const pathToFile = gambar;
        // uploads file
        reference.putFile(pathToFile).then(() => {
            console.log("Uploaded")
            storage()
                .ref(namefile)
                .getDownloadURL().then((downloadData) => {
                    console.log(downloadData)
                    console.log(namefile)
                    saveData(downloadData, namefile)

                })
        });

    }

    const saveData = (downloadData, namaGambar) => {
        firestore()
            .collection('Ijin')
            .add({
                email: usernama,
                kategori: lstkategori[kategori.row],
                dateawal: dateawal,
                dateakhir: dateakhir,
                perihal: perihal,
                keterangan: keterangan,
                gambar: downloadData,
                namaGambar: namaGambar,
            })
            .then(() => {
                console.log('ijin added!');
                Alert.alert("Data Telah tersimpan")
                navigation.navigate('Menu')
            });

    }

    const takePicture = async () => {
        console.log("test")
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log(JSON.stringify(data));
            setGambar(data.uri)
            console.log(data.uri);
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Layout style={styles.container}>

                    <Text>Kategori</Text>
                    <Select style={styles.layout}
                        selectedIndex={new IndexPath(kategori)}
                        placeholder='Default'
                        value={lstkategori[kategori.row]}
                        onSelect={index => setkategori(index)}>
                        {lstkategori.map(renderOption)}
                    </Select>
                    <Text>Dari tanggal</Text>
                    <Datepicker


                        placeholder='Pick Date'
                        date={dateawal}
                        onSelect={date1 => setDateawal(date1)}
                        accessoryRight={CalendarIcon}
                    /><Text>Sampai  tanggal</Text>
                    <Datepicker


                        placeholder='Pick Date'
                        date={dateakhir}
                        onSelect={date2 => setDateakhir(date2)}
                        accessoryRight={CalendarIcon}
                    />
                    <Text>Perihal</Text>
                    <Input style={styles.layout}
                        placeholder='Perihal'
                        value={perihal}
                        onChangeText={txtperiahl => setPerihal(txtperiahl)} />

                    <Text>Keterangan</Text>
                    <Input style={styles.layout}
                        placeholder='keterangan'
                        value={keterangan}
                        onChangeText={txtket => setketerangan(txtket)} />

                    <Text>Laporan</Text>
                    <RNCamera
                        ref={ref => {
                            camera = ref;
                        }}
                        style={{ flexDirection: 'row', justifyContent: 'center', height: 100, width: 100 }}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}

                    />

                    <Card style={styles.containerPicture}>
                        <Avatar style={styles.avatar} size='giant' source={{ uri: gambar }} />


                        <Button onPress={() => takePicture()}>
                            Ambil Foto
            </Button>

                    </Card>

                    <Card style={styles.containerPicture}>
                        <Button onPress={() => { saveImage() }}>
                            Submit
            </Button>
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
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },

});

export default Ijin

