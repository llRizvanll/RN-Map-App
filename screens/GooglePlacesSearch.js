import React, { useRef } from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import icons from "../constants/icons";
import { COLORS } from "../constants/theme";

const deltaValue = 0.002;
const GOOGLE_PLACES_API_KEY = 'AIzaSyAFPl0HjVzsH3nm7LdKPIZxVzR7Wmycvys';
const GooglePlacesInput = ({sourceTarget,getDataFromGooglePlaces}) => {

const refAutoComplete = useRef();

  return (
    <View style={styles.autocomplete_container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        ref = {refAutoComplete}
        returnKeyType={'default'}

        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details ) => {
            console.log(details,sourceTarget);

            getDataFromGooglePlaces(
                {
                  sourceTarget: sourceTarget,
                  region: {
                            latitude:details.geometry.location.lat,
                            longitude:details.geometry.location.lng,
                            latitudeDelta:deltaValue,
                            longitudeDelta:deltaValue
                  }
                }
            );
          }
        }
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }}
        styles = { {
          container : {
            width : '100%' ,
          } ,
          textInputContainer : {
            flex : 1 ,
            backgroundColor : 'transparent' ,
            color:'#000',
            height : 54 ,
            marginHorizontal : 0,
            borderTopWidth : 0 ,
            borderBottomWidth : 0 ,
          } ,
          textInput : {
            height : 54 ,
            margin : 0 ,
            borderRadius : 0 ,
            paddingTop : 0 ,
            paddingBottom : 0 ,
            paddingLeft : 20 ,
            paddingRight : 20 ,
            marginTop : 0 ,
            marginLeft : 0 ,
            marginRight : 0 ,
            elevation : 5 ,
            shadowColor : COLORS.black ,
            shadowOpacity : 0.1 ,
            shadowOffset : {  x : 0 ,  y : 0  } ,
            shadowRadius : 15 ,
            borderWidth : 1 ,
            borderColor : '#DDD' ,
            fontSize : 18 ,
            color:COLORS.black
          } ,
          listView : {
            borderWidth : 1 ,
            borderColor : '#DDD' ,
            backgroundColor : '#FFF' ,
            marginHorizontal : 0 ,
            elevation : 5 ,
            shadowColor : '#000' ,
            shadowOpacity : 0.1 ,
            shadowOffset : {  x : 0 ,  y : 0  } ,
            shadowRadius : 15 ,
            marginTop : 2 ,
          } ,
          description : {
            fontSize : 16 ,
          } ,
          row : {
            padding : 10 ,
            height : 50 ,
          } ,
          predefinedPlacesDescription: {
            color: '#1faadb',
          }
        } }
        fetchDetails={true}
        nearbyPlacesAPI='GooglePlacesSearch'
        GooglePlacesDetailsQuery={{
          fields: 'formatted_address,geometry',
        }}
        textInputProps={{ clearButtonMode: 'never',
          ref : input => {
            refAutoComplete.textInput = input;
          }
        }}
        renderRightButton={()  =>
          <TouchableOpacity
            style={{alignSelf:'center', padding:5}}
            onPress={() => {
                refAutoComplete.textInput.clear();
                refAutoComplete.textInput.focus();
            }
          }>
            <Image source={icons.clear_icon} style={{height:28,width:28}} />
          </TouchableOpacity>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  autocomplete_container: {
    flex: 1,

    width:'100%'
  },
});

export default GooglePlacesInput;
