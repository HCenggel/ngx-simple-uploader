import {Injectable} from '@angular/core';
import * as MD5 from 'crypto-js/md5';
import * as Hex from 'crypto-js/enc-hex';
import * as EncLatin1 from 'crypto-js/enc-latin1';
import * as WordArray from 'crypto-js/lib-typedarrays';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FileItemType} from "../types";

@Injectable({
    providedIn: 'root'
})
export class Md5Service {

    constructor() {
    }

    /** 计算文件的MD5 */
    async getFileMD5(file: FileItemType) {
        const chunkSize = 1024 * 1024 * 2;
        const maxChunk = Math.ceil(file.totalSize / chunkSize);
        const jumpCount = this.getSubscript(maxChunk);
        const fileMds: Array<string> = [];
        for (let i = 0; i < maxChunk; i++) {
            if (jumpCount.includes(i)) {
                const mesa = await this.chunkToMd5(file.file.slice(i * chunkSize, (i + 1) * chunkSize))
                fileMds.push(mesa);
            }
        }
        const fileMd5 = await this.arrayStringToMd5(fileMds);
        return fileMd5;
    }

    /** 切片+切片转MD5 */
    async slicerAndMd5(file: File, index: number): Promise<string> {

        return '';
    }

    /** 切片转MD5 */
    private async chunkToMd5(chunk: any) {
        return new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(chunk);
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

    /** 数组转MD5 */
    private async arrayStringToMd5(arr: Array<string>): Promise<string> {
        return await MD5(JSON.stringify(arr)).toString();
    }

    /** 在数据中获取固定数量的数据 */
    private getSubscript(maxLength: number, num: number = 8) {
        const jumpCount = Math.ceil(maxLength / num);
        const encryptIndex: Array<number> = [];
        for (let i = 0; i < maxLength; i++) {
            if (i % jumpCount === 0) {
                encryptIndex.push(i);
            }
        }
        return encryptIndex;
    }
}
