export const options = {
    target: '/', // 上传链接
    chunkSize: 0, // 切片大小，0的时候不进行切片
    autoUpload: false, // 是否自动上传，选择文件之后立即标记排队上传
    fileParameterName: 'file', // 上传文件参数名
    testChunks: true, // 是否开启服务器分片校验（基于MD5）
    simultaneousUploads: 2, // 上传并发数
    allowDuplicateUploads: false, // 同一个文件是否可以上传多次
    maxChunkRetries: 3, // 上传失败重试次数
    chunkRetryInterval: 1000, // 上传重试间隔时间
    preprocess: true, // 文件预处理，切片上传的时候进行秒传判断
    query: { // 上传时额外的入参，服务端接受时需要body.query.xxx接受
    },
    fileType: [], // 可上传的文件后缀
    showFileList: true, // 是否显示自带的文件列表，如果自己写关注组件的[fileList]="fileList"
    // 上传之前进行的函数
    beforeUpload: () => {
    },
};
