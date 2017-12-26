Page({
    data: {
        list: [
            {
                id: 'z-index',
                name: '全局',
                open: false,
                pages: ['color', 'font']
            },
            {
                id: 'form',
                name: '表单',
                open: false,
                // pages: ['button', 'list', 'input', 'slider', 'uploader']
                pages: ['button','list', 'input', 'slider']
            },
            {
                id: 'widget',
                name: '基础组件',
                open: false,
                // pages: ['article', 'badge', 'flex', 'footer', 'gallery', 'grid', 'icons', 'loadmore', 'panel', 'preview', 'progress']
            },
            {
                id: 'feedback',
                name: '操作反馈',
                open: false,
                pages: ['actionsheet', 'dialog', 'picker', 'toast', 'prompt']
            },
            {
                id: 'nav',
                name: '导航相关',
                open: false,
                // pages: ['navbar', 'tabbar']
            },
            {
                id: 'search',
                name: '搜索相关',
                open: false,
                // pages: ['searchbar']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;

        list.forEach((data,index)=>{
            if(data.id == id){
                data.open = !data.open
            }
        })

        this.setData({
            list: list
        });
    }
});
