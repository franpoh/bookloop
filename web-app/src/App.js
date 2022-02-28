import login from './screens/account/test';
import RoutePages from './screens/routing';

function App() {

  let p = new Promise((resolve) => {
    resolve(login());
  });

  p.then((res) => {
    console.log("TEST", res);
  });

  return (
    <RoutePages />
  );
}

export default App;
