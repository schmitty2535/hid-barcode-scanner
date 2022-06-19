![npm](https://img.shields.io/npm/v/hid-barcode-scanner?color=blue)
# NodeJS USB-Barcode Scanner Library
A JavaScript library for using USB barcode scanners in NodeJS applications.js.

## Intallation
You can install this package by running the following command:
``` bash
npm i hid-barcode-scanner --save
```

## Usage NodeJS
You can list all devices using the following code:
``` javascript
let getDevices = require('hid-barcode-scanner').getDevices;
console.log(getDevices());
```

``` javascript
let UsbScanner = require('hid-barcode-scanner').UsbScanner;
let scanner = new UsbScanner({
    vendorId: 1155,
    productId: 2232
});
scanner.on('data', (data) => {
    console.log(data);
});
scanner.on('error', (error) => {
    console.log(error);
});
scanner.startScanning();
```

To stop scanning, you can use:
``` javascript
scanner.stopScanning();
```