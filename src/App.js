import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import HouseMaintView from './components/HouseMaintView';


// import firebase from 'firebase/app';
// import 'firebase/firestore';

function App() {
  
  // const firebaseConfig = {
  //   apiKey: "AIzaSyB2D-YXfeYzA6Vdfpnb1p9F7nLV-dzDCJ4",
  //   authDomain: "mm-project-500dc.firebaseapp.com",
  //   databaseURL: "https://mm-project-500dc.firebaseio.com",
  //   projectId: "mm-project-500dc",
  //   storageBucket: "mm-project-500dc.appspot.com",
  //   messagingSenderId: "416216361413",
  //   appId: "1:416216361413:web:549d302510c6c985bfc3ac",
  //   measurementId: "G-ZLQFYCNWS5"
  // };
  // firebase.initializeApp(firebaseConfig);
  // let db;
  // setTimeout(() => {
  //     if (!firebase.apps.length) {
  //         try {
  //             firebase.initializeApp(firebaseConfig)
  //         } catch (err) {
  //             console.log(err)
  //         }
  //     }
  //     db = firebase.firestore();
  //     console.log("dbLL ", db);
  // }, 1000)
  // console.log("here", firebase.database());
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <HouseMaintView />
    </div>
  );
}

export default App;
