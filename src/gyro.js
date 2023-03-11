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

export const sendPermission = async () => {
    if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
        const response = await DeviceMotionEvent.requestPermission();
        if (response == "granted") {
            return true;
        }
        return false;
    } else {
        const response = await navigator.permissions.query({
            name: "gyroscope"
        });
        if (response.state === "granted") {
            return true;
        }
        return false;
    }
};

export const getGyroscope = () => {
    window.addEventListener("deviceorientation", getGyroscopeDataFromEvent);
    return gyroscopeData;
};