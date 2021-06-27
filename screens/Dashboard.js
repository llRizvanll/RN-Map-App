import React, { useCallback, useRef, useState } from "react";
import type {Node} from 'react';
import { Dimensions, Image, StyleSheet, PermissionsAndroid, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { COLORS, FONTS } from "../constants/theme";
import icons from "../constants/icons";
import Geolocation from "@react-native-community/geolocation";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesSearch from "./GooglePlacesSearch";


const {width, height} = Dimensions.get('window');
const deltaValue = 0.2;
const zoomLevelUsed = 10;
const altitudeValue = 1000;
const mapPitch = 45;
const mapHeading = 90;
const initLatitude = 37.78825;
const initLongitude = -122.4324;


const GOOGLE_PLACES_API_KEY = 'AIzaSyAFPl0HjVzsH3nm7LdKPIZxVzR7Wmycvys';
const Dashboard: () => Node = () => {
  const [isMapReady, setMapReady] = useState(false);
  const _map = useRef(null);

  //marker ref
  const _marker_map = useRef(null);
  const _dest_marker_map = useRef(null);

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, [_map, setMapReady]);

  const [region, setRegion] = React.useState({
    latitude: initLatitude,
    longitude: initLongitude,
    latitudeDelta: deltaValue,
    longitudeDelta: deltaValue,
  })

  const [dest_region, setDestRegion] = React.useState({
    latitude: initLatitude,
    longitude: initLongitude,
    latitudeDelta: deltaValue,
    longitudeDelta: deltaValue,
  })
  const [mapSourceTargetData, setMapTargetData] = React.useState({
    sourceTarget: false,
    destTarget: false,
    region
  })

  //Location Reader
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Trucks247 Location Permission",
          message:
            "App needs your permission to show location based trucks availability",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        getLocationAsync();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

//Get the current location
  const getLocationAsync = async () => {
    Geolocation.getCurrentPosition(
      (position) => {

        //get the Longitude from the location json
        const curLongitude = position.coords.longitude;
        //get the Latitude from the location json
        const curLatitude =  position.coords.latitude;

        const longitudeDelta = deltaValue
        const latitudeDelta  = deltaValue
        console.log('current location: ',curLatitude,curLongitude);
        setRegion({latitude:curLatitude,longitude:curLongitude, latitudeDelta:latitudeDelta,longitudeDelta:longitudeDelta});


      }, (error) => {
        const { code, message } = error;

        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
      }, {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 5000,showLocationDialog: true   });
  };

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

  const getDataFromGooglePlaces = (mapSourceTargetData) => {
    console.log(mapSourceTargetData);
    mapSourceTargetData.sourceTarget ? setRegion(mapSourceTargetData.region) :
      setDestRegion(mapSourceTargetData.region)
  }

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
          zoomControlEnabled={false}
          zoomTapEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={region}
          zoomEnabled={true}
          toolbarEnabled={true}
          showsTraffic={false}
          >
          <Marker
            ref={_marker_map}
            coordinate={region}
            anchor={{ x: 0.5, y: 0.5 }}
            draggable={true}
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
          <Marker
            ref={_dest_marker_map}
            coordinate={dest_region}
            anchor={{ x: 0.5, y: 0.5 }}
            draggable={true}
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
        <View style={{ position:"absolute",top:0,minHeight:60,backgroundColor:COLORS.white,
          width:'100%',marginTop:2,
        }}>
          <TouchableOpacity style={{marginTop:0, padding:5, backgroundColor:COLORS.white}} onPress={() => {
            requestCameraPermission();
            //getLocation();
            //getLocationAsync();
          }}>
            <Text style={{...FONTS.h3, marginLeft:10, padding:5,color:COLORS.blue, fontWeight:'bold'}}>Turn on location permission ></Text>
          </TouchableOpacity>
          <View style={{height:1,backgroundColor:COLORS.gray}}></View>
          <View style={{ minHeight:60,padding:5,flex:1,backgroundColor: '#ecf0f1',
            textDecorationColor:COLORS.black, marginBottom:5, marginLeft:10,...FONTS.regularText,
            }}>
            {/*<TextInput placeholder={"Enter PICKUP location"}*/}
            {/*           placeholderTextColor={COLORS.black}*/}
            {/*           numberOfLines={1}*/}
            {/*           style={{*/}
            {/*             textDecorationColor:COLORS.black, marginLeft:5,...FONTS.regularText,*/}
            {/*             lineHeight:20,*/}
            {/*             padding:10,*/}
            {/*             fontWeight:'bold'}} />*/}
            <GooglePlacesSearch getDataFromGooglePlaces={getDataFromGooglePlaces} sourceTarget={true}/>

          </View>

          <View style={{height:1,backgroundColor:COLORS.gray}}></View>

        </View>
      </View>

      <View style={{
        position:'absolute',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        bottom:0,
         }}>
        <View style={{ minHeight:60,backgroundColor:COLORS.white,
          width:'95%', marginLeft:10, marginBottom:5, borderRadius:10, padding:6,
          ...FONTS.box_shadow}}>
          {/*<TextInput placeholder={"Where is your Drop?"}*/}
          {/*           placeholderTextColor={COLORS.black}*/}
          {/*           numberOfLines={1}*/}
          {/*           style={{textDecorationColor:COLORS.black, marginLeft:10,...FONTS.regularText}} />*/}
          <GooglePlacesSearch getDataFromGooglePlaces={getDataFromGooglePlaces} sourceTarget={false}/>
        </View>
        <View style={{display:'flex',height:60,flexDirection:'row',
          justifyContent:'space-between',backgroundColor:COLORS.white,
          width:'100%', padding:10,
          ...FONTS.box_shadow}}>
          <TouchableOpacity
            onPress={() => {
              //requestCameraPermission();
              //getLocation();
              //getLocationAsync();
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
