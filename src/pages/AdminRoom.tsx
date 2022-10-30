import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deletImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
  id: string;
}
export function AdminRoom() {
  const history = useHistory()
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);

    async function handleEndRoom() {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      })

      history.push('/');
    }
  
    async function handleDeleteQuestion() {
      if(window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
        await database.ref(`rooms/${roomId}/questions/${questions}`).remove();
      }
    }

    async function handleCheckQuestionAsAnswered() {
      await database.ref(`rooms/${roomId}/questions/${questions}`).update({
        isAnswered: true,
      })
    }

    async function handleHighlightQuestion() {
      await database.ref(`rooms/${roomId}/questions/${questions}`).update({
        isHighlighted: true,
      })
    }
  
    return (
      <div id="page-room">
        <header>
          <div className="content">
            <img src={logoImg} alt="Letmeask" />
            <div>
            <RoomCode code={roomId} />
            <Button isOutline onClick={handleEndRoom}>Encerrar sala</Button>
            </div>
          </div>
        </header>
  
        <main>
          <div className="room-title">
            <h1>Sala {title}</h1>
            { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
          </div>

          <div className="question-list">
            {
              questions.map(questions => {
                return (
                  <Question
                    key={questions.id}
                    content={questions.content}
                    author={questions.author}
                    isAnswered={questions.isAnswered}
                    isHighlighted={questions.isHighlighted}
                    >
                    <button type='button'
                      onClick={() => handleCheckQuestionAsAnswered()}
                    >
                        <img src={checkImg} alt='marcar pergunta como respondida' />
                    </button>
                    <button type='button'
                      onClick={() => handleHighlightQuestion()}
                    >
                        <img src={answerImg} alt='da destque à pergunta' />
                    </button>
                    <button type='button'
                      onClick={() => handleDeleteQuestion()}
                    >
                        <img src={deletImg} alt='deletar pergunta' />
                    </button>
                  </Question>

                )
              })
            }
          </div>
        </main>
      </div>
    );
  }