import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss';

type RoomCodePorps = {
    code: string;
}

export function RoomCode(props: RoomCodePorps) {

     function copyRoomCodeToClipboar() {
         navigator.clipboard.writeText(props.code)
     }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipboar}>
            <div>
                <img src={copyImg} alt="copy room" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}