Page({
    onReady:function(){
        this.prompt = this.selectComponent('#prompt');
    },
    openPrompt:function(e){
        let type = e.currentTarget.dataset.type;
        let msg  = '提示';
        this.prompt.show(type,msg,3000);
    }
})