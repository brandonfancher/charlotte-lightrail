# clt-lightrail

## Information on 2.0

* We hope to implement redux
* We hope to replace `react-native-router-flux` with `ex-navigation`
* We'll need a good refactor
* We'll then adapt for Android
* We'll need to add CodePush and Firebase (or other analytics) to the app prior to launch.
* No more CocoaPods
* Replaced StandardJS with ESLint; some components still require syntax updates

## Getting Started

### First-time React Native Setup

If this is your first time running a React Native project on this machine, following the "Getting Started" instructions in the React Native docs [here](https://facebook.github.io/react-native/docs/getting-started.html#requirements). No need to do the `react-native init AwesomeProject` part since this project has already been initialized.

### Project Setup

* `git clone https://github.com/alfonso-cabrera/clt-lightrail.git`
* `cd clt-lightrail`
* `git fetch`
* `git checkout development`
* `npm install`
* `rnpm link` - check that everything is linked up!

If you get a red screen when the Simulator starts up, wait a moment and then refresh. And make sure your debug server is running (see above).

## To Change App Icon

* Upload image (1024x1024) to http://makeappicon.com/
* Zip package will contain iOS `AppIcon.appiconset` directory.
* In Xcode, open lightrail > lightrail > Images.xcassets in the navigation on the left. You should see the current iconset on the right.
* Right click on that icon set to delete.
* Drag the `AppIcon.appiconset` directory to the area you just deleted from and it will add the new icon set.
* Run the app!


## To Change the Splash Screen

1. Upload png image (2208x2208) to http://ticons.fokkezb.nl/
1. In settings, select "Splashes" and iPhone as platform. Untick "Alloy."
1. generated
1. Zip package will contain images.
1. In Xcode, open lightrail > lightrail > Images.xcassets in the navigation on the left. You should see the current iconset on the right.
1. Right click under that iconset and tell it to create a new splash screen icon set.
1. Drag the images to the area you just created and it will add the images to the proper slots in the new icon set.
1. Go to your app's settings in Xcode > General > App Icons and Launch Images.
1. Blank out "Launch Screen File"
1. Click to add the asset you created above to "Launch Images Source". It may create a new one but then it will let you change it to the one you created.
1. Optionally, delete the one it created for you.
1. Delete the app on your device. (This one tripped me up.)
1. Run the app!

We'll need to play with this a bit. In dev, it still has a white screen after the splash, but that might go away in production mode. We can see about getting rid of the splash screen entirely too.

## Currently Using

* https://github.com/aksonov/react-native-router-flux

# clt-lightrail

* https://github.com/mapbox/react-native-mapbox-gl
* https://github.com/skv-headless/react-native-scrollable-tab-view
* https://github.com/Microsoft/react-native-code-push

## Credentials

### Mapbox
* **URL:** http://www.mapbox.com
* **Username:** [REDACTED]
* **Password:** [REDACTED]
* **Styles builder:** https://www.mapbox.com/studio/
