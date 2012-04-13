function Canvas(c,type){
  this.canvas = c;
  this.ctx    = this.canvas.getContext('2d');
  this.type   = type;
  this.url    = null;
  
  this.draw = function(time){
    var self   = this;
    var img    = new Image();
    img.onload = function(){ self.ctx.drawImage(img,0,0) };
    img.src    = this.getURI(this.type,time);
  };
};

Canvas.prototype.getURI = function(type,time){
  this.url = 'http://www-open-opensocial.googleusercontent.com/gadgets/proxy/refresh=3600&container=open&gadget=http%3A%2F%2Fbijint.com%2Fgadget%2Fbishoujo%2Fgadget.xml/http://www.bijint.com/assets/pict/'+type+'/240x320/' + time + '.jpg';
  return this.url
};

var Bijin = {
  createTime : function(_time){
    return (_time.toString().length < 2) ? 0 + _time : _time;
  },
        
  getTime : function(){
    var hh = this.createTime( document.getElementById("hh").value );
    var mm = this.createTime( document.getElementById("mm").value );
    return hh + mm;
  }
};


if (Meteor.is_client) {
  var type_list  = [
    {id: "bishoujo",  title: "美少女時計"},
    {id: "bijin",     title: "美人時計"},
    {id: "kids",      title: "キッズ美人時計"},
    {id: "cc",        title: "サーキット美人時計"},
    {id: "hokkaido",  title: "北海道美人時計"},
    {id: "kagoshima", title: "鹿児島美人時計"},
    {id: "okayama",   title: "岡山美人時計"},
    {id: "sendai",    title: "仙台美人時計"},
    {id: "kobe",      title: "神戸美人時計"},
    {id: "kagawa",    title: "香川美人時計"},
    {id: "okinawa",   title: "沖縄美人時計"},
    {id: "gunma",     title: "群馬美人時計"},
    {id: "akita",     title: "秋田美人時計"},
    {id: "fukui",     title: "福井美人時計"},
    {id: "osaka",     title: "大阪美人時計"},
    {id: "nagoya",    title: "名古屋美人時計"},
    {id: "tv-asahi",  title: "テレビ朝日美人時計"},
    {id: "fukuoka",   title: "福岡美人時計"},
    {id: "niigata",   title: "新潟美人時計"},
    {id: "k-musume",  title: "カンバン娘美人時計"}
  ];

  Template.main.canvases = function(){
    return type_list;
  };
  
  Template.show.events = {
    'click' : function (){
      for(var i=0; i<type_list.length; i++){
        new Canvas(document.getElementById(type_list[i].id + "_canvas"), type_list[i].id).draw(Bijin.getTime());
      };
    }
  };
  
  Template.random.events = {
    'click' : function (){
      alert("まだ実装してないよ！");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
