

import './App.css';
import AddUser from "packages/userManagement/addUser/addUser";
import AllUsers from "packages/userManagement/addUser/getUsers";

function App() {
  return (
    <div className="Container">
      <div className='row'>
        <AddUser />
        <AllUsers />
      </div>

    </div>
  );
}

export default App;
