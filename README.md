![npm](https://img.shields.io/npm/v/hid-barcode-scanner?color=blue)
# NodeJS USB-Barcode Scanner Library
A JavaScript library for using USB barcode scanners in NodeJS applications.js.

## Version Information
+ 1.0.6 - Removed unnecessary console.logs
+ 1.0.5 - Introduced version checking.
+ 1.0.4 - Fixed bugs preventing the use of the getDevices function. This version also returns sting as all lowercase characters.


## Intallation
You can install this package by running the following command:
```bash
npm i hid-barcode-scanner --save
```

## Usage NodeJS
You can list all devices using the following code:
``` javascript
let getDevices = require('hid-barcode-scanner').getDevices;
console.log(getDevices());

```
Or search for a specific device using the following:
```javascript
 let getDeviceByPath = require('./usb-barcode-scanner').getDeviceByPath;
 console.log(getDeviceByPath('/dev/hidraw0'));

let getDevicesByIds = require('./usb-barcode-scanner').getDevices;
console.log(getDevicesByIds(1529,8721));
```
Depending on the method used, a devices will show up as an array of objects or a single object in the following format:
``` text
 {
    vendorId: 1529,
    productId: 8721,
    path: '/dev/hidraw0',
    serialNumber: 'S/N E22A03870',
    manufacturer: 'Datalogic ADC, Inc.',
    product: 'Handheld Barcode Scanner',
    release: 131,
    interface: 0,
    usagePage: 1,
    usage: 6
  }

```
General usage is as follows:
```javascript
 let UsbScanner = require('hid-barcode-scanner').UsbScanner;
 let scanner = new UsbScanner({
      vendorId: 1529,
      productId: 8721
 });
 scanner.events.on('data', (data) => {
      console.log(data);
 });
 scanner.events.on('error', (error) => {
      console.log(error);
 });
 scanner.startScanning();
```

To stop scanning, you can use:
```javascript
scanner.stopScanning();
```