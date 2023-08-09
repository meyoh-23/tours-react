import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  //removing tour that client is not interested in
  const removeTour = (id) => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  }

// fetching the tours data
// using the built-in fetch API
const fetchTours = async () => {
  setLoading(true); // always want to start by displaying the 'Loading...' to the client
  try {
    const response = await fetch(url);
    const tours = await response.json();
    setLoading(false);
    setTours(tours);
    //console.log(tours)
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

//useEffect to invoke the fetchTour function
useEffect(()=> {
  fetchTours();
},[])

  if (loading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  }

  // check if not tour is ondisplay and then display a button to show all touurs
  if (tours.length === 0) {
    return(
    <main>
      <h2>no tours left</h2>
      <button onClick={fetchTours} className='btn'>refresh </button>
    </main>
    );
  };

  return (
    <main>
      <Tours tours={tours} removeTour = {removeTour}/>
    </main>
  )
}

export default App