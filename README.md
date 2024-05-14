 # Weather App

## Description

A weather application built with React Native and Expo that uses the OpenWeather API. This app allows users to either use their current location or type a location manually to get weather details. Due to the limitations of the free API version, the location name should be precise. Users can click on the searched location to view basic weather details and navigate to more specific details.

## Features
- Search for weather details by location name or use current location
- View basic and detailed weather information
- Setting temperature units
- Manage and view a list of saved locations
- Test coverage for components
- Linting and code formatting with ESLint and Prettier

## Running Commands

### Clone the Project
To clone the project from GitHub, run the following command:
```bash
git clone git@github.com:NataD/WeatherApp.git
cd WeatherApp
```

### Prerequisites
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js) or [yarn](https://yarnpkg.com/) package manager
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (you can install it globally using `npm install -g expo-cli`)


### Install dependencies

### Using Yarn

If you are using Yarn, install the dependencies  with the following command:

`yarn install`

### Using npm

Alternatively, if you prefer to use npm, you can install the dependencies using:

`npm install`

### Running the project
To run the project, use the following command:

`expo start`

This will start the Expo development server. You can then open the app in a simulator or scan the QR code on your device using the Expo Go app.

Technology Stack
- **React Native**: For building the mobile application.
- **Expo**: To streamline the development workflow.
- **TypeScript**: For static type checking and better development experience.
- **StyleSheet**: For styling the components.
- **Jest**: For running unit tests.
- **Redux**: For state management.
- **ESLint**: For linting and code quality.
- **Prettier**: For code formatting.

## Note on OpenWeather API Access

Accessing the OpenWeather API requires an API key. You will need to obtain an OpenWeather API key.

For instructions on how to obtain an API, please visit the [OpenWeather API documentation](https://openweathermap.org/api).

Once you have your API key, you should create `.env` file in the root of your project directory with the following content:

`EXPO_PUBLIC_OPEN_WEATHER_API_KEY=YOUR_OPEN_WEATHER_API_KEY`

Ensure you securely store your API key and do not expose it in public repositories or client-side code.

## Running test
To run the tests, use of the following commands:

`npm test` or `yarn test`

In order to get the test coverage report, use one of the following commands:

`npm jest --coverage` or `yarn jest --coverage`

## Linting and Formatting
To run ESLint checks, use the following commands:

`npm lint` or `yarn lint`

To run Prettier checks, use the following commands:

`npm prettier` or `yarn prettier`

To automatically fix code formatting issues with Prettier, use the following command:

`npm prettier-fix` or `yarn prettier-fix`


## Future Improvements

While the application serves its primary function well, there's always room for enhancement. Some potential areas for future development include:

1. **Internationalization (i18n)**: Localizing the application to support multiple languages can make it accessible to a wider audience.
2. **Accessibility (a11y)**: Improving accessibility features to ensure the app is usable by people with a wide range of abilities.
3. **Feature Enhancement**: Adding more units to the controls/settings.
4. **Enhanced Security for API Key Management**: Currently, the OpenWeather API key is stored in a `.env` file. This approach ensures that the key is not hard-coded into the source code, providing a basic level of security by separating configuration from code. However, this method still involves storing the key in plain text, which can be exposed if the environment files are not properly secured or accidentally included in source control.
5. **Builds configuration**: Setting configuration and building developmetn and production builds.
6. **Further UI and user flow improvements**: Improved flow of remembering the selected location, ability to swipe between the screens of the weather details of the saved locations.