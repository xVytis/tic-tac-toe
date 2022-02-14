import './app.css';

import { SocketContext, socket } from './context/websocket';
import store from './store/store';
import { Provider } from 'react-redux';
import TicTacToe from './components/tic-tac-toe/tic-tac-toe';

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <TicTacToe></TicTacToe>
      </Provider>
    </SocketContext.Provider>
  );
};

export default App;
