import { ReactNode } from 'react';

import '../styles/question.scss';

type QuestionsProps = {
    content: string;
    author: {
        name:string;
        avatar:string;
    };
    children?: ReactNode
    isHighlighted?: boolean,
    isAnswered?: boolean 
}

export function Question({
    content,
    author,
    isHighlighted = false,
    isAnswered= false,
    children
}: QuestionsProps) {
    return(
        <div className={`question ${isAnswered ? 'answerd' : ''} ${isHighlighted ? 'hightlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    {/* <img src={author.avatar} alt={author.name} /> */}
                    <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}