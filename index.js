const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


const fps = 60;
const deltaTime = 1/fps;
const g = 9.8;

let w = canvas.width;
const h = canvas.height;
const r = 10;

let angel = Math.PI/4;
let start_velocity = 50;

class Bullet{

    constructor(startX,startY, startVX, startVY){
        this._x = startX;
        this._y = startY;

        this._vx = startVX*r;
        this._vy = startVY*r;
    }

    update(){
        if(this.die) return;
        this._x += this._vx*deltaTime; 
        this._y += this._vy*deltaTime;

        this._vy += g;

        if(this._x >= w){

            if(this._vx > 100000){
                
                if(!this._played){
                    canvas.style.borderRight = "none";
                    canvas.width = 10000;
                    w = canvas.width;

                    let audio = new Audio('est-probitie.mp3');
                    audio.play();
                    this._played = true;
                    document.getElementById("but").style = "display: none";
                }
            }else{

                this._vx = 0;
                this._x = w - r;

                //surprise
                let audio = new Audio('ne-probil.mp3');
                audio.play();
            }
        }


        if(this._y <= 0){
            this._vy = 0;
            this._y = 0 + r;

            //surprise
            // let audio = new Audio('ne-probil.mp3');
            // audio.play();
        }

        if(this._y >= h-r){
          
            this._vy = 0;
            this._vx = 0;
            this._y = h - r;
            this.die = true;
        }
    }

    getX(){
        return this._x;
    }
    
    getY(){
        return this._y;
    }
}

let Bullets = []


function pusk(){

    let ange = 1 * Math.PI / document.getElementById("d").value;
    let sv = document.getElementById("v").value 
 

    let bullet = new Bullet(r,h-r,sv*Math.cos(ange),-sv*Math.sin(ange));

    Bullets.push(bullet);


}


let points = []

function render(){


    ctx.clearRect(0,0,w,h);
    Bullets.forEach(el=>{
        el.update();
        ctx.beginPath();
        ctx.arc(el.getX(),el.getY(), 10, 2* Math.PI, 0);
        ctx.fill();

        points.push([el.getX(),el.getY()])
        // ctx.beginPath();

        // ctx.strokeRect(el.getX(),el.getY(),1,1)
        // ctx.stroke()
    })

    points.forEach(el=>{

        ctx.beginPath();
        ctx.strokeRect(el[0],el[1],1,1)
        ctx.stroke()
    })
    // window.requestAnimationFrame(render())
}

// render()

setInterval(()=>{
    
    render();
},1000*deltaTime)



// window.requestAnimationFrame(render())

function print(p){
    console.log(p)
}


