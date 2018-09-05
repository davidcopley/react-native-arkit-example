import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { ARKit } from 'react-native-arkit';
export default class ReactNativeARKit extends Component {
    componentDidMount(){


    }
    render() {
        const {x,y,z} = this.props
        console.log(x,y,z)
        return (
            <View style={{ flex: 1 }}>
                <ARKit
                    style={{ flex: 1 }}
                    debug
                    planeDetection={ARKit.ARPlaneDetection.HorizontalVertical}
                    worldAlignment={ARKit.ARWorldAlignment.GravityAndHeading}
                    lightEstimationEnabled
                    onAnchorUpdated={anchor => console.log('anchor updated',anchor)}
                    onAnchorDetected={anchor => console.log('anchor detected',anchor)}
                    onPlaneDetected={plane=>console.log('on plane detected',plane)}
                    // onPlaneUpdated={plane=>callback||null}
                    onARKitError={console.log} // if arkit could not be initialized (e.g. missing permissions), you will get notified here
                >
                    <ARKit.Box
                        position={{x:x,y:y,z:z}}
                        shape={{ width: 100, height: 300, length: 100, chamfer: 0.01 }}
                    />
                </ARKit>
            </View>
        );
    }
}