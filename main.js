m1="music.mp3";
m2="music2.mp3";

status_song="";

scoreleftWrist=0;
scorerightWrist=0;

leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet model is initialised");
}

function gotPoses(error,results){
    if(results.length>0){
    
   scoreLeftWrist=results[0].pose.keypoints[9].score;
   scoreRightWrist=results[0].pose.keypoints[10].score;
    
    leftWristx= results[0].pose.leftWrist.x;
    leftWristy= results[0].pose.leftWrist.y;
    rightWristx= results[0].pose.rightWrist.x;
    rightWristy= results[0].pose.rightWrist.y;
}
  }

function draw(){
    image(video,0,0,600,500);
    status_song1=m1.isPlaying();
    status_song2=m2.isPlaying();
    fill("#fc0303");
    stroke("#fc0303");

    if(scoreLeftWrist>0.2){
        circle(leftWristx,leftWristy,20);
        m2.stop();
        if(status_song1==false){
            m1.play();
            document.getElementById("song").innerHTML="playing Harry potter theme";
        }
    }

    if(scorerightWrist>0.2){
        circle(rightWristx,rightWristy,20);
        m2.stop();
        if(status_song2==false){
            m2.play();
            document.getElementById("song").innerHTML="playing peter pan";
        }
    }
}

function preload(){
    m1=loadSound("music.mp3");
    m2=loadSound("music2.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}