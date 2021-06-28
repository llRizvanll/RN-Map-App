import React , { Component } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import icons from "../../constants/icons";
import { FONTS } from "../../constants/theme";
import { SafeAreaView } from 'react-navigation';


class Splashscreen extends React.Component{

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    setTimeout(()=> {
      this.props.navigation.navigate('Dashboard');
    }, 5000)
  }

  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={icons.launcher_image} style={styles.image}>
          <Image source={icons.launcher_icon} style={{justifyContent:'center',
            alignItems:"center", alignContent:"center",alignSelf:"center"}}></Image>
          <Text style={styles.text}>TRUCKS 24/7</Text>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#e63946'
  },
  image: {
    flex: 10,
    resizeMode: "cover",
    height:'68%',
    justifyContent: "flex-end"
  },
  text: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#1d3557",
    ...FONTS.body1
  }
});
export default Splashscreen;
