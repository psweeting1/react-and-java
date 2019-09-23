import React from 'react';
// import Counter from "./components/counter/Counter";
import Todo from "./components/todo/Todo";
import './css/bulma.min.css'

function App() {
  return (
    <div>
        <div className="">
            {/* <Counter/> */}
            <Todo/>
        </div>
    </div>
  );
}

//Just call LearningComponents to use this.
// class LearningComponents extends React.Component {
//   render() {
//     return (
//       <div className="learningComponents">
//       <header className="App-header">
//         <p>
//           Welcome to the homepage, <b>WOOHOO!</b>
//         </p>
//       </header>
//     </div>
//     )
//   }
// }

export default App;
