AFRAME.registerComponent("create-markers" , {
  init: async function() {
    var mainScene = document.querySelector("#main-scene")
    var toys = await getToys()
    toys.map((toy) => {
      // Adding marker to scene
      var marker = document.createElement("a-marker")
      marker.setAttribute("id", toy.id)
      marker.setAttribute("type", "pattern")
      marker.setAttribute("url", toy.marker_pattern_url)
      marker.setAttribute("cursor", { rayOrigin: "mouse"})
      marker.setAttribute("marker-handler", {})
      mainScene.appendChild(marker)
      // Adding 3D model to scene
      var model = document.createElement("a-entity")
      model.setAttribute("id", `model-${toy.id}`)
      model.setAttribute("position", toy.model_geometry.position)
      model.setAttribute("rotation", toy.model_geometry.rotation)
      model.setAttribute("scale", toy.model_geometry.scale)
      model.setAttribute("gltf-model", `url(${toy.model_url})`)
      model.setAttribute("gesture-handler", {})
      mainScene.appendChild(model)
      // To display the price of the toy
      var pricePlane = document.createElement("a-image")
      pricePlane.setAttribute("id", `price-plane-${toy.id}`)
      pricePlane.setAttribute("src", "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png")
      pricePlane.setAttribute("width", 0.8)
      pricePlane.setAttribute("height", 0.8)
      pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3})
      pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0})
      pricePlane.setAttribute("visible", false)
      // Adding price of the toy
      var price = document.createElement("a-entity")
      price.setAttribute("id", `price-${toy.id}`)
      price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 })
      price.setAttribute("rotation", { x: 0, y: 0, z: 0})
      price.setAttribute("text", {
        font: "mozillavr",
        color: "white",
        width: 3,
        align: "centre",
        value: `ONLY\n $${toy.price}`
      })
      pricePlane.appendChild(price)
      marker.appendChild(pricePlane)
    })
  },
  getToys: async function() {
    return await firebase.firestore().collection("Toys").get().then((snapshot) => {
      return snapshot.docs.map((document) => {
        document.data()
      })
    })
  }
})