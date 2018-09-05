import RNSimpleCompass from 'react-native-simple-compass';



const getGeolocation = () => new Promise((resolve,reject)=> {
    console.log("update")
    navigator.geolocation.getCurrentPosition(pos=>resolve(pos),err=>reject(err),{enableHighAccuracy:true})
})

const getDistance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p)/2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a))*1000; // 2 * R; R = 6371 km
}

// Converts from degrees to radians.
const toRadians = (degrees) => {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
const toDegrees = (radians) => {
    return radians * 180 / Math.PI;
}

const getBearing = (startLat, startLng, destLat, destLng) => {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
        Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = toDegrees(Math.atan2(y, x));
    return (brng + 360) % 360;
}

const getUserDirection = (callback) => {
    const degree_update_rate = 3; // Number of degrees changed before the callback is triggered
    RNSimpleCompass.start(degree_update_rate, (degree) => {
        // RNSimpleCompass.stop();
        callback(degree)
        // RNSimpleCompass.stop()
    });
}

const getXYZ = (distance,degree) => {
    const x = distance * Math.cos(toRadians(degree))
    const z = distance * Math.sin(toRadians(degree))
    return {x:-x,y:0,z:z}
}

export {
    getGeolocation,
    getDistance,
    getBearing,
    getUserDirection,
    getXYZ
}