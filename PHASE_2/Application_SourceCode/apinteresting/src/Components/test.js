create_marker = (key) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + key["City"] + "," + key["Country"] + "&key=AIzaSyCZAhgGJq-k2ixG-fX-wbkUqbVaR8-WkR0";
    const data = fetch(url).then(res => res.json());
    if (data["status"] == "OK") {
      const lat = data["results"][0]["geometry"]["location"]["lat"] + Math.random()/2 -0.25;
      const lng = data["results"][0]["geometry"]["location"]["lng"] + Math.random()/2 -0.25;
      const loc = lat.toString() + "," + lng.toString();
      console.log(loc);
      return <Marker location = {loc}/>
    }
    return <Marker location = "Shanghai, China"/>
  }