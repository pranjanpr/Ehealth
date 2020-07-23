import React, {useState} from 'react';
import {useEffectOnce} from 'react-use';


export default function Video_Audio_call({detail_array, QB, patient_id, specialist_id, endcallfunc}) {
    
  var session;

  
    const [fetched, setFetched] = useState(false);
    const [calling, setCalling] = useState("");
    const [currsession, setCurrSession] = useState("");
    
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
                playAudio(1);
                chatconnect();
                setCalling("Calling................................................")
              }
              else if(currtime<detail_array[3]){
                setCalling("You are earlier than your alloted time, kindly end the call");
              }
              else if(currtime>detail_array[4]){
                setCalling("You are late than your alloted time, kindly end the call and take the appointment again");
              }
            }
            else if(currdate < detail_array[0]){
              setCalling("You are earlier than your alloted time, kindly end the call");
            }
            else if(currdate > detail_array[0]){
              setCalling("You are late than your alloted time, kindly end the call and take the appointment again");
            }
        }
        else{
          setCalling("Technical glitch, check your internet connection, end the call and retry again");
        }
          console.log(patient_id, specialist_id);
          console.log(detail_array);
        }
      }, [fetched]);  


    const chatconnect = () => {
      

        var userCredentials = {
          userId: patient_id,
          password: 'quickblox'
        };
        
        QB.chat.connect(userCredentials, function(error, contactList) {
          if (error) {
            console.log("error in creation of CHAT")
            console.error(error)
          } else {
            console.log(contactList)
            videoconnect();
          }
        });
    
      }

      const videoconnect = () => {

        var calleesIds = [specialist_id];
        console.log(calleesIds[0]);
        var sessionType;
        var calltypes = true;
        if(detail_array[5] == "Audio"){
          sessionType = QB.webrtc.CallType.AUDIO;
          calltypes = false;
        }
        else
          sessionType = QB.webrtc.CallType.VIDEO;   // AUDIO is also possible
        
        var additionalOptions = {};
    
        session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);

        setCurrSession(session);
        console.log(currsession);

        var mediaParams = {
        audio: true,
        video: calltypes,
        options: {
        muted: true,
        mirror: true
      },
      elemId: "localVideo"
    };
    
    console.log(session);
    
    session.getUserMedia(mediaParams, function(err, stream) {
      if (err) {
        console.log("error in video call")
        console.error(err)
      } else {
        console.log("video passed")
        console.log(stream);
        
        videochat();
      }
    });
    setCurrSession(session);
    console.log(currsession);
    console.log(session);

  }

      
  const videochat = () => {
        setCurrSession(session);
        console.log(currsession);
        console.log(session);
        var extension = {};
        session.call(extension, function(error) {
          if(error){
            console.log("Error is occuring here");
            console.error(error);
          }
          else{
            setCalling("");
            setFetched(true);
          }
        
        });
      }
       //Ok the opponent has accepted the call
    QB.webrtc.onAcceptCallListener = function(session, userId, extension) {
      console.log("Ok the opponent has accepted the call");
      stopAudio(1);
    };
     
    //Ok the opponent has rejected the call
    QB.webrtc.onRejectCallListener = function(session, userId, extension) {
      console.log("Ok the opponent has rejected the call");
      stopAudio(1);
      playAudio(0);
      stopvideochat();
    };
    
    //Ok the video call by opponent has been stopped
    QB.webrtc.onStopCallListener = function(session, userId, extension) {
      console.log("Ok the video call by opponent has been stopped");
      stopAudio(1);
      playAudio(0);
      stopvideochat();
    };

    //Ok the opponent is not answering the phone
    QB.webrtc.onUserNotAnswerListener = function(session, userId) {
      console.log("Ok the opponent is not answering the phone");
      stopAudio(1);
      playAudio(0);
      stopvideochat();
    };

    QB.webrtc.onRemoteStreamListener = function(session, userID, remoteStream) {
      // attach the remote stream to DOM element
      session.attachMediaStream("opponentVideo", remoteStream);
    };


    const stopvideochat = () => {
      console.log(session);
      console.log(currsession);
      if(((currsession)!=undefined)||(currsession!="")){
        currsession.reject({});
        playAudio(0);
      }  
      endcallfunc();
    }
    
    const playAudio = (which_one) => {
      var audioEl;
      if(which_one==1)
      audioEl = document.getElementById("callingSignal");  
      else
      audioEl = document.getElementById("endofcallSignal");
      
      audioEl.play();
    }

    const stopAudio = (which_one) => {
      var audioEl;
      if(which_one==1)
      audioEl = document.getElementById("callingSignal");
      else
      audioEl = document.getElementById("endofcallSignal");
      
      audioEl.pause();
    }
  
  
    

    

    

    return (<React.Fragment>
        
        <div>
          <div>{calling}</div>
          <video id="localVideo" autoPlay playsInline></video>
          <video id="opponentVideo" autoPlay playsInline></video>
          <div>
          <audio id="callingSignal" loop preload="auto">
            <source src = 'https://raw.githubusercontent.com/sajal09/rainbow-/master/calling.mp3' type = "audio/mp3"/>
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