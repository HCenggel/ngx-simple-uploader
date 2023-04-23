import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {

    constructor() {
    }

    // 这个必须是空的，传参不会有任何变化
    public fileList: Array<any> = [];
    // 上传组件配置，可选
    public options = {};

    // 上传组件
    @ViewChild('ngxSimpleUploader') ngxSimpleUploader: any;

    ngOnInit(): void {
        const list: Array<any> = [
            {name: '顶级1', path: '一级-二级-三级1'},
            {name: '顶级1', path: '一级-二级-三级2'},
            {name: '顶级1', path: '一级-二级1-三级1'},
            {name: '顶级2', path: '一级-二级1-三级1'},
            {name: '顶级2', path: '一级-二级1-三级2'},
            {name: '顶级2', path: '一级-二级2-三级3'},
            {name: '顶级2', path: '一级-二级2-三级4'},
            {name: '顶级2', path: '一级-二级2-三级5'},
        ];
        list.forEach((v: any) => {
            v.path = v.path.split('-');
        });
        list.forEach((v: any) => {
            (v.path || []).forEach((cv: any) => {
                // console.log(cv);
            });
        });

    }

    ngAfterViewInit(): void {
        // this.ngxSimpleUploader.uploadAll();
    }

}
