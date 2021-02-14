import { List } from 'semantic-ui-react';
import utils from '../Utilities';

const Leaderboard = (props) => {
  let items;

  if (props.leaderboard) {
    items = props.leaderboard.map(
      (item, index) => {
        return (
          <List.Item key={index}>
            {`${utils.msToTimer(item.milliseconds)} on ${new Date(item.date).toDateString()}`}
          </List.Item>
        );
      }
    );
  }

  const board = <List ordered>{items}</List>;

  return (
    <div>
      <h3>Best times for Mode: {props.mode}</h3>
      {board}
    </div>
  );
}

export default Leaderboard;
