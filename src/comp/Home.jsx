import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {

  const [jokes, setJokes] = useState([]);
  const [facts,setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomCalls = async () => {

    setLoading(true);
    try {

      const [jResponse, jFacts] = await axios.all([
        axios.get('/joke/Any?amount=10'),
        axios.get('/quotes?limit=10')
      ])

      setJokes(jResponse.data.jokes || [])
      setFacts(jFacts.data || [])

    } catch (error) {

      if (error.response) {
        console.log(error.response.data);
      }
      else if (error.request) {
        console.log('Network Error! Check internet connection');
      }
      else {
        console.log(error.message);
      }

    } finally {
      setLoading(false);
    }

  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 805,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    randomCalls()
  }, [])

  return (
    <>
      <div className='lg:pe-11 lg:mx-8'>

        <div className='flex justify-between md:mb-5'>
          <h5>Random Jokes</h5>
          <NavLink className='viewMore' to='/jokes'>
            view more
            <FontAwesomeIcon className='ms-2 arrRt transition-all duration-300' icon={faArrowRight} />
          </NavLink>
        </div>

        <Slider {...sliderSettings}>
          {jokes.map((joke) => (
            <div key={joke.id} className='px-2'>
              <div className="card bg-secondary p-3 rounded-lg w-64 h-72 flex flex-col items-center overflow-hidden">
                <div className='flex'>
                  <p className='text-sm'>category: &nbsp;</p>
                  <h4 className='font-semibold'>{joke.category}</h4>
                </div>
                <div className='text-sm md:mt-10 mt-7'>
                  {joke.type === 'single' ? (
                    <p className='font-semibold'>{joke.joke}</p>
                  ) : (
                    <>
                      <p>{joke.setup}</p>
                      <p className='font-semibold mt-2'>{joke.delivery}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
{/* random facts */}
<div className='flex justify-between md:mb-5 mt-10'>
          <h5>Random Facts</h5>
          <NavLink className='viewMore' to='/facts'>
            view more
            <FontAwesomeIcon className='ms-2 arrRt transition-all duration-300' icon={faArrowRight} />
          </NavLink>
        </div>

        <Slider {...sliderSettings}>
          {facts.map((fact, index) => (
            <div key={index} className='px-2'>
              <div className="card bg-secondary p-3 rounded-lg w-64 h-72 flex flex-col items-center overflow-hidden">
                <div className='flex'>
                  <p className='text-sm'>author: &nbsp;</p>
                  <h4 className='font-semibold'>{fact.a}</h4>
                </div>
                <div className='text-sm md:mt-10 mt-7'>
                  <p className='font-semibold'>{fact.q}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>



      </div>
    </>
  )
}

export default Home