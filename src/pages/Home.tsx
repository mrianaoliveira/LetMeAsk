import { useHistory} from 'react-router-dom'

import { auth, database, firebase} from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

export function Home() {
    const history = useHistory();
    const {user, singInWithGoogle} = useAuth();  
    const [roomCode, setRoomCode] = useState(''); 

    async function handleCreateRoom() {
        if(!user) {
            await singInWithGoogle()
        }

     history.push('/rooms/news');
    }

    async function handleJoinRoom(event: FormEvent ) {
        event.preventDefault();

        if(roomCode.trim() ==='') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists');
            return;
        }

        if(roomRef.val().endedAt) {
            alert('Room already closes.');
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt ="ilustração de pergunta e respostas"/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="imagem do logo"/>
                    <button onClick={handleCreateRoom} className='create-room'>
                    <img src={googleImg} alt="logo do google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text"
                        placeholder="digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                       />
                       <Button type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}