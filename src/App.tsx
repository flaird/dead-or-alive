import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import { firestore } from './firebase';
import axios from 'axios';

type Site = { id: string; url: string; alive: boolean };
type Sites = Site[];

function App() {
  React.useEffect(() => {
    firestore.collection('sites').onSnapshot((snapshot) => {
      const sites: Sites = [];
      snapshot.forEach((doc) => {
        const site = {
          id: doc.id,
          url: doc.data().url,
          alive: doc.data().alive,
        };
        sites.push(site);
      });
      setSites(sites);
    });
  }, []);

  const [url, setUrl] = React.useState<string>('');
  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const [sites, setSites] = React.useState<Sites>([]);
  const addSite = () => {
    firestore.collection('sites').add({ url: url, alive: false });
  };

  const isItDeadOrAlive = async (site: Site) => {
    await axios.post('http://localhost:1337', { url: site.url }).then(async (response) => {
      if (response.data.alive) {
        await firestore.collection('sites').doc(site.id).set({ alive: true });
      }
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Is it Dead or Alive?</h1>
        <input value={url} onChange={handleUrl} />
        <button onClick={addSite}>Add site</button>
      </header>

      <ul style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {sites.map((site) => {
          return (
            <li key={site.id} style={{ backgroundColor: site.alive ? 'green' : 'red' }}>
              {site.url}
              <button onClick={() => isItDeadOrAlive(site)}>Check</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
