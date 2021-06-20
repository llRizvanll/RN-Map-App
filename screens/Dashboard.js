/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useRef, useState } from "react";
import type {Node} from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";

const {width, height} = Dimensions.get('window');
const deltaValue = 0.2;
const maxZoomLevel = 10;
const zoomLevelUsed = 10;
const altitudeValue = 1000;
const mapPitch = 45;
const mapHeading = 90;
const initLatitude = 37.78825;
const initLongitude = -122.4324;

const Dashboard: () => Node = () => {
  const [isMapReady, setMapReady] = useState(false);
  const _map = useRef(null);

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, [_map, setMapReady]);

  const [region, setRegion] = React.useState({
    latitude: initLatitude,
    longitude: initLongitude,
    latitudeDelta: deltaValue,
    longitudeDelta: deltaValue,
  })

  React.useEffect( () => {
    if(_map.current) {
      _map.current.animateCamera(
        {
          center: {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: deltaValue,
            longitudeDelta: deltaValue,
          },
          zoom: zoomLevelUsed
        },
        5000
      );
    }
  })
  return (
    <View style={styles.container}>
      <View style={{ flex:1,flexDirection:'column'}}>
        <MapView
          ref={_map}
          style={isMapReady ? styles.mapcontainer : {}}
          onMapReady={handleMapReady}
          initialCamera={{
            center: {
              latitude: region.latitude,
              longitude: region.longitude,
              latitudeDelta: deltaValue,
              longitudeDelta: deltaValue,
            },
            pitch: mapPitch,
            heading: mapHeading,
            altitude: altitudeValue,
            zoom: zoomLevelUsed,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          moveOnMarkerPress={true}
          zoomControlEnabled={true}
          zoomTapEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={region}
          zoomEnabled={true}
          toolbarEnabled={true}
          showsTraffic={false}
          onRegionChangeComplete={region => setRegion(region)}
          onMapReady={handleMapReady}
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
          width:'95%',marginTop:20,
          marginLeft:10, borderRadius:10, padding:6,
        ...FONTS.box_shadow}}>
          <TextInput placeholder={"Please enter pickup"}
                     placeholderTextColor={COLORS.blue}
                     numberOfLines={1}
                     style={{textDecorationColor:COLORS.black, marginLeft:10,...FONTS.regularText}} />
        </View>
        <View style={{ position:"absolute",top:65,height:60,backgroundColor:COLORS.white,
          width:'95%',marginTop:20, marginLeft:10, borderRadius:10, padding:6,
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
    width: width,
    height: height-80,
  },
  mapStyle: {
    flex: 1,
    marginLeft: 1
  }
});

export default Dashboard;
