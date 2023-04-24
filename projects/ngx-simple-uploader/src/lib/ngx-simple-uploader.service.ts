import {Injectable} from '@angular/core';
import * as MD5 from 'crypto-js/md5';
import * as Hex from 'crypto-js/enc-hex';
import * as EncLatin1 from 'crypto-js/enc-latin1';
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
