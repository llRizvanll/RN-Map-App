/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";

const {width, height} = Dimensions.get('window');

const Dashboard: () => Node = () => {

  const [region, setRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  React.useEffect( () => {
    setRegion({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  })
  return (
    <View style={styles.container}>
      <View style={{ flex:1,flexDirection:'column'}}>
        <MapView
          style={styles.mapcontainer}
          showsUserLocation={true}
          showsMyLocationButton={false}
          zoomEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChange={setRegion}
          zoomControlEnabled={true}
          zoomTapEnabled={true}
        >
          <Marker
            coordinate={region}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            rotation={0}
          >
            <Image
              source={icons.car_icon}
              style={{
                width: 40,
                height: 40
              }}
            />
          </Marker>
        </MapView>
        <View style={{ position:"absolute",top:0,height:60,backgroundColor:COLORS.white,
          width:'95%',marginTop:20, marginLeft:10, borderRadius:10, padding:6,zIndex:20,
        ...FONTS.box_shadow}}>
          <TextInput placeholder={"Please enter pickup"}
                     placeholderTextColor={COLORS.blue}
                     numberOfLines={1}
                     style={{textDecorationColor:COLORS.black, marginLeft:10,...FONTS.regularText}} />
        </View>
        <View style={{ position:"absolute",top:65,height:60,backgroundColor:COLORS.white,
          width:'95%',marginTop:20, marginLeft:10, borderRadius:10, padding:6,zIndex:20,
          ...FONTS.box_shadow}}>
          <TextInput placeholder={"Please enter drop off"}
                     placeholderTextColor={COLORS.blue}
                     numberOfLines={1}
                     style={{textDecorationColor:COLORS.black, marginLeft:10,...FONTS.regularText}} />
        </View>


      </View>

      <View style={{  ...FONTS.home_menu_box_shadow,height:60,
        display:'flex',position:'absolute',
        padding:10,width:'100%',
        bottom:0, backgroundColor: COLORS.white,
        flexDirection:'row', justifyContent:'space-between' }}>

        <TouchableOpacity
          onPress={() => {
          }}
        >
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <Image source={icons.home_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
            <Text style={{color:COLORS.blue, ...FONTS.home_btm_text}}> Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {

          }}
        >
          <View style={{flexDirection:'column', alignItems:'center'}}>
            <Image source={icons.order_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
            <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Orders</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection:'column', alignItems:'center'}}>
          <Image source={icons.wallet_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
          <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Payment</Text>
        </View>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Image source={icons.account_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
          <Text style={{color:COLORS.black, ...FONTS.home_btm_text}}> Account</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default Dashboard;
