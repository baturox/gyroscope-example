let gyroscopeData = {
    x: null,
    y: null,
    z: null
};
const getGyroscopeDataFromEvent = event => {
    gyroscopeData = {
        x: event.alpha,
        y: event.beta,
        z: event.gamma
    };
};

export const sendPermission = () => {
    if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission();
    } else {
        navigator.permissions.query({
            name: "gyroscope"
        });
    }
};

export const getGyroscope = () => {
    window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
    return gyroscopeData;
};