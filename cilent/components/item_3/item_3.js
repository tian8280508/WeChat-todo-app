var formatTime = require('../../utils/util.js')
Component({
  properties:{
    title: {
      type: String,
      value: ''
    },
    beginDate: {
      type: String,
      value: ''
    },
    finishDate:{
      type: String,
      value: ''
    },
    detail: {
      type: String,
      value: ''
    },
    category: {
      type: String,
      value: ''
    },
    address: {
      type: String,
      value: null
    },
    importance: {
      type: String,
      value: ''
    },
    imagePath: {
      type: String,
      value: null
    },
    date: {
      type: String,
      value: ''
    },
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
    modifyMatter:function(){
      this.triggerEvent("itemmodify")
    },
    onItemRemove:function(){
      this.triggerEvent('itemremove')
    }
  }
})