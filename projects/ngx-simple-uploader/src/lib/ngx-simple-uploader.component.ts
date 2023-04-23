import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileItemType} from '../types';
import {options} from '../defaultData';
import {NgxSimpleUploaderService} from './ngx-simple-uploader.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ngx-simple-uploader',
    template: `
        <main class="ngx_simple_uploader_box">
            <button type="button" class="up_btn">
                <input type="file" multiple name="file" id="file" (change)="fileChange($event,'input')"/>
                Clidk ME!
            </button>
            <p><br/></p>
            <!--<button type="button">选择</button>-->
            <!--<div class="file_box" (dragover)="$event.preventDefault()" (drop)="fileChange($event,'drop')">
                <span></span>
            </div>-->
            <table class="file_list">
                <tr *ngFor="let item of fileList">
                    <td>{{item.name}}</td>
                    <td>{{item.md5}}</td>
                    <td>{{simpleUploaderUtils.byteUnitPromotion(item.totalSize, 'B')}}</td>
                    <!--<td>
                        &lt;!&ndash;准备中：preparing&ndash;&gt;
                        <span *ngIf="item.uploadType === 'uploading'">正在上传</span>
                        <span *ngIf="item.uploadType === 'pause'">停止上传</span>
                        <span *ngIf="item.uploadType === 'queue'">排队等待</span>
                        <span *ngIf="item.uploadType === 'finish'">上传成功</span>
                        <span *ngIf="item.uploadType === 'md5ing'">校验MD5</span>
                    </td>
                    <td>
                        ｘ
                    </td>-->
                </tr>
            </table>
        </main>
    `,
    styleUrls: ['./ngx-simple-uploader.component.scss']
})
export class NgxSimpleUploaderComponent implements OnInit {

    constructor(
        public readonly simpleUploaderUtils: NgxSimpleUploaderService
    ) {
    }

    @Input() options: any = {}; // 上传组件配置
    @Input() fileList: Array<FileItemType> = []; // 上传列表
    @Output() suRemove = new EventEmitter(); // 删除文件
    @Output() suPause = new EventEmitter(); // 暂停上传
    @Output() suStart = new EventEmitter(); // 开始上传
    @Output() suRetry = new EventEmitter(); // 重试上传

    ngOnInit(): void {
        // this.simpleUploaderUtils.upFile('', 'http://localhost:3000').subscribe((res: any) => {
        //     console.log(res);
        // });
        this.options = Object.assign(JSON.parse(JSON.stringify(options)), this.options);
    }

    /** 监视文件的选择 */
    fileChange(event: Event | DragEvent, type: 'input' | 'drop'): void {
        let fileList: any = [];
        if (type === 'drop') {
            event.preventDefault();
            fileList = (event as DragEvent).dataTransfer?.files;
        } else {
            fileList = (event.target as HTMLInputElement).files;
        }
        if (fileList.length > 0) {
            this.generateFileList(fileList);
        }
    }

    /** 上传列表生成器 */
    generateFileList(files: FileList): void {
        // 生成全部文件的列表
        for (const file of Array.from(files)) {
            this.fileList.push({
                id: this.simpleUploaderUtils.generateUUID(),
                name: file.name,
                totalSize: file.size,
                type: file.type,
                lastModified: file.lastModified,
                totalChunks: this.options.chunkSize ? (Math.ceil(file.size / this.options.chunkSize)) : 1,
                currentChunks: 0,
                md5: '',
                chunkSize: this.options.chunkSize,
                targetPath: '',
                sourcePath: '',
                uploadType: 'md5ing',
                file,
                uploadProgress: 0
            });
        }

        this.fileAddMD5();

        this.fileList.forEach((v: any, i: number) => {
            this.simpleUploaderUtils.fileToMd5(v.file).then((md5: any) => {
                this.fileList[i].md5 = md5;
                this.fileList[i].uploadType = 'preparing';
                // console.log(v);
            });
        });

        // 如果是自动上上传将会进行上传操作
        if (this.options.autoUpload) {
        }
    }

    /** 对文件进行MD5加密 */
    fileAddMD5(): void {
        // for (let i = 0; i < this.fileList.length; i++) {
        //     console.log(this.fileList[i]);
        //     if (this.fileList[i].uploadType === 'md5ing') {
        //         console.log(i);
        //         break;
        //     }
        // }
        console.log(this.fileList.entries());
        for (const [index, file] of this.fileList.entries()) {
            console.log(index, file);
            file.name = (Math.random() * 1000).toFixed(0);
        }
    }

    /** 开始上传 */
    uploadAll(): void {
        console.log('uploadAll');
    }

    removeItem(item: FileItemType): void {
        this.suRemove.emit(item);
    }

    pauseItem(item: FileItemType): void {
        this.suPause.emit(item);
    }

    startItem(item: FileItemType): void {
        this.suStart.emit(item);
    }

    retryItem(item: FileItemType): void {
        this.suRetry.emit(item);
    }

    /** 暂停所有上传 */
    private pauseAll(): void {

    }

    /** 继续上传 */
    private resumeAll(): void {

    }

    /** 取消所有文件上传，并删除列表 */
    private cancelAll(): void {

    }

}
