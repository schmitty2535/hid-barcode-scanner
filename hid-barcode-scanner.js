'use strict';
/*
*  REQUIRED NODE MODULES
*/
let HID                                      = require('node-hid');
let _                                        = require('lodash');
let events                                   = require('events');

let defaultHidMap = {
     4: "A",
     5: "B",
     6: "C",
     7: "D",
     8: "E",
     9: "F",
     10: "G",
     11: "H",
     12: "I",
     13: "J",
     14: "K",
     15: "L",
     16: "M",
     17: "N",
     18: "O",
     19: "P",
     20: "Q",
     21: "R",
     22: "S",
     23: "T",
     24: "U",
     25: "V",
     26: "W",
     27: "X",
     28: "Y",
     29: "Z",
     30: "1",
     31: "2",
     32: "3",
     33: "4",
     34: "5",
     35: "6",
     36: "7",
     37: "8",
     38: "9",
     39: "0",
     40: "enter",
     43: "\t",
     44: " ",
     45: "-",
     46: "=",
     47: "[",
     48: "]",
     49: "\\",
     51: ";",
     52: "'",
     53: "`",
     54: ",",
     55: ".",
     56: "/",
     85: "*",
     87: "+"
}

class UsbScanner{
     constructor(_options, _hidMap) {

          if (_options.path) {
               this.device = this.retrieveDeviceByPath(_options.path);
          } else if (_options.vendorId && _options.productId) {
               this.device = this.retrieveDevice(_options.vendorId, _options.productId);
          }

          if (_options.driverType) {
               HID.setDriverType(_options.driverType);
          } else {
               HID.setDriverType("hidraw");
          }

          this.bufferOffset = _options.bufferOffset || 2;
          this.events = new events.EventEmitter();

          if (this.device === undefined) {
               this.emitError("Device not found, please provide a valid path or vendor/product combination");
          } else {
               this.hid = new HID.HID(this.device.vendorId, this.device.productId);

               if (_hidMap) {
                    this.hidMap = _hidMap;
               } else {
                    this.hidMap = defaultHidMap;
               }
          }
     }

     retrieveDevice(vendorId, productId, Device){
          return getDevice(vendorId, productId);
     }

     retrieveDeviceByPath(path, Device){
          return getDeviceByPath(path);
     }

     startScanning(){
          let bcodeBuffer = [];
          let barcode= '';

          if (this.hid) {
               this.hid.on('data', (chunk) => {
                    if (this.hidMap[chunk[this.bufferOffset]]) {
                         if (chunk[this.bufferOffset] !== 40) {
                              bcodeBuffer.push(this.hidMap[chunk[this.bufferOffset]]);
                         } else {
                              barcode = bcodeBuffer.join("");
                              bcodeBuffer = [];

                              this.emitDataScanned(barcode);
                         }
                    }
               });
               let self = this;
               this.hid.on('error', error => {
                    if (self.device) {
                         self.device.close();
                         this.emitError(error);
                    }
               });
          }
     }

     stopScanning(){
          if (this.hid) {
               this.hid.close();
          }
     }

     emitDataScanned(data){
          this.events.emit('data', data)
     }

     emitError(error){
          setTimeout( ()=>{
               this.events.emit('error', error);
          },1500)
     }
}

function getDevice(vendorId, productId){
     // console.log(humanInterfaceDevice.devices());
     return _.find(HID.devices(), { 'vendorId': vendorId, 'productId': productId });
}
function getDeviceByPath(path){
     return _.find(HID.devices(), { 'path': path });
}

module.exports = { UsbScanner, getDevice, getDeviceByPath }
