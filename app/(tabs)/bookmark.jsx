import { View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import MasterLayout from '../../components/layouts/master'
import React from 'react'

const Bookmark = () => {
  return (
    <>
      {/* <MasterLayout> */}
        <View>
          <MapView 
            style={styles.map} 
            // provider={PROVIDER_GOOGLE}
          />
        </View>
      {/* </MasterLayout> */}
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  }
});

export default Bookmark