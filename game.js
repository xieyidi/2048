class Square{
    constructor(){
        //the value of every div
        this.arr = [
            [0,2,0,0],
            [0,0,0,0],
            [0,0,2,0],
            [0,0,0,0]
        ];
        this.son = {};
        //trans the distance every div should translate
        this.trans = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        //the arr of node current
        this.ele = [];
        //the position can not generate new node
        this.inval = [];
    }
    //FUNCTION generate a new node every turn 
    random(){
        window.now = [];
        window.pre = [];
        console.log('random'+this.arr);
        console.log('can not'+this.inval['x']+'--and--'+this.inval['y']+'  '+this.inval.toString());
        let obj = [];
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4; j++){
                let prevt = true;
                let single = {'x':i,'y':j};
                if(new RegExp(JSON.stringify(single)).test(JSON.stringify(this.inval))){
                    window.a = JSON.stringify(single);
                    window.b = JSON.stringify(this.inval);

                    console.log('prevent'+this.inval.toString()+' from '+single.toString());
                    prevt = false;
                }

                if(this.arr[i][j]<1){
                    window.now.push({'x':i,'y':j});
                }
                if(this.arr[i][j]<1 && prevt){
                    obj.push({'x':i,'y':j});
                    window.pre.push({'x':i,'y':j});
                }
            }
        }
        console.log('random here'+obj.toString());
        let len = obj.length;
        let r = Math.floor(len*Math.random());
        let i = obj[r].x;
        let j = obj[r].y;
        this.son = {'x':i,'y':j};
        console.log('r'+obj[r].x+' '+obj[r].y+' '+obj.length+'shengcheng'+this.arr[i][j]);
        this.arr[i][j] = 2;
        this.add(i,j).className = 'small';

    }
    clearTrans(){
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                this.trans[i][j] = 0;
            }
        }
        //clear the invalid proxy every turn
        this.inval = [];
        console.log('clear'+this.trans);
    }
    clearNode(x,y){
        let father = document.getElementById('wrap');
        let str = ''+strfy(x)+','+strfy(y);
        for(let i = 0;i<this.ele.length;i++){
            if(this.ele[i].getAttribute('data-pos')==str){
                console.log('clearNode'+str);
                father.removeChild(this.ele[i]);
                this.ele.splice(i,1);
                console.log('clear-1-node'+this.ele);
                // break;
            }
        }
    }
    clearCopy(){
        let arr = [];
        for(let i = 0;i<this.ele.length;i++){
            if(indexOf(this.ele[i].innerHTML)!=-1){
                console.log('clearNode'+str);
                father.removeChild(this.ele[i]);
                this.ele.splice(i,1);
                // break;
            }
        }
    }
    handle(type){  //handle the keydown event
        switch(type){
            case 37:
            this.left();this.random();this.render(4);
            break;
            case 38:
            this.up();this.random();this.render(1);
            break;
            case 39:
            this.right();this.random();this.render(2);
            break;
            case 40:
            this.down();this.random();this.render(3);
            break;
            default:
            throw new Error('wrong operate');
            break;
        }
        this.clearTrans();
    }
    up(){
        console.log('beforeup'+this.arr);
        console.log('beforeup'+this.trans);
        // function check(obj){
            // console.log('obj:'+obj);
            for(let k = 0;k<4;k++){
                for(let i = 0;i<4;i ++){
                    if(this.arr[i][k]>1){
                        let log = false;
                        for(let j=i+1;j<4;j++ ){
                            if(this.arr[j][k]==this.arr[i][k]){
                                //向后找到了相同的数字
                                 let dis = 0;
                                for(let g = i-1;g>-1&&this.arr[g][k]==0;g--){
                                    // if(this.arr[k][g]==0){
                                        dis++;
                                    // }
                                }

                                this.trans[j][k] = j-i+dis;
                                console.log('from['+i+k+'] to ['+j+k+'] '+this.trans[i][k]+' '+this.trans[j][k]);
                                this.arr[i-dis][k] = 2*this.arr[i][k];
                                if(dis)this.arr[i][k] = 0;
                                console.log('should clear');
                                this.inval.push({'x':j,'y':k});
                                this.clearNode(i,k);
                                this.arr[j][k] = 0;
                                log = true;
                                break;
                            }else if(this.arr[j][k]>1){
                                break;
                            }
                        }
                        if((!log)&&i>0){
                            for(let j =i-1;j>-1;j--){
                                //处理和后面配不成对 之前含有零的情况

                                if(this.arr[j][k]==0){
                                    console.log('- -['+i+','+k+']'+this.trans);
                                    this.trans[i][k]  = this.trans[i][k]+1;
                                    console.log('-0-['+i+','+k+']'+this.trans);
                                    if(j>0){
                                       if(this.arr[j-1][k]!=0 && j!=0){                                            this.arr[j][k] = this.arr[i][k].valueOf();
                                            console.log('-1-['+i+','+k+']'+this.trans);
                                            this.arr[i][k]=0;
                                            break;
                                        }
                                        if(this.arr[j-1][k]==0 && j==1){
                                            this.trans[i][k]++;
                                            this.arr[0][k] = deepClone(this.arr[i][k]);
                                            this.arr[i][k]=0;
                                            break;
                                        }
                                    }else{
                                            this.arr[j][k] = deepClone(this.arr[i][k]);
                                            this.arr[i][k]=0;
                                            break;
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
    }
    left(){
            for(let k = 0; k<4; k++){
                for(let i = 0; i<4; i++){
                    if(this.arr[k][i]>1){
                        let log = false;
                        for(let j=i+1;j<4;j++ ){
                            if(this.arr[k][j]==this.arr[k][i]){
                                //向后找到了相同的数字
                                 let dis = 0;
                                for(let g = i-1; g>-1&&this.arr[k][g]==0; g--){
                                    // if(this.arr[k][g]==0){
                                        dis++;
                                    // }
                                }
                                this.trans[k][j] = j-i+dis;
                                console.log('from['+k+i+'] to ['+k+j+'] '+this.trans[k][i]+' '+this.trans[k][j]);
                                this.arr[k][i-dis] = 2*this.arr[k][i];
                                if(dis)this.arr[k][i] = 0;
                                this.inval.push({'x':k,'y':j});
                                this.clearNode(k,i);
                                this.arr[k][j] = 0;
                                log = true;
                                break;
                            }else if(this.arr[k][j]>0){
                                break;
                            }
                        }
                        if((!log)&&i>0){
                            for(let j =i-1;j>-1;j--){
                                //处理和right 配不成对 left side含有零的情况

                                if(this.arr[k][j]==0){
                                    console.log('- -['+k+','+i+']'+this.trans);
                                    this.trans[k][i]  = this.trans[k][i]+1;
                                    console.log('-0-['+k+','+i+']'+this.trans);
                                    if(j>0){
                                       if(this.arr[k][j-1]!=0 && j!=0){
                                            this.arr[k][j] = this.arr[k][i].valueOf();
                                            console.log('-1-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                        }
                                        if(this.arr[k][j-1]==0 && j==1){
                                            this.trans[k][i]++;
                                            this.arr[k][0] = deepClone(this.arr[k][i]);
                                            console.log('-2-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                        }
                                    }else{
                                            this.arr[k][j] = deepClone(this.arr[k][i]);
                                            console.log('-3-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                    }
                                    
                                }
                            }
                        }
                    }                }
            }
    }
    down(){
         for(let k = 0;k<4;k++){
                for(let i = 3;i>-1;i--){
                    if(this.arr[i][k]>1){
                        let log = false;
                        for(let j=i-1;j>-1;j-- ){
                            if(this.arr[j][k]==this.arr[i][k]){
                                //向上找到了相同的数字
                                let dis = 0;
                                for(let g = i+1;g<4&&this.arr[k][g]==0;g++){
                                    // if(this.arr[k][g]==0){
                                        dis++;
                                    // }
                                }

                                this.trans[j][k] = i-j+dis;
                                console.log('from['+i+k+'] to ['+j+k+'] '+this.trans[i][k]+' '+this.trans[j][k]);
                                this.arr[i+dis][k] = 2*this.arr[i][k];
                                if(dis)this.arr[i][k] = 0;
                                this.inval.push({'x':j,'y':k});
                                this.inval.push({'x':i,'y':k});
                                this.clearNode(i,k);
                                this.arr[j][k] = 0;
                                // console.log(this.arr[k]);
                                log = true;
                                break;
                            }else if(this.arr[j][k]>1){
                                break;
                            }
                        }
                        if((!log)&&i<3){
                            for(let j =i+1;j<4;j++){
                                //处理和上面配不成对 下面含有零的情况

                                if(this.arr[j][k]==0){
                                    console.log('- -['+i+','+k+']'+this.trans);
                                    this.trans[i][k]  = this.trans[i][k]+1;
                                    if(j<3){
                                       if(this.arr[j+1][k]!=0 && j!=3){
                                            // this.trans[i][k]++;
                                            // let tmp = this.arr[i][k];
                                            this.arr[j][k] = this.arr[i][k].valueOf();                                            this.arr[i][k]=0;
                                            break;
                                        }
                                        if(this.arr[j+1][k]==0 && j==2){
                                            this.trans[i][k]++;
                                            this.arr[3][k] = deepClone(this.arr[i][k]);                                            this.arr[i][k]=0;
                                            break;
                                        }
                                    }else{
                                            this.arr[j][k] = deepClone(this.arr[i][k]);
                                            console.log('-3-['+i+','+k+']'+this.trans);
                                            this.arr[i][k]=0;
                                            break;
                                    }
                                    
                                }
                            }
                        }
                    }
                    console.log('['+i+','+k+']'+this.trans);
                }
            }
    }
    right(){
            for(let k = 0; k<4; k++){
                for(let i = 4; i>-1; i--){
                    if(this.arr[k][i]>1){
                        let log = false;
                        for(let j=i-1;j>-1;j-- ){
                            if(this.arr[k][j]==this.arr[k][i]){
                                //向前找到了相同的数字
                                let dis = 0;
                                for(let g = i+1;g<4&&this.arr[k][g]==0;g++){
                                    // if(this.arr[k][g]==0){
                                        dis++;
                                    // }
                                }
                                this.trans[k][j] = i-j+dis;
                                console.log('from['+k+i+'] to ['+k+j+'] '+this.trans[k][i]+' '+this.trans[k][j]);
                                this.arr[k][i+dis] = 2*this.arr[k][i];
                                if(dis)this.arr[k][i] = 0;
                                console.log('should clear');
                                this.inval.push({'x':k,'y':j});
                                this.clearNode(k,i);
                                this.arr[k][j] = 0;
                                // console.log(this.arr[k]);
                                log = true;
                                break;
                            }else if(this.arr[k][j]>1){
                                break;
                            }
                        }
                        if((!log)&&i<3){
                            for(let j =i+1;j<4;j++){
                                //处理和right 配不成对 right side含有零的情况

                                if(this.arr[k][j]==0){
                                    console.log('- -['+k+','+i+']'+this.trans);
                                    this.trans[k][i]  = this.trans[k][i]+1;
                                    console.log('-0-['+k+','+i+']'+this.trans);
                                    if(j<3){
                                       if(this.arr[k][j+1]!=0 && j!=0){
                                            this.arr[k][j] = this.arr[k][i].valueOf();
                                            console.log('-1-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                        }
                                        if(this.arr[k][j+1]==0 && j==2){
                                            this.trans[k][i]++;
                                            this.arr[k][3] = deepClone(this.arr[k][i]);
                                            console.log('-2-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                        }
                                    }else{
                                            this.arr[k][j] = deepClone(this.arr[k][i]);
                                            console.log('-3-['+k+','+i+']'+this.trans);
                                            this.arr[k][i]=0;
                                            break;
                                    }
                                    
                                }
                            }
                        }
                    }                }
            }
    }
    //render 根据数组操作dom节点动画
    render(dir){

        console.log('render'+this.arr);
        let nodes = document.getElementById('wrap').childNodes;
        this.ele = Array.from(new Set(this.ele));
        
        for(let i = 0;i<this.ele.length;i++){
            let x = bind(Number.parseInt(this.ele[i].getAttribute('data-pos').split(',')[0]));
            let y = bind(Number.parseInt(this.ele[i].getAttribute('data-pos').split(',')[1]));
            let dif = '';
            let _x = '';
            let _y = '';
            if(this.trans[x][y]>0){
                switch(dir){
                    case 1://up direction
                        dif = Number.parseInt(this.ele[i].style.top)-this.trans[x][y]*100;
                        this.ele[i].style.top = dif+'px';
                        _x = bind(x-this.trans[x][y]);
                        _y = bind(y); 
                        let _str = strfy(_x)+','+strfy(_y);
                        this.ele[i].setAttribute('data-pos',_str);
                        console.log('_x_y--'+_x+' '+_y+this.arr[_x][_y]);
                        setTimeout(()=>{
                            this.ele[i].innerHTML = this.arr[_x][_y];
                        },500);
                        break;
                    case 2://right direction
                    console.log('case right'+this.ele[i].style.left+'iiiii'+i);
                        dif = Number.parseInt(this.ele[i].style.left)+this.trans[x][y]*100;
                        this.ele[i].style.left = dif+'px';
                        _x = bind(x);
                        _y = bind(y+this.trans[x][y]); 
                        let _str2 = strfy(_x)+','+strfy(_y);
                        this.ele[i].setAttribute('data-pos',_str2);
                        console.log('_x_y--'+_x+' '+_y+this.arr[_x][_y]);
                        setTimeout(()=>{
                            this.ele[i].innerHTML = this.arr[_x][_y];
                        },500);
                     

                    break;
                    case 3://down direction
                    // dif = this.trans[x][y]*100+Number.parseInt(this.ele[i].style.top);
                    // this.ele[i].style.top = dif+'px';
                        console.log('case down'+this.ele[i].style.top+'iiiii'+i);
                        dif = Number.parseInt(this.ele[i].style.top)+this.trans[x][y]*100;
                        this.ele[i].style.top = dif+'px';
                        _x = bind(x+this.trans[x][y]);
                        _y = bind(y); 
                        let _str1 = strfy(_x)+','+strfy(_y);
                        this.ele[i].setAttribute('data-pos',_str1);
                        console.log('_x_y--'+_x+' '+_y+this.arr[_x][_y]);
                        setTimeout(()=>{
                            this.ele[i].innerHTML = this.arr[_x][_y];
                        },500);
                    break;
                    case 4://left direction
                    
                        dif = Number.parseInt(this.ele[i].style.left)-this.trans[x][y]*100;
                        this.ele[i].style.left = dif+'px';
                        _x = bind(x);
                        _y = bind(y-this.trans[x][y]); 
                        let _str3 = strfy(_x)+','+strfy(_y);
                        this.ele[i].setAttribute('data-pos',_str3);
                        console.log('_x_y--'+_x+' '+_y+this.arr[_x][_y]);
                        setTimeout(()=>{
                            this.ele[i].innerHTML = this.arr[_x][_y];
                        },500);
                    break;
                    default:
                    console.log('wang wang wang!!!');
                    break;

                }
            }

        }

        for(let i = 0; i<this.ele.length ;i++){
            console.log('aiqiyi==='+i+'==='+this.ele[i].getAttribute('data-pos'));
            let x = Number.parseInt(this.ele[i].getAttribute('data-pos').split(',')[0]);
            let y = Number.parseInt(this.ele[i].getAttribute('data-pos').split(',')[1]);
            console.log('遍历'+x+'-'+y+'-'+this.arr[x][y]);
            
            if(new RegExp(JSON.stringify(this.son)).test(JSON.stringify({'x':x,'y':y}))){

                setTimeout(()=>{
                    this.ele[i].className = 'act2'; 
                },600)
            }else{
                switch(this.arr[x][y]){
                    case 0:
                    this.ele[i].className = 'none';
                    console.log('---0---'+x+y+this.ele[i].getAttribute('data-pos'));
                    break;
                    case 2:
                    case 4:
                    this.ele[i].className = 'act2';                
                    break;
                    case 8:
                    case 16:
                    this.ele[i].className = 'act8';                
                    break;
                    case 32:
                    case 64:
                    this.ele[i].className = 'act32';                
                    break;
                    case 128:
                    case 256:
                    this.ele[i].className = 'act128';                
                    break;
                    default:
                    this.ele[i].className = 'act128';
                    break;
            
                }
            }
            // this.ele[i].innerHTML = this.arr[x][y];
        }
    }
    init(ele){
        for(let i = 0;i<4;i++){
            for(let j = 0;j<4;j++){
                if(this.arr[i][j]!=0){
                    this.add(i,j)
                }
                
            }
        }
    }
    add(i,j){
        let node = document.createElement('div');
        node.className = 'act2';
        node.innerHTML = this.arr[i][j];
        node.style.left = (j*100+5)+'px';
        node.style.top = (i*100+5)+'px';
        let str = ''+strfy(i)+','+strfy(j);
        console.log('增加了'+str);
        node.setAttribute('data-pos',str);
        this.ele.push(node);
        document.getElementById('wrap').appendChild(node);
        return node;
    }
}
window.onload = function(){
    var wrap = document.getElementById('wrap');// get the board element
    var bg = document.getElementById('bg');
    for(let n = 0;n<16;n++){
        let node = document.createElement('div');
        // if((n+1)%4==0){
        //     node.style.marginRight = 0;
        // }
        bg.appendChild(node);

    }
    var sq = new Square();
    this.console.log('sq'+sq);
    sq.init(wrap);
    document.onkeydown = function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        console.log('keydown');
        sq.handle(e.keyCode);
    }
}