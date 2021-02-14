import { Card } from 'semantic-ui-react';
import '../css/MemoryCard.css';

const MemoryCard = (props) => {
  const number = props.card.status === 'shown' ?
      <div className='number'>{props.card.value}</div> : null

  const colorClass = props.card.correct ? 'correct' : props.card.incorrect ? 'incorrect' : 'default';

  return (
    <Card className={`${colorClass} memory-card`}>
      <Card.Content className='memory-card-content'>
        <button
          className='select'
          onClick={() => props.onGuess(props.card.value, props.index)}
          disabled={props.card.status === 'shown' || props.gameState !== 'guessing'}
        >
          {number}
        </button>
      </Card.Content>
    </Card>
  );
}

export default MemoryCard;
