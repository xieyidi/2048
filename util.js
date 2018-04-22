//control the binary 
function bind(x){
	if(x<-0.1){
		return 0;
	}else if(x>3.1){
		return 3;
	}else{
		return x;
	}
}
//for attribute data-pos to combine the x and y 
//escape the situation where x or y equals zero
function Clone(obj){
  return JSON.parse(JSON.stringify(obj));
}
function strfy(x){
	if(x==0){
		return '0';
	}else{
		return x;
	}
}
function deepClone(data){
       var type = typeof data;
       var obj;
       if(type === 'array'){
           obj = [];
       } else if(type === 'object'){
           obj = {};
       } else {
           //不再具有下一层次
           return data;
       }
       if(type === 'array'){
           for(var i = 0, len = data.length; i < len; i++){
               obj.push(deepClone(data[i]));
           }
       } else if(type === 'object'){
           for(var key in data){
               obj[key] = deepClone(data[key]);
           }
       }
       return obj;
   }
