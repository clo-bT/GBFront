import OpenViduSession from 'openvidu-react';
import axios from 'axios';

const Facechat= () =>{
    function handlerJoinSessionEvent(event) {
        // Do something
    }
    
    function handlerLeaveSessionEvent(event) {
        // Do something
    }
    
    function handlerErrorEvent(event) {
        // Do something
    }
    return(
        <div id="join">
        <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={this.joinSession}>
                <p>
                    <label>Participant: </label>
                    <input
                        type="text"
                        id="userName"
                        // value={myUserName}
                        onChange={this.handleChangeUserName}
                        required
                    />
                </p>
                <p>
                    <label> Session: </label>
                    <input
                        type="text"
                        id="sessionId"
                        // value={mySessionId}
                        onChange={this.handleChangeSessionId}
                        required
                    />
                </p>
                <p>
                    <input name="commit" type="submit" value="JOIN" />
                </p>
            </form>
            {/* <OpenViduSession
                id="opv-session"
                sessionName={mySessionId}
                user={myUserName}
                token={token}
                joinSession={this.handlerJoinSessionEvent}
                leaveSession={this.handlerLeaveSessionEvent}
                error={this.handlerErrorEvent}
            /> */}
        </div>
    </div>
    )

}
export default Facechat