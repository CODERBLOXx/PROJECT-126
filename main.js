song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.position(500,200);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('poseNet is Initialized');
}

function draw(){
    image(video,0,0,600,500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2 ){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song_name").innerHTML = "Song Name:Harry Potter Theme Song";
        }
    }
}

if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(song2_status == false){
        song2.play();
        document.getElementById("song_name").innerHTML = "Song Name:Peter Pan Song"
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.nose.y;
        console.log("leftWristX = " + leftWristX + ", leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + ", rightWristY = " + rightWristY)
    }
}
