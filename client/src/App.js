import PetShelter from './components/PetShelter';
import PetNew from './components/PetNew';
import PetEdit from './components/PetEdit';
import PetDetails from './components/PetDetails';
import "./App.css"

import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/pet/:id" element= {<PetDetails/>}/>
        <Route path="/pet/new" element= {<PetNew/>}/>
        <Route path="/pet/edit/:id" element= {<PetEdit/>}/>
        <Route path="/" element= {<PetShelter/>}/>
      </Routes>
    </div>
  );
}

export default App;
