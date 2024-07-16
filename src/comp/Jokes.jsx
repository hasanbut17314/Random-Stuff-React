import { Button, Select, Skeleton } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import React from 'react'
function Jokes() {


  const [joke, setJoke] = useState([]);
  const [load,setLoad]  = useState(false)
  const [filters, setFilters] = useState({
    category: 'Any',
    type: 'single'
  });
  const skStart = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-start');
  const skEnd = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-end');
    
  async function fetchJoke() {
    setLoad(true)
    try {
      console.log(Date.now())
      const { category, type } = filters;
      const jokeResponse = await axios.get(`/joke/${category}?type=${type}&amount=10`);
      setJoke(jokeResponse.data.jokes || []);
      console.log( setJoke(jokeResponse.data.jokes || []))
      
    } catch (error) {
      console.log('Some error occurred', error);
      
    }finally {
      setLoad(false);
    }
  }
  function handleFilter(e) {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  }
 useEffect(() => {
  fetchJoke()
 }, [])
 
 

  return (
    <div>
      <h1>Jokes</h1>
      <div className='mt-5 flex justify-between px-2 flex-wrap gap-y-2'>
        <div className='md:w-[300px] w-full'>
          <Select name="category" onChange={handleFilter} placeholder='Select category'>
            <option value='Any'>Any</option>
            <option value='Programming'>Programming</option>
            <option value='Miscellaneous'>Miscellaneous</option>
            <option value='Dark'>Dark</option>
            <option value='Pun'>Pun</option>
            <option value='Spooky'>Spooky</option>
            <option value='Christmas'>Christmas</option>
          </Select>
        </div>
        <div className='md:w-[300px] w-full'>
          <Select name="type" onChange={handleFilter} placeholder='Select type'>
            <option value='single'>Single</option>
            <option value='twopart'>Two Part</option>
          </Select>
        </div>
        <Button
         className='mx-3 bg-secondary border text-primary'
         isLoading={load} colorScheme='teal' variant='solid' onClick={fetchJoke}>
          Search
        </Button>
      </div>

    <h2 className='mt-8'>Random Jokes</h2>
      <div className=' grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 md:gap-y-6 gap-y-4 md:gap-x-6 gap-x-4 mt-6 '>
        { load ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} height="18rem" rounded={'10px'} startColor={skStart} endColor={skEnd} className='p-3 rounded-lg w-full h-72' />
          ))
        ) :
        joke.map((j, i) => {
        
         return <div key={i} className="card bg-secondary  p-3 rounded-lg w-full h-72 flex flex-col items-center overflow-hidden">
            <div className='flex flex-col'>
              <h2 className='font-bold'>category &nbsp; : {j.category}</h2>
              <h4 className='mt-8 font-semibold'>{j.type === 'single' ? j.joke : j.setup}</h4>
            </div>
            <div className='text-sm md:mt-10 mt-8'>
              {j.type === 'twopart' && <p className='font-semibold'>{j.delivery}</p>}
            </div>
          </div>
          
})}
      </div>
    </div>
   )
}

export default Jokes;
