import './App.css';
import { DataTable } from './components/dataTable/dataTable';
import { ViewCard } from './components/viewCard/viewCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ViewCard><DataTable></DataTable></ViewCard>
      </header>
    </div>
  );
}

export default App;
