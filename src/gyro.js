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

export const getGyroscope = (gyroscopeData) => {
    window.addEventListener("deviceorientation", gyroscopeData);
};