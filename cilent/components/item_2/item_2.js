Component({
  properties:{
    title:{
      type:String,
      value:''
    },
    time:{
      type:String,
      value:''
    },
    detail:{
      type:String,
      value:''
    },
    category:{
      type:String,
      value:''
    },
    address:{
      type:String,
      value:''
    },
    finished:{
      type:Boolean,
      value:false
    },
    importance:{
      type:String,
      value:''
    },
    iconCol:{
      type:Boolean,
      value:true
    },
    infoCol:{
      type:Boolean,
      value:true
    },
    imagePath:{
      type:String,
      value:''
    },
    date:{
      type:String,
      value:''
    }
  },
  data: {

  },

  attached: function () {
    console.log('component attached!');
  },

  detached: function () {
    console.log('component dettached!');
  },

  methods: {
    removeMatter: function (e) {
      this.triggerEvent("itemremove");
    },

    moreInfo:function(){
      this.setData({
        infoCol: !this.properties.infoCol
      })
    },

    cardFinished:function(){
      this.setData({
        finished: !this.properties.finished
      })
    },

    modifyMatter:function(){
      this.triggerEvent("itemmodify")
    },

    shareMatter:function(){
      this.triggerEvent("sharepage")
    },

    onTouchItem:function(e){
      this.setData({
        iconCol: !this.properties.iconCol
      })
    },
    
    onTouchDownArrow:function(e){
      this.setData({
        infoCol: false,
        iconCol: false,
      })
    },

    onTouchUpArrow:function(e){
      this.setData({
        infoCol: true,
        iconCol: true,
      })
    }

  }
})