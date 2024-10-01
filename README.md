# React Tizen

This project is based on [Create React App](https://github.com/facebook/create-react-app) 

There are several steps to make this project work on a Tizen emulator or TV.

## Configuring Tizen Studio and your device

- Install [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download)
- In Tizen Studio, use the Package Manager (Tools › Package Manager or <kbd>Alt + Shift + P</kbd>) to install all tizen related software, also install the emulator and the TV certificate.
- Close the Package Manager and launch Tizen Studio (it might request you to set your workspace folder, you can choose any folder you want)
- Start your emulator manager and start a TV emulator
- Generate a new Samsung certificate using the Certificate Manager (Tools › Certificate Manager or <kbd>Alt + Shift + C</kbd>).
  - Select "Samsung" certificate
  - Select "TV" device type
  - Select "Create a new certificate profile" and name it (we will need this name later)
  - Select "Create a new author certificate"
  - Input a name and a password
  - It will ask you to connect or create a Samsung Account.
  - If you want, select a backup path for the certificate and click next
  - Select "Create a new distributor certificate"
  - Make sure that your emulator is running and a field should be automatically filled with a DUID which is connected to the emulator.
  - Click finish and close the Certificate Manager

## Building and installing this project

- Make sure that the `tizen` or `tizen.bat` CLI is available in your shell path. It is configurable by commands found [here](https://developer.tizen.org/ko/development/tizen-studio/web-tools/cli?langredirect=1)
- Create a `config.xml` in the `tizen` folder. This can be done by creating a new Tizen project in Tizen Studio.
  - Create a new Tizen Project
  - Select "Template"
  - Select "TV"
  - Select "Web Application"
  - Select "Empty" or "Basic" project
  - Choose a name and click finish
  - Once the project is generated, copy the `config.xml` file to the `tizen` folder of this project
- Before building the project for the first time, edit the `build` and `deploy` scripts in the `package.json` file:
  - Replace `tizen.bat` with `tizen` if necessary (if you are running a unix system)
  - In the `tizen package -t wgt -s default -- build/.buildResult` command, replace `default` with the name you gave to your certificate
  - In the `tizen install -n ReactTizen.wgt -- build/.buildResult` command, replace `ReactTizen.wgt` with the name you gave to your application like so `name.wgt` in the `config.xml`
- Run the following command to build the project:
  ```bash
  yarn build
  ```
  This will perform the following actions:
  - Build the React project in the `build` folder
  - Copy the Tizen `config.xml` file from the `tizen` folder to the `build` folder
  - Build the `build` folder as a Tizen web app in the `build/.buildResult` folder
  - Package and sign the app as a `*.wgt` file
- Run the following command to install the project on the connect TV:
  ```bash
  yarn deploy
  ```
  This will upload the `*.wgt` to the device and install it. You can then find the app in the "Apps" section of your TV to launch it.
- Run the following command to run the installed application on the emulator:
  ```bash
  tizen run -p id
  ```
The id can be found in config.xml.