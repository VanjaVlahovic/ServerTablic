import { Component, OnInit, NgModule } from '@angular/core';
import { ChatService } from './chat.service';
import { LiteralArrayExpr } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  poeni=0;
  poruka;
  igrac=0;
  ceki;
  brojac=0;
  constructor(private chat: ChatService){ }
 
  ngOnInit() {
    this.chat.messages.subscribe(msg => {
      let p=JSON.stringify(msg);
      this.brojac++;
      if(p.includes('Podela')){
        this.brojac--;
      }
      if(this.brojac%2==0){
        (document.getElementById('Igraj') as HTMLButtonElement).hidden=false;
        (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/yourTurn.jpg';
      }else{
        
        (document.getElementById('Igraj') as HTMLButtonElement).hidden=true;
      }
      console.log(msg);
      if(p.includes("Cekamo") || this.igrac==1){
        this.igrac=1;
      }else{
        this.igrac=2;
      }
      if(p.includes("Tabla")){
      var brojevi = p.substring(p.indexOf('[')+1,p.indexOf(']')).split(',');
      var moje;
      if(this.igrac==1){
        moje = p.substring(p.indexOf('X')+1,p.indexOf('Y')).split(',');
      }
      if(this.igrac==2){
        moje = p.substring(p.indexOf('Z')+1,p.indexOf('K')).split(',');
      }
      console.log(brojevi.toString()+"        "+this.igrac+"     "+moje);
      (document.getElementById('img1') as HTMLImageElement).src=this.vratiNaziv(brojevi[0]);
      (document.getElementById('img2') as HTMLImageElement).src=this.vratiNaziv(brojevi[1]);
      (document.getElementById('img3') as HTMLImageElement).src=this.vratiNaziv(brojevi[2]);
      (document.getElementById('img4') as HTMLImageElement).src=this.vratiNaziv(brojevi[3]);
      (document.getElementById('img5') as HTMLImageElement).src=this.vratiNaziv(moje[0]);
      (document.getElementById('img6') as HTMLImageElement).src=this.vratiNaziv(moje[1]);
      (document.getElementById('img7') as HTMLImageElement).src=this.vratiNaziv(moje[2]);
      (document.getElementById('img8') as HTMLImageElement).src=this.vratiNaziv(moje[3]);
      (document.getElementById('img9') as HTMLImageElement).src=this.vratiNaziv(moje[4]);
      (document.getElementById('img10') as HTMLImageElement).src=this.vratiNaziv(moje[5]);

      (document.getElementById("card1") as HTMLInputElement).value=this.vratiVrednost(brojevi[0]);
      (document.getElementById("card2") as HTMLInputElement).value=this.vratiVrednost(brojevi[1]);
      (document.getElementById("card3") as HTMLInputElement).value=this.vratiVrednost(brojevi[2]);
      (document.getElementById("card4")as HTMLInputElement).value=this.vratiVrednost(brojevi[3]);
      (document.getElementById("card5") as HTMLInputElement).value=this.vratiVrednost(moje[0]);
      (document.getElementById("card6") as HTMLInputElement).value=this.vratiVrednost(moje[1]);
      (document.getElementById("card7") as HTMLInputElement).value=this.vratiVrednost(moje[2]);
      (document.getElementById("card8") as HTMLInputElement).value=this.vratiVrednost(moje[3]);
      (document.getElementById("card9") as HTMLInputElement).value=this.vratiVrednost(moje[4]);
      (document.getElementById("card10") as HTMLInputElement).value=this.vratiVrednost(moje[5]);
          }
      if(p.includes("Info")){
        let b=p.substring(p.indexOf('[')+1,p.indexOf(']'));
        if(parseInt(b)==this.igrac){
          if(p.includes('_')){
          let pokupljene=p.substring(p.indexOf('_')+1, p.indexOf('!'));
          let pokupljeneNiz=pokupljene.split(' ');
          let naTabli=document.getElementsByName("tabla");
          for(let i=0; i<pokupljeneNiz.length; i++){
            console.log(pokupljeneNiz[i]);
            for(let j=0; j<naTabli.length; j++){
              var n=naTabli[j].id.substr(4);
              if((((document.getElementById("img"+n) as HTMLImageElement).src) as String).includes(pokupljeneNiz[i])){
                (naTabli[j] as HTMLInputElement).value="0";
                (document.getElementById("img"+n) as HTMLImageElement).src="";
              }
            }
          }
        }else{
        let izbacena = p.substring(p.indexOf('+')+1, p.indexOf('!'));
        let naTabli=document.getElementsByName("tabla");
        for(let i=0; i<naTabli.length; i++){
          if((naTabli[i] as HTMLInputElement).value=="0"){
            (naTabli[i] as HTMLInputElement).value = this.vratiVrednost(this.vratiSifru(izbacena));
            var n=naTabli[i].id.substr(4);
            (document.getElementById("img"+n) as HTMLImageElement).src=this.vratiNaziv(this.vratiSifru(izbacena));
            break;
          }
        }
      }
      } 
      }
      if(p.includes("Podela")){
        if(this.igrac==1){
          moje = p.substring(p.indexOf('X')+1,p.indexOf('Y')).split(',');
        }
        if(this.igrac==2){
          moje = p.substring(p.indexOf('Z')+1,p.indexOf('K')).split(',');
          (document.getElementById('Igraj') as HTMLButtonElement).hidden=true;
          (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/wait.png';
        }
        (document.getElementById('img5') as HTMLImageElement).src=this.vratiNaziv(moje[0]);
        (document.getElementById('img6') as HTMLImageElement).src=this.vratiNaziv(moje[1]);
        (document.getElementById('img7') as HTMLImageElement).src=this.vratiNaziv(moje[2]);
        (document.getElementById('img8') as HTMLImageElement).src=this.vratiNaziv(moje[3]);
        (document.getElementById('img9') as HTMLImageElement).src=this.vratiNaziv(moje[4]);
        (document.getElementById('img10') as HTMLImageElement).src=this.vratiNaziv(moje[5]);
        (document.getElementById("card5") as HTMLInputElement).value=this.vratiVrednost(moje[0]);
        (document.getElementById("card6") as HTMLInputElement).value=this.vratiVrednost(moje[1]);
        (document.getElementById("card7") as HTMLInputElement).value=this.vratiVrednost(moje[2]);
        (document.getElementById("card8") as HTMLInputElement).value=this.vratiVrednost(moje[3]);
        (document.getElementById("card9") as HTMLInputElement).value=this.vratiVrednost(moje[4]);
        (document.getElementById("card10") as HTMLInputElement).value=this.vratiVrednost(moje[5]);
      }
      if(p.includes("Kraj")){
        (document.getElementById('Igraj') as HTMLButtonElement).hidden=true;
        (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/wait.png';
        var checks = document.getElementsByName('tabla');
        var pokupljene="";
        for(var i=0; i<checks.length; i++){
        if((checks[i] as HTMLInputElement).value!='0'){
          var b=checks[i].id.substr(4);
          var l=(document.getElementById("img"+b) as HTMLImageElement).src;
          pokupljene=pokupljene+" "+(l as String).substring(l.indexOf('G')+2, l.lastIndexOf('.'));
          (document.getElementById("img"+b) as HTMLImageElement).src="";
          (checks[i] as HTMLInputElement).value="0";
          (checks[i] as HTMLInputElement).checked=false;
        }
      }
      pokupljene=pokupljene+"!";
      if(this.igrac==1){
        this.chat.sendMsg("{1}"+pokupljene);
      }
    }
    if(p.includes("Rezultati")){
      (document.getElementById('place') as HTMLElement).innerHTML = "";
      (document.getElementById('Igraj') as HTMLButtonElement).hidden=true;
      let pp= p.substring(p.indexOf('~')+2, p.indexOf('X'));
      let pg = p.substring(p.indexOf('X')+1, p.indexOf('Y'));
      if(p.includes("Nereseno")){
        (document.getElementById("rezultat") as HTMLElement).innerHTML="Nereseno! Moji poeni: "+pp+" Poeni protivnika: "+pg; 
        (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/winwin.jpg';
      }else{
      let pobednik = p.substring(p.indexOf('~')+1, p.indexOf('~')+2);
      if(this.igrac==parseInt(pobednik)){
        (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/winner.jpg';
        (document.getElementById("rezultat") as HTMLElement).innerHTML="Moji poeni: "+pp+" Poeni protivnika: "+pg; 
      }else{
        (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/lose.jpg';
        (document.getElementById("rezultat") as HTMLElement).innerHTML="Moji poeni: "+pg+" Poeni protivnika: "+pp; 
      }
       }
      }
    })
  }

  vratiNaziv( br){
    if(br>0 && br<14){
      if(br==1){return '../assets/PNG/AH.png'}
      if(br==2){return '../assets/PNG/2H.png'}
      if(br==3){return '../assets/PNG/3H.png'}
      if(br==4){return '../assets/PNG/4H.png'}
      if(br==5){return '../assets/PNG/5H.png'}
      if(br==6){return '../assets/PNG/6H.png'}
      if(br==7){return '../assets/PNG/7H.png'}
      if(br==8){return '../assets/PNG/8H.png'}
      if(br==9){return '../assets/PNG/9H.png'}
      if(br==10){return '../assets/PNG/10H.png'}
      if(br==11){return '../assets/PNG/JH.png'}
      if(br==12){return '../assets/PNG/QH.png'}
      if(br==13){return '../assets/PNG/KH.png'}
    }
    if(br>=14 && br<27){
      if(br==14){return '../assets/PNG/AC.png'}
      if(br==15){return '../assets/PNG/2C.png'}
      if(br==16){return '../assets/PNG/3C.png'}
      if(br==17){return '../assets/PNG/4C.png'}
      if(br==18){return '../assets/PNG/5C.png'}
      if(br==19){return '../assets/PNG/6C.png'}
      if(br==20){return '../assets/PNG/7C.png'}
      if(br==21){return '../assets/PNG/8C.png'}
      if(br==22){return '../assets/PNG/9C.png'}
      if(br==23){return '../assets/PNG/10C.png'}
      if(br==24){return '../assets/PNG/JC.png'}
      if(br==25){return '../assets/PNG/QC.png'}
      if(br==26){return '../assets/PNG/KC.png'}
    }
    if(br>=27 && br<40){
      if(br==27){return '../assets/PNG/AS.png'}
      if(br==28){return '../assets/PNG/2S.png'}
      if(br==29){return '../assets/PNG/3S.png'}
      if(br==30){return '../assets/PNG/4S.png'}
      if(br==31){return '../assets/PNG/5S.png'}
      if(br==32){return '../assets/PNG/6S.png'}
      if(br==33){return '../assets/PNG/7S.png'}
      if(br==34){return '../assets/PNG/8S.png'}
      if(br==35){return '../assets/PNG/9S.png'}
      if(br==36){return '../assets/PNG/10S.png'}
      if(br==37){return '../assets/PNG/JS.png'}
      if(br==38){return '../assets/PNG/QS.png'}
      if(br==39){return '../assets/PNG/KS.png'}
    }
    if(br>=40 && br<=52){
      if(br==40){return '../assets/PNG/AD.png'}
      if(br==41){return '../assets/PNG/2D.png'}
      if(br==42){return '../assets/PNG/3D.png'}
      if(br==43){return '../assets/PNG/4D.png'}
      if(br==44){return '../assets/PNG/5D.png'}
      if(br==45){return '../assets/PNG/6D.png'}
      if(br==46){return '../assets/PNG/7D.png'}
      if(br==47){return '../assets/PNG/8D.png'}
      if(br==48){return '../assets/PNG/9D.png'}
      if(br==49){return '../assets/PNG/10D.png'}
      if(br==50){return '../assets/PNG/JD.png'}
      if(br==51){return '../assets/PNG/QD.png'}
      if(br==52){return '../assets/PNG/KD.png'}
    }
    return '../assets/PNG/back.jpg';
  }

  vratiVrednost(br){
    if(br>0 && br<14){
      if(br==1){return "1";}
      if(br==2){return "2";}
      if(br==3){return "3";}
      if(br==4){return "4";}
      if(br==5){return "5";}
      if(br==6){return "6";}
      if(br==7){return "7";}
      if(br==8){return "8";}
      if(br==9){return "9";}
      if(br==10){return "10";}
      if(br==11){return "12";}
      if(br==12){return "13";}
      if(br==13){return "14";}
    }
    if(br>=14 && br<27){
      if(br==14){return "1";}
      if(br==15){return "2";}
      if(br==16){return "3";}
      if(br==17){return "4";}
      if(br==18){return "5";}
      if(br==19){return "6";}
      if(br==20){return "7";}
      if(br==21){return "8";}
      if(br==22){return "9";}
      if(br==23){return "10";}
      if(br==24){return "12";}
      if(br==25){return "13";}
      if(br==26){return "14";}
    }
    if(br>=27 && br<40){
      if(br==27){return "1";}
      if(br==28){return "2";}
      if(br==29){return "3";}
      if(br==30){return "4";}
      if(br==31){return "5";}
      if(br==32){return "6";}
      if(br==33){return "7";}
      if(br==34){return "8";}
      if(br==35){return "9";}
      if(br==36){return "10";}
      if(br==37){return "12";}
      if(br==38){return "13";}
      if(br==39){return "14";}
    }
    if(br>=40 && br<=52){
      if(br==40){return "1";}
      if(br==41){return "2";}
      if(br==42){return "3";}
      if(br==43){return "4";}
      if(br==44){return "5";}
      if(br==45){return "6";}
      if(br==46){return "7";}
      if(br==47){return "8";}
      if(br==48){return "9";}
      if(br==49){return "10";}
      if(br==50){return "12";}
      if(br==51){return "13";}
      if(br==52){return "14";}
    }
    return "0";

  }
 
  vratiSifru( link){
    var tip;
    var b;
    if(link.length==2){
      b=link.charAt(0);
      tip=link.charAt(1);
    }else{
      b=link.substring(0, 2);
      tip=link.charAt(2);
    }
    if(tip=="H"){
      if(b=="2") { return "2"; }
      if(b=="3") { return "3"; }
      if(b=="4") { return "4"; }
      if(b=="5") { return "5"; }
      if(b=="6") { return "6"; }
      if(b=="7") { return "7"; }
      if(b=="8") { return "8"; }
      if(b=="9") { return "9"; }
      if(b=="10") { return "10"; }
      if(b=="A") { return "1"; }
      if(b=="J") { return "11"; }
      if(b=="Q") { return "12"; }
      if(b=="K") { return "13"; }
    }
    if(tip=="C"){
      if(b=="2") { return "15"; }
      if(b=="3") { return "16"; }
      if(b=="4") { return "17"; }
      if(b=="5") { return "18"; }
      if(b=="6") { return "19"; }
      if(b=="7") { return "20"; }
      if(b=="8") { return "21"; }
      if(b=="9") { return "22"; }
      if(b=="10") { return "23"; }
      if(b=="A") { return "14"; }
      if(b=="J") { return "24"; }
      if(b=="Q") { return "25"; }
      if(b=="K") { return "26"; }
    }
    if(tip=="S"){
      if(b=="2") { return "28"; }
      if(b=="3") { return "29"; }
      if(b=="4") { return "30"; }
      if(b=="5") { return "31"; }
      if(b=="6") { return "32"; }
      if(b=="7") { return "33"; }
      if(b=="8") { return "34"; }
      if(b=="9") { return "35"; }
      if(b=="10") { return "36"; }
      if(b=="A") { return "27"; }
      if(b=="J") { return "37"; }
      if(b=="Q") { return "38"; }
      if(b=="K") { return "39"; }
    }
    if(tip=="D"){
      if(b=="2") { return "41"; }
      if(b=="3") { return "42"; }
      if(b=="4") { return "43"; }
      if(b=="5") { return "44"; }
      if(b=="6") { return "45"; }
      if(b=="7") { return "46"; }
      if(b=="8") { return "47"; }
      if(b=="9") { return "48"; }
      if(b=="10") { return "49"; }
      if(b=="A") { return "40"; }
      if(b=="J") { return "50"; }
      if(b=="Q") { return "51"; }
      if(b=="K") { return "52"; }
    }
    return 0;
  }

  VrednostStiha(link){
    var tip;
    var b;
    if(link=="10D"){
      return 2;
    }
    if(link.length==2){
      b=link.charAt(0);
      tip=link.charAt(1);
    }else{
      b=link.substring(0, 2);
      tip=link.charAt(2);
    }
    if(tip=="H"){
      if(b=="10" || b=="A"|| b=="J" || b=="Q" || b=="K") { return 1; }
    }
    if(tip=="C"){
      if(b=="2" || b=="10" || b=="A"|| b=="J" || b=="Q" || b=="K") { return 1; }
    }
    if(tip=="S"){
      if(b=="10" || b=="A"|| b=="J" || b=="Q" || b=="K") { return 1; }
    }
    if(tip=="D"){
      if( b=="A"|| b=="J" || b=="Q" || b=="K") { return 1; }
    }
    return 0;
  }

  proveraRacuna(cekiraneKarte, mojaKarta){
    var sveIste=0;
    var zbir=0;
    var zbir2=0;
    var brojKeceva=0;
    var cekirane=0;
    var vrednostMoje=parseInt((mojaKarta as HTMLInputElement).value);
    var vrednostMoje2=0;
    for(var i=0; i<cekiraneKarte.length; i++){
      if((cekiraneKarte[i] as HTMLInputElement).checked){
        cekirane++;
        zbir+=parseInt((cekiraneKarte[i] as HTMLInputElement).value);
        if((cekiraneKarte[i] as HTMLInputElement).value==(mojaKarta as HTMLInputElement).value){
          sveIste++;
        }
        if((cekiraneKarte[i] as HTMLInputElement).value=="1"){
          brojKeceva++;
        }
      }
    }
    if(brojKeceva!=0){
      zbir2=zbir+10;
    }
    if(vrednostMoje==1){
      vrednostMoje2=11;
    }
    if(zbir==vrednostMoje || zbir==vrednostMoje2 || zbir2==vrednostMoje || (sveIste==cekirane)){
      return true;
    }
    if(zbir2!=0 && vrednostMoje2!=0){
      if(zbir2==vrednostMoje2) return true;
    }
    return false;
  }

  ProveriIPosaljiOdgovor() {
    
    var checks = document.getElementsByName('tabla');
    var moje = document.getElementsByName('moj');
    var cekiranih=0;
    var naTabli=0;
    var zbir=0;
    for(var i=0; i<checks.length; i++){
      if((checks[i] as HTMLInputElement).checked){
        cekiranih++;
      }
      if((checks[i] as HTMLInputElement).value!="0"){
        naTabli++;
      }
    }
    var moja;
    var link;
    var nazivMoje;
    for(var i=0; i<moje.length; i++){
      if((moje[i] as HTMLInputElement).checked)
      {
        moja=moje[i];
        var b=moje[i].id.substr(4);
        link=(document.getElementById("img"+b) as HTMLImageElement).src;
        nazivMoje=link.substring(link.indexOf('G')+2, (link as String).lastIndexOf('.'));
      }
    }
    if(cekiranih==0){
      for(var i=0; i<checks.length; i++){
        if((checks[i] as HTMLInputElement).value=="0"){
          (checks[i] as HTMLInputElement).value=(moja as HTMLInputElement).value;
          var b=checks[i].id.substr(4);
          (document.getElementById("img"+b) as HTMLImageElement).src=link;
          var s = link.substring(link.indexOf('G')+2, (link as String).lastIndexOf('.'));
          this.chat.sendMsg("{"+this.igrac+"} +"+s+"!");
          (moja as HTMLInputElement).value="0";
          (moja as HTMLInputElement).checked=false;
          var m=(moja as HTMLInputElement).id.substr(4);
          (document.getElementById("img"+m) as HTMLImageElement).src="";
          (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/wait.png';
          break;
        }
      }
    }else{
    if(this.proveraRacuna(checks, moja)){
      var pokupljene="";
      for(var i=0; i<checks.length; i++){
        if((checks[i] as HTMLInputElement).checked){
          var b=checks[i].id.substr(4);
          var l=(document.getElementById("img"+b) as HTMLImageElement).src;
          var d=(l as String).substring(l.indexOf('G')+2, l.lastIndexOf('.'));
          pokupljene=pokupljene+" "+d;
          zbir+=this.VrednostStiha(d);
          (document.getElementById("img"+b) as HTMLImageElement).src="";
          (checks[i] as HTMLInputElement).value="0";
          (checks[i] as HTMLInputElement).checked=false;
        }
      }
      pokupljene=pokupljene+"!";
      for(var i=0; i<moje.length; i++){
        if((moje[i] as HTMLInputElement).checked)
        {
          var b=moje[i].id.substr(4);
          link=(document.getElementById("img"+b) as HTMLImageElement).src;
          var d=(link as String).substring(l.indexOf('G')+2, l.lastIndexOf('.'));
          zbir+=this.VrednostStiha(d);
          (document.getElementById("img"+b) as HTMLImageElement).src="";
          (moje[i] as HTMLInputElement).value="0";
          (moje[i] as HTMLInputElement).checked=false;
        }
      }
      if(naTabli==cekiranih){
        this.chat.sendMsg("{"+this.igrac+"}-"+pokupljene+"("+nazivMoje+")"+"~");
        zbir++;
      }else{
        this.chat.sendMsg("{"+this.igrac+"}-"+pokupljene+"("+nazivMoje+")");
      }
      (document.getElementById('Igraj') as HTMLButtonElement).hidden=true;
      (document.getElementById('KoIgraS') as HTMLImageElement).src='../assets/PNG/wait.png';
      this.poeni+=zbir;
      (document.getElementById('place') as HTMLElement).innerHTML = this.poeni.toString();

    }else{
      alert("Molimo Vas, ispravno saberite :)");
    }
  }
    
  }
  
}