'use strict';

import * as fs from 'fs';

const cli = {
  execute() {
    fs.open('./unicode.txt', 'w', (error, fd) => {
      if (error) {
        throw error;
      }
      // 완성형
      let completeCount = 0;
      for (let x = 172; x < 216; x++) {
        for (let i = 0; i < 256; i++) {
          let converted = '';
          if (i < 16) {
            converted = String.fromCharCode(parseInt(`0X${x.toString(16)}0${i.toString(16)}`, 16));
          } else {
            converted = String.fromCharCode(parseInt(`0X${x.toString(16)}${i.toString(16)}`, 16));
          }

          if (completeCount >= 11172) {
            break;
          }

          completeCount++;
          console.log(converted, completeCount);

          const buf = new Buffer(converted);
          fs.write(fd, buf, 0, buf.length, null, err => {
            if (err) {
              throw err;
            }
          });
        }
      }

      // 자모
      let jamoCount = 0;
      for (let y = 49; y < 100; y++) {
        let converted = '';
        converted = String.fromCharCode(parseInt(`0X31${y.toString(16)}`, 16));
        jamoCount++;
        console.log(converted, jamoCount);
        const buf = new Buffer(converted);
        fs.write(fd, buf, 0, buf.length, null, err => {
          if (err) {
            throw err;
          }
        });
      }

      // ascii
      let asciiCount = 0;
      for (let a = 33; a < 127; a++) {
        let converted = '';
        converted = String.fromCharCode(a);
        asciiCount++;
        console.log(converted, asciiCount);
        const buf = new Buffer(converted);
        fs.write(fd, buf, 0, buf.length, null, err => {
          if (err) {
            throw err;
          }
        });
      }

      fs.close(fd, () => console.log(`All process is done.`));
    });
  },
};

export default cli;
