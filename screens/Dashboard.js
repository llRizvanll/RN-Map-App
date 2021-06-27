import React, { useCallback, useRef, useState, Fragment } from "react";
import type {Node} from 'react';
import { Dimensions, Image, StyleSheet, PermissionsAndroid, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { COLORS, FONTS } from "../constants/theme";
import Geocoder from 'react-native-geocoding';
import icons from "../constants/icons";
import Geolocation from "@react-native-community/geolocation";
import GooglePlacesSearch from "./GooglePlacesSearch";
import Directions from "./Directions/Directions";
import markerImage from '../assets/icons/marker.png';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './Directions/styles';

import { getPixelSize } from "./utils";

const {width, height} = Dimensions.get('window');
const deltaValue = 0.2;
const zoomLevelUsed = 10;
const altitudeValue = 1000;
const mapPitch = 45;
const mapHeading = 90;
const initLatitude =  12.9981398;
const initLongitude = 77.67208889999999;


const GOOGLE_PLACES_API_KEY = 'AIzaSyAFPl0HjVzsH3nm7LdKPIZxVzR7Wmycvys';
Geocoder.init(GOOGLE_PLACES_API_KEY);
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

  const [mapDuration, setMapDuration] = useState();
  let main_text = null;
  const [dest_region, setDestRegion] = React.useState({
    main_text,
    sourceTarget: true,
    region
  })
  const [mapSourceTargetData, setMapTargetData] = React.useState({
    main_text,
    sourceTarget: true,
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
    mapSourceTargetData.sourceTarget ? setMapTargetData(mapSourceTargetData) :
      setDestRegion(mapSourceTargetData)
  }

  return (
    <View style={styles.container}>
      <View style={{ flex:1,flexDirection:'column'}}>
        <MapView
          ref={_map}
          style={styles.mapcontainer}
          showsUserLocation={true}
          showsMyLocationButton={true}
          moveOnMarkerPress={true}
          zoomControlEnabled={false}
          zoomTapEnabled={true}
          provider={PROVIDER_GOOGLE}
          region={region}
          zoomEnabled={true}
          toolbarEnabled={true}
          showsTraffic={false}>
          <Fragment>
            <Directions
              origin={mapSourceTargetData.region}
              destination={dest_region.region}
              onReady={result => {
                console.log(result);
                setMapDuration(Math.floor(result.duration))
              }}
            />
              <Marker
                coordinate={dest_region.region}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{dest_region.main_text}</LocationText>
                </LocationBox>
              </Marker>

              <Marker coordinate={mapSourceTargetData.region} anchor={{ x: 0, y: 0 }}>
                <Image source={icons.car_icon} style={{ height:20,width:20}}/>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{mapDuration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{mapSourceTargetData.main_text}</LocationText>
                </LocationBox>
              </Marker>
          </Fragment>
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
          <View style={{height:0.5,backgroundColor:COLORS.gray}}></View>
          <View style={{ minHeight:40,flex:1, margin:5,...FONTS.regularText}}>
            <GooglePlacesSearch getDataFromGooglePlaces={getDataFromGooglePlaces} sourceTarget={true} placeholderText={'Enter PICKUP location'}/>
          </View>
          <View style={{height:0.5,backgroundColor:COLORS.gray}}></View>
        </View>
      </View>
      <View style={{
        position:'absolute',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        bottom:0,
         }}>
        <View style={{ minHeight:40,backgroundColor:COLORS.white,
          width:'100%', margin:1,padding:6,
          ...FONTS.box_shadow}}>
          <GooglePlacesSearch getDataFromGooglePlaces={getDataFromGooglePlaces} sourceTarget={false} placeholderText={'Enter Drop location'}/>
        </View>
        <View style={{display:'flex',height:60,flexDirection:'row',
          justifyContent:'space-between',backgroundColor:COLORS.white,
          width:'100%', padding:10,
          ...FONTS.box_shadow}}>
          <TouchableOpacity
            onPress={() => {}}>
            <View style={{flexDirection:'column', alignItems:'center'}}>
              <Image source={icons.home_btm_menu} resizeMode = "contain" style={{height:24,width:24}} />
              <Text style={{color:COLORS.blue, ...FONTS.home_btm_text}}> Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}>
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
    flex:1,
    width: width,
    height: height-80,
  },
  mapStyle: {
    flex: 1,
    marginLeft: 1
  }
});

export default Dashboard;
