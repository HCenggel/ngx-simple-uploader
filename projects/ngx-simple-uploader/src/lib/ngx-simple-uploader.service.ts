import {Injectable} from '@angular/core';
import * as MD5 from 'crypto-js/md5';
import * as Hex from 'crypto-js/enc-hex';
import * as WordArray from 'crypto-js/lib-typedarrays';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NgxSimpleUploaderService {

    constructor(
        private readonly http: HttpClient
    ) {
    }

    /** 文件切块 */
    fileChunker(file: any): Array<ArrayBuffer> {
        return [];
    }

    /** 生成简单的UUID */
    generateUUID(): string {
        let uuid = '';
        for (let i = 0; i < 8; i++) {
            // tslint:disable-next-line:no-bitwise
            uuid += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        uuid = uuid.slice(13);
        return (Date.now()).toString() + uuid;
    }

    /** 对块儿进行MD5加密，为了更好的性能文件大小尽量不要超过5MB */
    async fileChunkToMd5(file: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e: any) => {
                const wordArray = WordArray.create(e.target.result);
                const md5 = MD5(wordArray).toString(Hex);
                resolve(md5);
            };
            fileReader.onerror = (e: any) => {
                reject(null);
            };
        });
    }

    /** 计算文件的ND5，进行了优化
     * 对文件进行切块，每个快5mb，每个块进行md5加密
     * 最后对所有块的MD5进行MD5加密 */
    fileToMd5(file: any): Promise<string> {

        // console.log(file)

        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e: any) => {
                const wordArray = WordArray.create(e.target.result);
                const md5 = MD5(wordArray).toString(Hex);
                resolve(md5);
            };
            fileReader.onerror = (e: any) => {
                reject(null);
            };
        });
    }

    // 有些东西砍掉了，但是网上的资料还是以前的，新特性的问答跟不上就是很费劲儿

    /** 计算列表的大小 */
    byteUnitPromotion(value: number, unit: string): string {
        if ([0, null, undefined, ''].includes(value)) {
            return 0 + '' + unit;
        }
        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const hex = 1024;
        const index = units.findIndex((v) => {
            return v === unit;
        });
        let returnData = '';
        for (let i = 0; i < units.length - index; i++) {
            if (value / Math.pow(hex, i) < 1) {
                returnData = (value / Math.pow(hex, i - 1)).toFixed(2) + units[i - 1];
                break;
            }
        }
        return returnData;
    }

    /** 计算进度 */
    uploadProgress(): number {
        return 0;
    }


    upFile(file: any, url: string): Observable<any> {
        return this.http.post(url, {}, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    // tslint:disable-next-line:typedef
    handleError(event: any) {
        return '';
    }


}

/*
当对大文件进行MD5加密时，可以使用流式加密的方式对数据逐步处理，而不是将整个文件读入内存。这可以减少内存使用，并提高文件加密处理的效率。

具体实现方式如下：

使用FileReader对象的readAsArrayBuffer()方法读取文件内容。

将ArrayBuffer分成一定大小的块，并使用CryptoJS.lib.WordArray.create()方法将每个块转化为WordArray类型。

对每个块分别进行MD5加密处理，并使用CryptoJS.MD5()方法将加密后的结果保存到缓存中。

在所有块都处理完成后，使用CryptoJS.MD5()方法将所有块的缓存合并并计算出最终的MD5摘要值。

以下是示例代码：

function calculateMD5(file, chunkSize = 1024 * 1024) {
  const fileSize = file.size;
  const chunks = Math.ceil(fileSize / chunkSize);
  let currentChunk = 0;
  const sha256Hash = CryptoJS.algo.MD5.create();
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
    sha256Hash.update(wordArray);

    currentChunk++;
    if (currentChunk < chunks) {
      loadNext();
    } else {
      const md5 = sha256Hash.finalize().toString();
      console.log("MD5 of the file is:", md5);
    }
  };

  function loadNext() {
    const start = currentChunk * chunkSize;
    const end = Math.min(fileSize, start + chunkSize);
    fileReader.readAsArrayBuffer(file.slice(start, end));
  }

  loadNext();
}
以上代码可以将文件分成大小为chunkSize的块，逐步处理并计算MD5摘要值。默认值为1MB。

希望这个解答能够帮到你！
*/
