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
    }else{
        artsamples.style.display="none";
    }
    artclick=!artclick;
    console.log("artclick: " + artclick);
}