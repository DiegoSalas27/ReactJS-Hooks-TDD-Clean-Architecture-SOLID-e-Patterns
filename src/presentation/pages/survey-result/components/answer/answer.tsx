import { SurveyResultAnswerModel } from '@domain/models'
import React, { useContext } from 'react'
import { SurveyResultContext } from '..'
import Styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }) => {
  const { onAnswer } = useContext(SurveyResultContext)

  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : ''
  const answerClick = (e: React.MouseEvent<HTMLLIElement>): void => {
    if (!e.currentTarget.classList.contains(Styles.active)) {
      onAnswer(answer.answer)
    }
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[Styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
      <span data-testid="answer" className={Styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={Styles.percent}>
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
