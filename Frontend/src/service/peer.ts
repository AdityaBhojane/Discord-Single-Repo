/* eslint-disable @typescript-eslint/ban-ts-comment */
class PeerService {
  private peer: RTCPeerConnection | null = null;

    constructor() {
      if (!this.peer) {
        this.peer = new RTCPeerConnection({
          iceServers: [
            {
              urls: [
                "stun:stun.l.google.com:19302",
                "stun:global.stun.twilio.com:3478",
              ],
            },
          ],
        });
        console.log("Created New Peer Connection", this.peer);
      }else{
          console.log("Using Existing Peer", this.peer);
      }
    };
  
    // get offer
    async createOffer() {
      //@ts-ignore
      const offer = await this.peer.createOffer();
      //@ts-ignore
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    };
    //@ts-ignore
    async getAnswer(offer) {
      if (this.peer) {
        // try new RTCSessionDescription(offer)
        await this.peer.setRemoteDescription(offer);
        const answer = await this.peer.createAnswer();
        await this.peer.setLocalDescription(new RTCSessionDescription(answer));
        return answer;
      }
    };
  
    // setLocalDescription
    //@ts-ignore
    async setAnswer(answer) {
      if (this.peer) {
        await this.peer.setRemoteDescription(answer);
      }
    };
  
  
  };
  
  export default new PeerService();
  