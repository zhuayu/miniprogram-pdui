Page({
    data:{
        recordStatusText:'开始录音',
        recordList:[],
        heightVersion:false,
    },
    onLoad:function(){
        this.SDKVersion();
    },
    SDKVersion:function(){
        wx.getSystemInfo({
            success: (res)=> {
                let SDKVersion = parseFloat(res.SDKVersion);
                if(SDKVersion < 1.6 ){
                    this.setData({ heightVersion:true })
                }
            }
        })
    },
    startTime:null,
    startRecord:function(){
        this.startTime = new Date();
        let recordStatusText = '录音中';
        this.setData({recordStatusText});

        let heightVersion = this.data.heightVersion;
        if(heightVersion){
            // 1.6.0以上版本使用
            const recorderManager = wx.getRecorderManager();
            recorderManager.onStop((res) => {
                const { tempFilePath } = res
                this.saveRecord(tempFilePath);
            })
            
            const options = {
                duration: 600000,
                sampleRate: 44100,
                numberOfChannels: 1,
                encodeBitRate: 192000,
                format: 'mp3',
                frameSize: 50
            }
            recorderManager.start(options);

        }else{
            // 1.6.0以下版本使用
            wx.startRecord({
                success: (res)=> {
                    var tempFilePath = res.tempFilePath 
                    this.saveRecord(tempFilePath);
                },
                fail: function(res) {
                    //录音失败
                }
            })
        }
    },
    saveRecord:function(tempFilePath){
        let record = {};
        let recordList = this.data.recordList;
        let startTime = this.startTime;
        let stopTime = new Date().getTime();
        let duration = stopTime - startTime.getTime();
        this.startTime = null;
        record.src = tempFilePath;
        record.duration = duration;
        record.startTime = startTime;
        recordList.push(record);
        this.setData({recordList});
    },
    stopRecord:function(){
        let recordStatusText = '开始录音';
        this.setData({recordStatusText});


        let heightVersion = this.data.heightVersion;
        if(heightVersion){
            const recorderManager = wx.getRecorderManager();
            recorderManager.stop();
        }else{
            wx.stopRecord();
        }
    },
    playVoice:function(e){
        let filePath     = e.currentTarget.dataset.src;
        let heightVersion = this.data.heightVersion;

        if(heightVersion){
            // 1.6.0以上版本
            const innerAudioContext = wx.createInnerAudioContext()
            innerAudioContext.autoplay = true
            innerAudioContext.src = filePath;
            innerAudioContext.onPlay(() => {
                console.log('开始播放')
            })

            innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            })
        }else{
            // 1.6.0以下版本
            wx.playVoice({
                filePath: filePath,
                success: function() {
                    console.log('success')
                },
                fail:function(){
                    console.log('fail')
                },
                complete: function(){
                    console.log('complete')
                }
            })

        }
    }
})