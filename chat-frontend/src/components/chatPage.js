import React, { useEffect, useState } from 'react'
import cssClasses from './chat.module.css'
import axios from 'axios'
import {useLocation,useHistory} from 'react-router-dom';
import * as signalR from "@microsoft/signalr";
import {
    HubConnectionBuilder,
    HubConnectionState,
    HubConnection,
    } from '@aspnet/signalr';
    
import { createStore } from "redux";
import Box from '@material-ui/core/Box';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SendIcon from '@material-ui/icons/Send';
import { lightBlue, blueGrey } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  }));

  const BlueColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(lightBlue[500]),
      backgroundColor: lightBlue[500],
      '&:hover': {
        backgroundColor: lightBlue[700],
      },
    },
  }))(Button);

  const GreyColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blueGrey[500]),
      backgroundColor: blueGrey[500],
      '&:hover': {
        backgroundColor: blueGrey[700],
      },
    },
  }))(Button);

function ChatPage(){

    const [state,setState] = useState({
        friendList:[],
        UnknownList:[],
        
    });
    const [Newmessages,setMessagesState] = useState([]);
    const [Oldmessages,setOldMessagesState] = useState([]);
    var [printNewMag, setPrintNewMsg] = useState(false); 
    
    const classes = useStyles();

    // const request1 = {
    //     FriendOneId:0,
    //     FriendOneName:"",
    //     FriendTwoId:0,
    //     FriendTwoName:""
    // };

    // //Reducer
    // function ReducerOfUpdate(state=request1, action){
    //     if(action.type){
    //         return{
    //             ...state,
    //             FriendOneId : state.FriendOneId,
    //             FriendOneName : state.FriendOneName,
    //             FriendTwoId : state.FriendTwoId,
    //             FriendTwoName : state.FriendTwoName
    //         }
    //     }
    //     return state;
    // }

    // const store = createStore(ReducerOfUpdate);
    // store.subscribe(() => console.log(store.getState()));
    
    const [request1, setUpdateRequest] = useState({
        FriendOneId:0,
        FriendOneName:"",
        FriendTwoId:0,
        FriendTwoName:""
    });

    const [ connection, setConnection ] = useState(null);
    const [isHubConnected, setHubConnection] = useState(false);
    const location = useLocation();
    const history = useHistory();
    const baseUrl = "http://localhost:50860/api/";
    const [isChat, setShowChat] = useState(false);

    const SaveNewMessages= () =>{
        if(Newmessages != null && Newmessages.length > 0 ){
            //state.Oldmessages = {...state.Oldmessages,...Newmessages};
            axios.post(baseUrl+'Chat/SaveMessages',Newmessages)
            .then((res) => {
                if(res.data == true){
                    setOldMessagesState([]);
                    setMessagesState([]);

                    console.log("Message Saved Successfully!");
                }
            })
            .catch((err) => {
                console.log(err + "Error in SM!")
            });
           
        }
    }
     const  LoadChat=(item)=>{
        debugger
        console.log(Newmessages);
       
        //state.Newmessages = [];
        setShowChat(true);
        // var FriendTwoId = item.id;
        // var FriendTwoName = item.username;.

        var list = document.getElementById("messagesList");
        // If the <ul> element has any child nodes, remove its first child node
        while(list != null && list.hasChildNodes()) {
            list.removeChild(list.childNodes[0]);
        }
        request1.FriendOneId = data1.FriendOneId;
        request1.FriendOneName = data1.FriendOneName;
        request1.FriendTwoId = item.id;
        request1.FriendTwoName = item.username;

       
        // var abc = {
        //     FriendOneId:data1.FriendOneId,
        //     FriendOneName = data1.FriendOneName,
        //     FriendTwoId = item.id,
        //     FriendTwoName = item.username;
        // }
        // request1=[...abc]
    
        //  setUpdateRequest({
        //     ...request1,
        //     FriendOneId: data1.FriendOneId,
        //     FriendOneName : data1.FriendOneName,
        //     FriendTwoId : item.id,
        //     FriendTwoName : item.username
        // });
    
       
        var data = {
            SenderId : request1.FriendOneId,
            ReceiverId : request1.FriendTwoId,
        }
        //retreive msgs
        axios.post(baseUrl+"Chat/GetMessages",data)
        .then((res) => {
            if(res.data){
                debugger
                setOldMessagesState(res.data);
                res.data.map((item) => {
                    var li = document.createElement("li");
                      debugger
                      li.textContent = item.messagebody;
                      document.getElementById("messagesList").appendChild(li);
                });

            }
        })
        .catch((err) => {
            console.log("Error in getMessage")
        });
        

    }

    // hubConnection.on("ReceiveMessage", function(message){
    //     var li = document.createElement("li");
    //     li.textContent = message;
    //     document.getElementById("messagesList").appendChild(li);
        
    //     state.messages.push(message);
    //     console.log(state.messages);
    // })

    function sendMessageToServer(){
        var message = document.getElementById("messageInput").value;

        var data = {
            message:message,
            UserId:request1.FriendOneId,
            FriendId:request1.FriendTwoId
        };

        var sendMsgData = {
                
            SenderId : request1.FriendOneId ,
            SenderName : request1.FriendOneName ,
            ReceiverId : request1.FriendTwoId ,
            ReceiverName :  request1.FriendTwoName,
            Messagebody : data.UserId == request1.FriendOneId ? request1.FriendOneName + " SAYS : "+ data.message : ((data.UserId == request1.FriendTwoId) ? request1.FriendTwoName + " SAYS : "+ data.message : "")

        }

        axios.post(baseUrl+'Chat/SaveMessages',sendMsgData)
            .then((res) => {
                if(res.data == true){
                    console.log("Message Saved Successfully!");
                }
            })
            .catch((err) => {
                console.log(err + "Error in SM!")
            });
           

        if(connection.state == HubConnectionState.Connected){

            connection.invoke("SendMessage",data)
            .catch((error) => {
            console.log("Error in Invoke : "+ error);
            });

        }
        // hubConnection.stop();
    }
    
    const getList = () =>{
        axios.get(baseUrl+'User/getAllUsers')
        .then((response) => {
            setState({
                ...state,
                UnknownList:response.data});
        })
        .catch((error) => {
            alert("Something went Wrong!")
        });
    }

    var data1 = {
        
        FriendOneId:location.state.data.id,
        FriendOneName:location.state.data.username,
    
        // FriendOneId:5,
        // FriendOneName:"Hello",
    
    };
    
    async function getData(){
        var response = await axios.post(baseUrl+'Friend/GetFriends',data1);
        let data = await response.data;
        if(data != undefined){
        setState({
            ...state,
            UnknownList: data.unknownList,
            friendList: data.friendList
        });

        }
    }

    useEffect(() => {
        getData();
        console.log("useEffect")
        if(isHubConnected == false){
            //Create connection
            var hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:50860/chat')
            .withAutomaticReconnect()
            .build();
    
            setConnection(hubConnection);
            setHubConnection(true);
        }

        if(connection){
            //Start Connection
          try{
              connection.start().then((res)=>{
              console.log("Connected successsfully")
              //Receive msg from server
              connection.on("ReceiveMessage", function(data){
                  debugger
                   if((data.UserId == request1.FriendTwoId && data.FriendId == request1.FriendOneId) 
                   || (data.UserId == request1.FriendOneId && data.FriendId == request1.FriendTwoId)){
                      var li = document.createElement("li");
                      debugger
                      li.textContent =  data.UserId == request1.FriendOneId ? request1.FriendOneName  + " SAYS : "+ data.message : ((data.UserId == request1.FriendTwoId) ? request1.FriendTwoName + " SAYS : "+ data.message : "");
                      document.getElementById("messagesList").appendChild(li);
                      
                      let data1 = {
                          
                          SenderId : request1.FriendOneId ,
                          SenderName : request1.FriendOneName ,
                          ReceiverId : request1.FriendTwoId ,
                          ReceiverName :  request1.FriendTwoName,
                          Messagebody : data.UserId == request1.FriendOneId ? request1.FriendOneName + " SAYS : "+ data.message : ((data.UserId == request1.FriendTwoId) ? request1.FriendTwoName + " SAYS : "+ data.message : "")
                      };
                      
                      if(data1.Messagebody != ""){
                          let Messages = Newmessages;
                          Messages.push(data1);
                          setMessagesState(Messages);
                          console.log(Newmessages);
                      }
                      
                   }
              });
          });
          
          }catch(err){
          console.log("start error: "+err);
          }
      }

    },[connection]);

    function onAddAsFriendClick(item){
        var FriendTwoId = item.id;
        request1['FriendTwoId'] = FriendTwoId;
        request1.FriendOneId = data1.FriendOneId;
        axios.post(baseUrl+'Friend/AddAsFriend',request1)
        .then((response) => {
            if(response.data == true){
                swal("Friend Added Successfully!", "Click OK to Continue", "success");
                getData();
            }
            else{
                swal("Friend Not Added!", "Click OK to Continue!", "error");
            }
        })
        .catch((error) => { 
            console.log(error);
            swal("Something went wrong!", "Click OK to Continue!", "error");

        })
    }

    function Logout(){
        SaveNewMessages();
        connection.stop();
        swal("Logged Out Successfully!", "Click OK to Continue", "success");

        history.push({
            pathname: "/"
        });
    }

    function printNewMessages(){
        return Newmessages.map((item) => {
            <li>{item.MessageText} </li>
        }) 
    }
    function printOldMessages(){
        return(
        Oldmessages.length > 0 ? 
        <ul>
        {
        Oldmessages.map((item,i) => {
            return <li key={i}>{item.MessageText} </li>
        })
        }
        </ul>
        
        : null
        )
    }
    
    return(
        // <div>
        // <div className={cssClasses.container}>
        //     <div className={cssClasses.left}>
        //         {/* <button className={cssClasses.Logoutbutton} onClick={()=>Logout()}> Logout </button> */}
        //         <Button variant="contained" color="secondary"  onClick={()=>Logout()}>
        //             Logout
        //         </Button>
        //        <h4>{data1.FriendOneName} IS LOGGED IN!</h4>
        //         <h2>FriendList</h2>
        //         <div>
        //         {
        //             state.friendList!=null && state.friendList != undefined?
                    
        //             <ul>{
                    
        //                 state.friendList.map((item,index) => {
        //                 return <li key={index}>{item.username}
        //                 {/* <button className={cssClasses.Addbutton} onClick={()=>LoadChat(item)}>Chat</button> */}
        //                 <Button variant="contained" color="primary" onClick={()=>LoadChat(item)}>
        //             Chat
        //         </Button>
        //                 </li>
        //             })
        //             }
        //             </ul>
        //             : null
        //         }
        //         <h2>UnknownList</h2>

        //         {
        //             state.UnknownList != null && state.UnknownList != undefined ?
        //            <ul>
        //             {
        //                  state.UnknownList.map((item,i) =>{ 
        //                     return <li key={i}>{item.username}
        //                     {/* <button className={cssClasses.Addbutton} onClick={()=> onAddAsFriendClick(item)}>Add as Friend</button> */}
        //                     <Button variant="contained" color="primary" onClick={()=> onAddAsFriendClick(item)}>
        //                     Add as Friend <AddBoxIcon /> 
        //                     </Button>
        //                     </li>
        //                 })
        //            }
        //            </ul>
        //             : []
        //         }
        //         </div>
        //     </div>

        //     <div className={cssClasses.middle}>
                                   
        //                 {
        //                     isChat ?
        //                         <div>
        //                                 <div className="row">
        //                                 <div className="col-2">Message</div>
        //                                 {/* <div className="col-4"><input type="text" id="messageInput" /></div> */}
        //                                 <TextField className="col-4" id="messageInput" label="Enter Your Message Here!" type="text" variant="filled" />

        //                                     </div>
        //                             <div className="row">&nbsp;</div>
        //                             <div className="row">
        //                                 <div className="col-6">
        //                                     {/* <input className={cssClasses.Sendbutton} type="button" id="sendButton" value="Send Message" onClick={()=> sendMessageToServer()}/> */}
        //                                     {/* <Button type="button" id="sendButton" variant="contained" color="primary" onClick={()=> sendMessageToServer()}>
        //                                     Send Message
        //                                      </Button> */}
        //                                      <Button variant="contained" color="primary" className={classes.button} onClick={()=> sendMessageToServer()}>
        //                                      Send Message <SendIcon/> 
        //                                     </Button>
        //                                 </div>
        //                             </div>
        //                             <div className="row">
        //                             <div className="col-12">
        //                                 <hr />
        //                             </div>
        //                         </div>
        //                         <div className="row">
        //                             <div className="col-6">
        //                                 <ul id="messagesList"></ul>
        //                             </div>
        //                         </div>
        //                         </div>
        //                     : null
        //                 }
                        
        //                 {/* {Newmessages != null ?  
                        
        //                 <ul>{
        //                     printNewMessages()
        //                 }
        //                 </ul>
        //                     :null
        //                 } */}

        //                 {/* {printNewMessages()
        //                 } */}
                    
               
        //     </div>
        // </div>

<div style={{ width: '100%'}}>
<Box>
    <Box display="flex" flexDirection="row" justifyContent="center" >
        <Box width="70%" border="3px solid rgb(55, 88, 87)">
        <h1>Welcome to Messenger</h1>
        <h4>{data1.FriendOneName} IS LOGGED IN!</h4>
        </Box>

    </Box>

    <Box display="flex" flexDirection="row" justifyContent="center">
        <Box width="20%" border="3px solid rgb(87, 88, 87)" bgcolor="lightgray">
        <br/> 
        <Button style={{width:'90%', height:'40px'}} variant="contained" color="secondary"  onClick={()=>Logout()}>
                    Logout
                </Button>
               
                <h2>Friend List</h2>
                <div>

                {
                    state.friendList!=null && state.friendList != undefined?
                    
                    <ul>{
                    
                        state.friendList.map((item,index) => {
                        return <li key={index} >
                        {/* <button className={cssClasses.Addbutton} onClick={()=>LoadChat(item)}>Chat</button> */}
                        <BlueColorButton variant="contained" color="primary" onClick={()=>LoadChat(item)} style={{width:'150px', height:'40px'}}>
                        <ChatIcon /> {"   " + item.username} 
                </BlueColorButton>
                <br/>
                <br/> 
                 
                        </li>
                        
                    })
                    }
                    </ul>
                    : null
                }
                <h2>Add As Friends</h2>

                {
                    state.UnknownList != null && state.UnknownList != undefined ?
                   <ul list-style-type = 'none'>
                    {
                         state.UnknownList.map((item,i) =>{ 
                            return <li key={i}> 
                       
                            
                            {/* <button className={cssClasses.Addbutton} onClick={()=> onAddAsFriendClick(item)}>Add as Friend</button> */}
                            <GreyColorButton variant="contained" color="primary" onClick={()=> onAddAsFriendClick(item)} style={{width:'150px', height:'40px'}}>
                            <Avatar variant="rounded" className={classes.small}>{item.username[0]}</Avatar>{"   "+item.username}
                            </GreyColorButton>
                            <br/> 
                            <br/>
                            </li>
                            
                        })
                   }
                   </ul>
                    : []
                }
                </div>
        </Box>

        <Box width="50%" >
        {
                            isChat ?
                                <div>
                                        <div className="row">
                                        <br/>
                                        {/* <div className="col-4"><input type="text" id="messageInput" /></div> */}
                                        <TextField className="col-4" id="messageInput" label="Enter Your Message Here!" type="text" variant="filled" fullWidth/>

                                            </div>
                                    <div className="row">&nbsp;</div>
                                    <div className="row">
                                        <div className="col-6">
                                            {/* <input className={cssClasses.Sendbutton} type="button" id="sendButton" value="Send Message" onClick={()=> sendMessageToServer()}/> */}
                                            {/* <Button type="button" id="sendButton" variant="contained" color="primary" onClick={()=> sendMessageToServer()}>
                                            Send Message
                                             </Button> */}
                                             <Button variant="contained" color="primary" className={classes.button} onClick={()=> sendMessageToServer()}>
                                             Send Message  <SendIcon/> 
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-12">
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <ul id="messagesList" variant="filled"></ul>
                                    </div>
                                </div>
                                </div>
                            : null
                        }
                        
                        {/* {Newmessages != null ?  
                        
                        <ul>{
                            printNewMessages()
                        }
                        </ul>
                            :null
                        } */}

                        {/* {printNewMessages()
                        } */}
        </Box>
    </Box>

    <Box display="flex" flexDirection="row" justifyContent="center">
    <Box width="70%" >
        <p>Copyright © 2020</p>
    </Box>
    </Box>
</Box>

</div>
// </div>
    )
}

export default ChatPage;