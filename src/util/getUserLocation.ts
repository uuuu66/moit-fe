const getUserLocation = (callback: PositionCallback): void => {
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: Infinity,
  }

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      callback,
      (error) => {
        console.log(error)
      },
      options
    )
  }
}

export default getUserLocation
