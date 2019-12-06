import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput } from 'react-native';
import { f, database, auth } from '../../config/config.js';
import * as Facebook from 'expo-facebook';


class Screen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        }

        var that = this;

        f.auth().onAuthStateChanged(function (user) {
            if (user) {
                //Is logged in
                that.setState({
                    loggedIn: true
                });
                console.log('Logged in!', user);
            }
            else {
                //Is logged out
                that.setState({
                    loggedIn: false
                })
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
            const credentials = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(credentials).catch((error) => ('Error logging in Facebook', error));
        }
    }


    registerUser = (email, password) => {
        console.log(email, password);
        auth.createUserWithEmailAndPassword(email, password)
            .then((userObj) => console.log(email, password, userObj))
            .catch((error) => ('error loggin in', error));
    }

    loginUser = async (email, password) => {
        if (email != '' && password != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email, password);
                console.log(user);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert('Missing email or password');
        }
    }

    signUserOut = () => {
        auth.signOut()
            .then(() => {
                console.log('User logged out');
            })
            .catch(() => {
                console.log('Error', error);
            });
    }

    render() {
        return (
            <View style={styles.container} >
                <Text>Authentication Screen</Text>
                {this.state.loggedIn == true ? (
                    <View>
                        <TouchableHighlight style={{ backgroundColor: 'red' }} onPress={() => this.signUserOut()}>
                            <Text style={{ color: 'white' }}>Logout!</Text>
                        </TouchableHighlight>
                        <Text>Logged in!</Text>
                    </View>
                ) : (
                        <View>

                            {this.state.emailLoginView == true ? (
                                <View>
                                    <Text>Email:</Text>
                                    <TextInput onChangeText={(text) => this.setState({ email: text })} value={this.state.email}></TextInput>
                                    <Text>Password:</Text>
                                    <TextInput onChangeText={(text) => this.setState({ password: text })} value={this.state.password} secureTextEntry={true}></TextInput>
                                    <TouchableHighlight style={{ backgroundColor: 'red' }} onPress={() => this.loginUser(this.state.email, this.state.password)} >
                                        <Text style={{ color: 'white' }}>Login!</Text>
                                    </TouchableHighlight>
                                </View>
                            ) : (
                                    <View></View>
                                )}

                            <TouchableHighlight style={{ backgroundColor: 'blue' }} onPress={() => this.setState({ emailLoginView: true })}>
                                <Text style={{ color: 'white' }}>Login Email and Password!</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{ backgroundColor: 'green' }} onPress={() => this.loginWithFacebook()}>
                                <Text style={{ color: 'white' }}>Login With Facebook!</Text>
                            </TouchableHighlight>
                        </View>
                    )}
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