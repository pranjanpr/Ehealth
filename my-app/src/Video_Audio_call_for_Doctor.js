import React, {useState} from 'react';
import {useEffectOnce} from 'react-use';


export default function Video_Audio_call({detail_array, QB, patient_id, specialist_id, endcallfunc}) {
    const [fetched, setFetched] = useState(false);
    const [currsession, setCurrSession] = useState();
    const [calling, setCalling] = useState("");
    var session;

    const dateformatter = () => {
      var date = "";
      var today = new Date();
      if(((today.getMonth() + 1)<10)&&(today.getDate()<10))
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
      else if((today.getMonth() + 1)<10)
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
      else
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return date;
      }

    const time_formatter = () => {

        var today = new Date();
        var time = "";
        var gap1 = "";
        var gap2 = ":";
        var gap3 = ":";
        if(today.getHours()<10)
          gap1 = gap1 + "0";
        if(today.getMinutes()<10)
          gap2 = gap2 + "0";
        if(today.getSeconds()<10)
          gap3 = gap3 + "0";
          
        time = gap1 + today.getHours() + gap2 + (today.getMinutes()) + gap3 + today.getSeconds();
        return time;  

      }  

    useEffectOnce(() => {
        if(fetched === false){
          var currdate = dateformatter();
          console.log(currdate);
          var currtime = time_formatter();
          console.log(currtime);

          if((patient_id)&&(specialist_id)){
            if(currdate == detail_array[0]){
              if((currtime >= detail_array[3])&&(currtime<detail_array[4])){
                chatconnect();
                setCalling("Waiting for the patient to call...........................................................");
              }
              else if(currtime<detail_array[3]){
                setCalling("You are earlier than your alloted time, you can end the call");
              }
              else if(currtime>detail_array[4]){
                setCalling("You are late than your alloted time, kindly end the call and give the appointment again");
              }
            }
            else if(currdate < detail_array[0]){
              setCalling("You are earlier than your alloted time, kindly end the call");
            }
            else if(currdate > detail_array[0]){
              setCalling("You are late than your alloted time, kindly end the call and give the appointment again");
            }
            
        }
          console.log(patient_id, specialist_id);
          console.log(detail_array);
        }
      }, [fetched]);  


    const chatconnect = () => {
        var userCredentials = {
          userId: specialist_id,
          password: 'quickblox'
        };    
        QB.chat.connect(userCredentials, function(error, contactList) {
          if (error) {
            console.log("error in creation of CHAT");
            console.error(error);
          } else {
            console.log(contactList);
          }
        });
      }

    //When the opponent calls, this is the callback that gets executed and the session is initialized  
  QB.webrtc.onCallListener = function(currentsession, extension) {
    playAudio(1);  

    console.log("iiiiiiiiiiitttttttts exeeeeeeeeectured");
    console.log(currentsession);
    console.log(extension);

    session = currentsession;
    setCurrSession(currentsession);

    var calltypes = true;

    if(detail_array[5] == "Audio")
      calltypes = false;
   

    var mediaParams = {
      audio: true,
      video: calltypes,
      options: {
        muted: true,
        mirror: true
      },
      elemId: "localVideo"
    };
    
    currentsession.getUserMedia(mediaParams, function(err, stream) {
      if (err) {
        console.log("error in video call");
        console.error(err);
        acceptvideochat();
      } else {
        console.log("video passed");
        console.log(stream);
        acceptvideochat();
      }
    });
};  


 //Accept the call now
 const acceptvideochat = () => {
    session.accept({});
    stopAudio(1);
    setCalling("");
  }

  //Or stop it 
  const stopvideochat = () => {
    var extension = {};
    if((currsession)!=undefined){
      currsession.stop(extension);
      playAudio(0);
    }
    endcallfunc();
  }
  
  const playAudio = (which_one) => {
    var audioEl;
    if(which_one==1)
    audioEl = document.getElementById("ringtoneSignal");  
    else
    audioEl = document.getElementById("endofcallSignal");
    audioEl.play();
  }

  const stopAudio = (which_one) => {
    var audioEl;
    if(which_one==1)
    audioEl = document.getElementById("ringtoneSignal");
    else
    audioEl = document.getElementById("endofcallSignal");
    audioEl.pause();
  }

  //To see the video of opponent, this is used
  QB.webrtc.onRemoteStreamListener = function(session, userID, remoteStream) {
    // attach the remote stream to DOM element
    session.attachMediaStream("opponentVideo", remoteStream);
  };


  return (<React.Fragment>
        
    <div>
      <div>{calling}</div>
      <video id="localVideo" autoPlay playsInline></video>
      <video id="opponentVideo" autoPlay playsInline></video>
      <div>
      <audio id="ringtoneSignal" loop preload="auto">
         <source src = 'https://raw.githubusercontent.com/sajal09/rainbow-/master/ringtone.mp3' type = "audio/mp3"/>
    </audio>
      <audio id="endofcallSignal" preload="auto">
        <source src = 'https://raw.githubusercontent.com/sajal09/rainbow-/master/end_of_call.mp3' type = "audio/mp3"/>
      </audio>
      </div>
      
      <div>
        <button onClick = {stopvideochat}>End the Call</button> 
      </div>
    </div>

</React.Fragment>);

}
