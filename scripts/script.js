/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const Patches = require('Patches');



// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console

const NativeUI = require('NativeUI');
// const Scene = require('Scene');
const Textures = require('Textures');


const sceneRoot = Scene.root;

// Locate the plane in the Scene
const plane = sceneRoot.find('plane0');

//==============================================================================
// Setup the configuration for the picker
//==============================================================================

Promise.all([
  Textures.findFirst('pinkCake'),
  Textures.findFirst('candyCake'),
  Textures.findFirst('fruitCake'),
  // sceneRoot.findFirst('planeTracker0'),
  // sceneRoot.findFirst('CakeInteraction')
]).then(onReady);

function onReady(assets) {


  Diagnostics.log('On Ready called.');

  const texture1 = assets[0];
  const texture2 = assets[1];
  const texture3 = assets[2];

  const planeTracker = assets[3];
  const placer = assets[4];


  // Diagnostics.log(texture4);

  // Store a reference to the picker
  const picker = NativeUI.picker;

  // Set a starting index (optional, will be 0 by default)
  const index = 0;
  const selection = 0;

  // Create a configuration object
  const configuration = {

    // The index of the selected item in the picker
    selectedIndex: index,

    // The image textures to use as the items in the picker
    items: [
      { image_texture: texture1 },
      { image_texture: texture2 },
      { image_texture: texture3 }
    ]

  };

  //==============================================================================
  // Apply the configuration and show the picker
  //==============================================================================

  // Configure the picker using the configuration object
  picker.configure(configuration);

  // Set the picker to be visible (visible is false by default)
  picker.visible = true;

  picker.selectedIndex.monitor().subscribe(function (index) {
    Patches.inputs.setScalar('selection', index.newValue);
  });


}

//==============================================================================
// Use the picker to set the texture of the plane
//==============================================================================

// Subscribe to the selectedIndex scalar signal
// picker.selectedIndex.monitor().subscribe(function(index) {
//   // Update the texture of the material assigned to the plane to be the selected
//   // texture
//   plane.material.diffuse = configuration.items[index.newValue].image_texture;
// });


