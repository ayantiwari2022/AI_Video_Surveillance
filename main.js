video="";
Status="";
objects=[];
function preload(){
    video=createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("modelLoaded");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results){
if (error){
    console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
    image(video, 0,0,480,380);
    if(Status!=""){
        objectDetector.detect(video,gotResult);
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: objects detected";
            document.getElementById("noofobjects").innerHTML="Number of objects detected are: "+objects.length;
            fill("#035efc");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#035efc");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}