const plucky = new Tone.PluckSynth()
const reverb = new Tone.Reverb(5);
const pingPong = new Tone.PingPongDelay("4n", 0.2)
let connect = false;


let Rslider;

let notes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() {
  createCanvas(400, 400);
  reverb.toDestination();
  pingPong.toDestination();
  plucky.toDestination();

  plucky.connect(reverb);  

  button1 = createButton("Ping Pong Effect Toggle");
  button1.position(200, 300);
  button1.mousePressed(() =>{
    if(connect){
      plucky.disconnect(pingPong)
      console.log("dis");
      connect = false;
    }else{
      plucky.connect(pingPong)
      console.log("con");
      connect = true;
    }
  });



  Rslider = createSlider(0.001, 10.001, 5, 0.5);
  Rslider.position(10, 300);
  Rslider.style('width', '80px');
  Rslider.mouseReleased( () => {
    reverb.decay = Rslider.value();
  })
}

function draw() {
  background(220);
  text("Change the Reverb", 10, 330);
  text(`Reverb = ${Rslider.value()} second(s)`, 10, 350);

  text(
  "a: C4\ns: D4\nd: E4\nf: F4\ng: G4\nh: A4\nj: B4\nk: C5", 180, 30);

  if(connect){
    text("On", 260, 330);
  }else{
    text("Off", 260, 330);
  }
}

function keyPressed() {
  let whatNote = notes[key]
  console.log(whatNote);
  plucky.triggerAttack(whatNote);
} 