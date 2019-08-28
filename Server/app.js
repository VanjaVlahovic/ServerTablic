let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let broj=0;
var karte = new Array(52);
let brojPoteza=0;
let zbir1=0;
let zbir2=0;
let brojKarata1=0;
let brojKarata2=0;
let poslednji=1;

function Pokretanje(){
  brojPoteza=0;
  zbir1=0;
  zbir2=0;
  brojKarata1=0;
  brojKarata2=0;
  for(var i=0; i<52; i++){
    karte[i]=i+1;
  }
  var tabla=RandomTable();
  var prvom = RandomPodela();
  var drugom = RandomPodela();
  io.emit("message", { type: "new-message", text: "Tabla: ["+tabla.toString()+"] X"+prvom+"Y Z"+drugom+"K"});
}
function RandomTable(){
var tabla = new Array(4);
var karta;
var ima=false;
for( var i=0; i<4; i++){
  while(!ima){
    karta=getRndInteger(1,52);
    if(karte.includes(karta))
    ima=true;
  }
  ima=false;
  tabla[i]=karta;
  karte[karta-1]=0;
}
return tabla;
}
function RandomPodela(){
  var podela = new Array(6);
  var karta;
  var ima=false;
  for( var i=0; i<6; i++){
    while(!ima){
      karta=getRndInteger(1,52);
      if(karte.includes(karta)){
        ima=true;
      }
    }
    ima=false;
    podela[i]=karta;
    karte[karta-1]=0;
  }
return podela;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function BodovanjePrvog(pokupljene, kartom, t){
  let nizPokupljnih=pokupljene.split(' ');
  brojKarata1+=nizPokupljnih.length+1;
  for(let i=0; i<nizPokupljnih.length; i++){
    if(nizPokupljnih[i].includes('10') ||
      nizPokupljnih[i].includes('A') ||
      nizPokupljnih[i].includes('J') ||
      nizPokupljnih[i].includes('Q') ||
      nizPokupljnih[i].includes('K') ||
      nizPokupljnih[i].includes('2C')){
        zbir1++;
      }
      if(nizPokupljnih.includes('10D')){
        zbir1++;
      }
  }
  if (t ){
    zbir1++;
  }
  if(kartom!=null){
  if(kartom.includes('10')||kartom.includes('A')||kartom.includes('J')||kartom.includes('Q')||kartom.includes('K')||kartom.includes('2C')){
    zbir1++;
  }
  if(kartom.includes('10D')){
    zbir1++;
  }
}
}
function BodovanjeDrugog(pokupljene, kartom, t){
  let nizPokupljnih=pokupljene.split(' ');
  brojKarata2+=nizPokupljnih.length+1;
  for(let i=0; i<nizPokupljnih.length; i++){
    if(nizPokupljnih[i].includes('10') ||
      nizPokupljnih[i].includes('A') ||
      nizPokupljnih[i].includes('J') ||
      nizPokupljnih[i].includes('Q') ||
      nizPokupljnih[i].includes('K') ||
      nizPokupljnih[i].includes('2C')){
        zbir2++;
      }
      if(nizPokupljnih.includes('10D')){
        zbir2++;
      }
  }
  if (t ){
    zbir2++;
  }
  if(kartom!=null){
  if(kartom.includes('10')||kartom.includes('A')||kartom.includes('J')||kartom.includes('Q')||kartom.includes('K')||kartom.includes('2C')){
    zbir2++;
  }
  if(kartom.includes('10D')){
    zbir2++;
  }
}
}
function KonacniRezultati(){
  if(zbir1>zbir2){
    return 1;
  }
  if(zbir1<zbir2){
    return 2;
  }
  if(zbir1==zbir2){
    return 0;
  }
  return 0;
}
io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");
  broj++;
  if(broj==1) {
    io.emit("message", { type: "new-message", text: "Cekamo drugog igraca..."});
  }
  if(broj==2){
    Pokretanje();
  }
  
  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
    broj--;
  });
  

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    brojPoteza++;
    poruka = JSON.stringify(message);
    let b=poruka.substring(poruka.indexOf('{')+1,poruka.indexOf('}'));
    if(poruka.includes('-')){
      let pokupljene = poruka.substring(poruka.indexOf('-')+2, poruka.indexOf('!')+1);
      let kartaKojaKupi=poruka.substring(poruka.indexOf('(')+1, poruka.indexOf(')'));
      let bool=false;
      if(poruka.includes('~')){
        bool=true;
      }
        if(b=="1"){
          io.emit("message", {type: "new-message", text: "Info: [2] _"+pokupljene});
          BodovanjePrvog(pokupljene, kartaKojaKupi, bool);
          poeslednji=1;
          console.log("Rezultat: "+zbir1+" "+brojKarata1);
        }else{
          io.emit("message", {type: "new-message", text: "Info: [1] _"+pokupljene});
          BodovanjeDrugog(pokupljene, kartaKojaKupi, bool);
          poslednji=2;
          console.log("Rezultat: "+zbir2+" "+brojKarata2);
        }
    }
    if(poruka.includes('+')){
      let izbacena = poruka.substring(poruka.indexOf('+')+1, poruka.indexOf('!')+1);
      if(b=="1"){
        io.emit("message", {type: "new-message", text: "Info: [2] +"+izbacena+"!"});
      }else{
        io.emit("message", {type: "new-message", text: "Info: [1] +"+izbacena+"!"});
      }
    }
    if(brojPoteza==12 || brojPoteza==24 || brojPoteza==36 ){
      var prvom = RandomPodela();
      var drugom = RandomPodela();
      io.emit("message", { type: "new-message", text: "Podela: X"+prvom+"Y Z"+drugom+"K"});
    }
    if(brojPoteza==48){
      console.log(poslednji);
      io.emit("message", { type: "new-message", text: "Kraj"});
    }
    if(brojPoteza==49){
      let pokupljene = poruka.substring(poruka.indexOf('}')+1, poruka.indexOf('!')+1);
      if(poslednji==1){
          BodovanjePrvog(pokupljene, null, false);
          console.log("Rezultat prvog: "+zbir1+" "+brojKarata1);
        }else{
          BodovanjeDrugog(pokupljene, null, false);
          console.log("Rezultat drugog: "+zbir2+" "+brojKarata2);
        }
        if(KonacniRezultati()==0){
          io.emit("message", { type: "new-message", text: "Rezultati: Nereseno ~ "+zbir1+"X"+zbir2+"Y"});
        }else{
          if(KonacniRezultati()==1){ 
           console.log(zbir1, zbir2);
          io.emit("message", { type: "new-message", text: "Rezultati: Prvi je pobednik ~1"+zbir1+"X"+zbir2+"Y"});
          }else{
            console.log(zbir1, zbir2);
            io.emit("message", { type: "new-message", text: "Rezultati: Drugi je pobednik ~2"+zbir2+"X"+zbir1+"Y"});
          }
      }
    }
  });
});

// Initialize our websocket server on port 5000
http.listen(5000, () => {
  console.log("started on port 5000");
});