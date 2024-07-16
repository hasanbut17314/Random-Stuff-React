import React, { useState ,useEffect } from 'react'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import axios from 'axios';

function Facts() {
  const [fact,setFact] = useState([])
  const[loading,setLoading]=useState(false)

  const skStart = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-start');
  const skEnd = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-end');

  let mainRequest = Array.from({ length: 20 }, () => axios.get('https://uselessfacts.jsph.pl/random.json?language=en'))
 async function factsCall() {
  setLoading(true)
  try {
        let anotherOne = await axios.all(mainRequest);
        const factsArray = anotherOne.map(response => response.data);
        setFact(factsArray);
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false)
      }
  
 }

 useEffect(() => {
  factsCall()
 }, [])
 
  return (
    <div>Facts
      <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 md:gap-y-6 gap-y-4 md:gap-x-6 gap-x-4'>
      {loading ? (
            // Display skeletons while loading
            Array(4).fill().map((_, index) => (
              <div key={index} className='px-2 md:mx-0'>
                <Skeleton rounded='md' startColor={skStart} endColor={skEnd} height="288px">
                  <div className="card bg-secondary p-3 rounded-lg md:w-64 w-full h-72 flex flex-col items-center overflow-hidden"></div>
                </Skeleton>
              </div>
            ))
          ) : (
            // Display actual facts once loaded
            fact.map((fact) => {
               return <div key={fact.id} className='px-2 md:mx-0 grid-cols-4'>
                <div className="card bg-secondary p-3 rounded-lg md:w-64 w-full h-72 flex flex-col items-center overflow-hidden">
                  <div className='flex'>
                    <p className='text-sm'>source: &nbsp;</p>
                    <h4 className='font-semibold'>{fact.source}</h4>
                  </div>
                  <div className='text-sm md:mt-10 mt-7'>
                    <p className='font-semibold'>{fact.text}</p>
                  </div>
                </div>
              </div>
})
          )}
   
      </div>
       </div>
  )
}

export default Facts