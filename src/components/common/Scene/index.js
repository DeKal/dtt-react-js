import React from 'react'
import * as THREE from 'three'

const inner_sphere = true;
const outher_sphere = true;
let color = 0x0094e2;
let size = document.body.offsetWidth;

if (size > 1200) {
  size = 600;
} else if (size < 800) {
  size = 0;
}

class Scene extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {

    this.renderer = new THREE.WebGLRenderer({
                canvas: this.mount,
                alpha: true,
                antialias: true
            });

    this.renderer.setSize(size, size);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, size / size, 0.1, 10000);
    this.camera.position.z = 500;
    this.scene.add(this.camera);

    const inner_geometry = new THREE.IcosahedronGeometry(135, 2);
    const inner_settings = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        wireframe: true
    });
    this.sphere = new THREE.Mesh( inner_geometry, inner_settings );
    if (inner_sphere) {
        this.scene.add( this.sphere );
    }

    const outer_geometry = new THREE.IcosahedronGeometry(200, 1);
    const outer_settings = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.1,
        wireframe: true
    });
    this.sphere_2 = new THREE.Mesh( outer_geometry, outer_settings );
    if (outher_sphere) {
        this.scene.add( this.sphere_2 );
    }

    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {
    //Inner sphere rotation
    this.sphere.rotation.x += 0.002;
    this.sphere.rotation.y -= 0.003;
    this.sphere.rotation.z += 0.0005;

     //Outer sphere rotation
    this.sphere_2.rotation.x += 0.001;
    this.sphere_2.rotation.y += 0.001;
    this.sphere_2.rotation.z -= 0.001;
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div className="cws_sphere_wrapper">
        <div className="cws-sphere top_right" style={{
          margin: "0px 0px 0px 0px",
          backgroundPosition: "0 -50%",
          backgroundSize: "100% 300%",
          position: "absolute",
          zIndex: -1,
          left: "0",
          top: "40%"
        }}>
          <canvas width="1000" height="1000" style={{width: "1000px", height: "1000px"}}
                  ref={(mount) => { this.mount = mount }}>
          </canvas>
        </div>
      </div>
    )
  }
}

export default Scene;
