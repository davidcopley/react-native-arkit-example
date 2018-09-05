import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ReactARKit from "./ReactARKit"
import {getGeolocation, getDistance, getBearing, getUserDirection,getXYZ} from "./src/utils/GeoKit"
import { ARKit } from 'react-native-arkit'


export default class App extends React.Component {

    state = {
        distance: null,
        bearing: null,
        degree: null,
        my_lat: null,
        my_lon: null,
        dest_lat: -37.911893,
        dest_lon: 145.132888

    }

    handleGetGeolocation = () => {
        getGeolocation()
            .then(pos => {
                const {dest_lat,dest_lon} = this.state
                const {coords: {latitude, longitude}} = pos
                this.setState({my_lat:latitude,my_lon:longitude})
                const distance = getDistance(latitude, longitude, dest_lat,dest_lon)
                const bearing = getBearing(latitude, longitude,  dest_lat,dest_lon)
                this.setState({distance, bearing})
            })
            .catch(err => {
                console.log(err)
            })
    }

   startGetUserFacingBearing = () => {
        getUserDirection(degree => this.setState({degree}))
    }

    componentDidMount() {
        ARKit.isInitialized().then(res=>{
            console.log(res)
            const interval = setInterval(this.handleGetGeolocation,1000)

            this.startGetUserFacingBearing()
        })

    }

    render() {
        const {distance,bearing} = this.state
        const {x,y,z} = getXYZ(distance,bearing)
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <View
                    style={{
                        flex: 1
                    }}
                >
                    {<ReactARKit x={z} y={y} z={-x} />}
                </View>
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text>Distance:{this.state.distance}</Text>
                    <Text>Bearing:{this.state.bearing}</Text>
                    <Text>Facing Direction:{this.state.degree}</Text>
                    <Text>Difference: {this.state.bearing - this.state.degree}</Text>
                    <Text>My Lat:{this.state.my_lat}</Text>
                    <Text>My Lon:{this.state.my_lon}</Text>
                    <Text>Dest kat:{this.state.dest_lat}</Text>
                    <Text>Dest Lon:{this.state.dest_lon}</Text>
                    <Text>X:{x}</Text>
                    <Text>Y:{y}</Text>
                    <Text>Z:{z}</Text>
                </View>


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
