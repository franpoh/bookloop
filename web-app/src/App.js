import './App.css';
import login from './screens/account';

function App() {

  let p = new Promise((resolve) => {
    resolve(login());
  });

  p.then((res) => {
    console.log("TEST", res);
  });

  return (
    <div>
      <p>Hello World!</p>
    </div>
  );
}

export default App;
