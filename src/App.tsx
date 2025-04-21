import {UserProvider} from "./context/UserContext";
import UserList from "./components/UserList";

function App(){
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  );
}

export default App;