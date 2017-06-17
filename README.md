[![Build Status](https://travis-ci.org/mdwagner/charlotte-lightrail.svg?branch=styled-comp)](https://travis-ci.org/mdwagner/charlotte-lightrail)
# Charlotte Light Rail

## Branches
* `v1.0`: Currently in production on iOS.
* `master`: The source of current dev truth.
* `development`: When you fork this project, you should branch off of this branch and work your magic. (Then send us a PR, please.)
* `android`: Working React Native project on Android! Running, but still some work to do. You may want to work off this one as well.

## Contributions
We're excited to open source this project. This is by the community, for the community. We're looking for contributors. If you're interested and/or have any questions, please reach out to us at teamlunaclt@gmail.com or tweet us [@teamlunaco](https://twitter.com/teamlunaco).

If you find any dead code or anything that can be improved, please submit a PR. (There's definitely some dead code and a big need for refactoring.) New features? Submit a PR. And if you want to help with Android, that'd be great. In fact, here's a list. Pick one. Dive in!

## What's Next?
* Update React Native and all dependencies where possible
* The code base needs some serious refactoring
* Implement redux
* We hope to replace `react-native-router-flux` with `ex-navigation`
* We'll then adapt for Android
* We'll need to add CodePush and Firebase (or other analytics) to the app prior to launch (these already exist in v1.0, but were removed from the other branches for the sake of simplicity and re-evaluation)
* Replaced StandardJS with ESLint; some components still require syntax updates

## Getting Started

### First-time React Native Setup

If this is your first time running a React Native project on this machine, following the "Getting Started" instructions in the React Native docs [here](https://facebook.github.io/react-native/docs/getting-started.html#requirements). No need to do the `react-native init AwesomeProject` part since this project has already been initialized.

### Keys/Secrets

You will need to get your own Mapbox API Key. Globally find `[MAPBOX_API_KEY]` and replace with your key.

### Project Setup

* `git clone https://github.com/brandonfancher/charlotte-lightrail`
* `cd charlotte-lightrail`
* `git fetch`
* `git checkout development`
* `npm install`
* `rnpm link` - check that everything is linked up!

If you get a red screen when the Simulator starts up, wait a moment and then refresh. And make sure your debug server is running (see above).

## Currently Using

* https://github.com/aksonov/react-native-router-flux
* https://github.com/mapbox/react-native-mapbox-gl
* https://github.com/skv-headless/react-native-scrollable-tab-view
