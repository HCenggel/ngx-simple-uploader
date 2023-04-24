export interface FileItemType {
    // file id 自定义的
    id: string;
    // 文件名
    name: string;
    // 文件总大小
    totalSize: number;
    // 当前块的大小
    chunkSize: number;
    // 文件类型
    type: string;
    // 最后修改时间
    lastModified: any;
    // 总切片数，length值
    totalChunks: number;
    // 上传完成的切片位置，这里使用length值，从1开始
    currentChunks: number;
    // 文件MD5，到时候要进行计算。目前随机生成一下
    md5: string;
    // 目标目录
    targetPath: string;
    // 来源目录
    sourcePath: string;
    // 文件状态，为了在外面可以扩展加了string
    uploadType: uploadType;
    // 文件本身
    file: any;
    // 上传进度
    uploadProgress: number;
}

/** 上传状态
 * 正在加密：encrypt
 * 准备上传：preparing
 * 正在上传：uploading
 * 上传完成：finish
 * -------------
 * 暂停上传：pause
 * 上传异常：error
 */
export type uploadType = 'uploading' | 'preparing' | 'pause' | 'finish' | 'encrypt';
