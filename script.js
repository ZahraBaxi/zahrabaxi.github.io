//ART SECTION
console.log("reading js");
var artbutton=document.querySelector("#artbutton");
//console.log(artbutton);
var artsamples=document.querySelector("#artsamples");
var artclick=false;

artbutton.addEventListener("click", showHideArt);

function showHideArt(){
    //console.log("showingOrHidingArt");
    if(!artclick){
        artsamples.style.display="inline";
        artsamples.style.opacity="1";
    }else{
        artsamples.style.display="none";
    }
    artclick=!artclick;
    console.log("artclick: " + artclick);
}

//PHOTO SECTION
console.log("reading js");
var photobutton=document.querySelector("#photobutton");
//console.log(photobutton);
var photosamples=document.querySelector("#photosamples");
var photoclick=false;

photobutton.addEventListener("click", showHidePhoto);

function showHidePhoto(){
    //console.log("showingOrHidingPhoto");
    if(!photoclick){
        photosamples.style.display="inline";
    }else{
        photosamples.style.display="none";
    }
    photoclick=!photoclick;
    console.log("photoclick: " + photoclick);
}

//DIGITAL ART
console.log("reading js");
var digitalbutton=document.querySelector("#digitalbutton");
//console.log(digitalbutton);
var digitalsamples=document.querySelector("#digitalsamples");
var digitalclick=false;

digitalbutton.addEventListener("click", showHideDigital);

function showHideDigital(){
    //console.log("showingOrHidingDigital");
    if(!digitalclick){
        digitalsamples.style.display="inline";
    }else{
        digitalsamples.style.display="none";
    }
    digitalclick=!digitalclick;
    console.log("digitalclick: " + digitalclick);
}

//PAPER CUTOUTS SECTION
console.log("reading js");
var paperbutton=document.querySelector("#paperbutton");
//console.log(paperbutton);
var papersamples=document.querySelector("#papersamples");
var paperclick=false;

paperbutton.addEventListener("click", showHidePaper);

function showHidePaper(){
    //console.log("showingOrHidingPaper");
    if(!paperclick){
        papersamples.style.display="inline";
    }else{
        papersamples.style.display="none";
    }
    paperclick=!paperclick;
    console.log("paperclick: " + paperclick);
}
