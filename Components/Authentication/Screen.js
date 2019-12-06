import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { f, database, auth } from '../../config/config.js';
import * as Facebook from 'expo-facebook';


class Screen extends React.Component {

    constructor(props) {
        super(props);
        //this.registerUser('megerpascal@gmail.com', 'hsvxd007');

        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Is logged in
                console.log('Logged in!', user);
            }
            else {
                //Is logged out
                console.log('Logged out!');
            }
        });
    }

    loginWithFacebook = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '449579609085368',
            { permissions: ['email', 'public_profile'] }
        );

        if (type === 'success') {
            const credentials = f.auth().FacebookAuthProvider.credential(token);
            f.auth.signInWithCredential(credentials).catch((error) => 'Error logging in Facebook', error);
        }
    }


    registerUser = (email, password) => {
        console.log(email, password);
        auth.createUserWithEmailAndPassword(email, password)
            .then((userObj) => console.log(email, password, userObj))
            .catch((error) => ('error loggin in', error));
    }

    /*auth.signOut()
            .then(() => {
                console.log('User logged out');
            })
            .catch(() => {
                console.log('Error', error);
            });*/

    render() {
        return (
            <View style={styles.container} >
                <Text>Authentication Screen</Text>
                <TouchableHighlight style={{ backgroundColor: 'green' }} onPress={() => this.loginWithFacebook()}>
                    <Text style={{ color: 'white' }}>Login With Facebook!</Text>
                </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Screen;