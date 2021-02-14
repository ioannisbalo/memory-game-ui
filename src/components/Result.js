import { Button, Message } from 'semantic-ui-react';
import utils from '../Utilities';

const Result = (props) => {
  const winText = props.isBestTime ? 'You have the best time!' : 'Try to get the best time';
  const win = (
    <Message positive>
      <Message.Header>You won!!!</Message.Header>
        <p>
          Your time: {utils.msToTimer(props.milliseconds)}. {winText}
        </p>
    </Message>);
  const loss = (
    <Message negative>
      <Message.Header>You lost...</Message.Header>
        <p>
          Better luck next time
        </p>
    </Message>);
  const content = (
    <div style={{marginBottom: '3%'}}>
      {props.gameState === 'won' ? win : null}
      {props.gameState === 'lost' ? loss : null}
      <Button primary onClick={props.onPlayAgain}>Play Again</Button>
    </div>
  );

  return (
    <div>
      {props.gameState === 'won' || props.gameState === 'lost' ? content : null }
    </div>
  );
}

export default Result;
