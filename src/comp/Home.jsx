import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Slider from 'react-slick';
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const MySwal = withReactContent(Swal)

  const [jokes, setJokes] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomCalls = async () => {

    setLoading(true);
    try {

      const [jResponse, qResponse] = await axios.all([
        axios.get('/joke/Any?amount=10'),
        axios.get('/quotes?limit=5')
      ])
      let fResponse = Array.from({ length: 10 }, () => axios.get('https://uselessfacts.jsph.pl/random.json?language=en'))

      try {
        let factRqst = await axios.all(fResponse);
        const factsArray = factRqst.map(response => response.data);
        setFacts(factsArray);
      } catch (error) {
        showError('Something went wrong! Check your internet connection and try again');
      }

      setJokes(jResponse.data.jokes || [])
      let modifiedQuotes = qResponse.data.filter((quote, index) => {
        return index < 10;
      })
      setQuotes(modifiedQuotes || [])

    } catch (error) {

      showError('Something went wrong! Check your internet connection and try again');

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
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 805,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };

  const showError = (error) => {
    MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
      customClass: 'bg-primary text-primary'
    });
  }

  useEffect(() => {
    randomCalls()
  }, [])

  return (
    <>
      <div className='lg:pe-0 lg:mx-6'>

        {/* Jokes Container */}
        <div className='flex w-xl justify-between md:mb-5 mb-3 md:px-4 px-2'>
          <h5>Random Jokes</h5>
          <NavLink className='viewMore' to='/jokes'>
            view more
            <FontAwesomeIcon className='ms-2 arrRt transition-all duration-300' icon={faArrowRight} />
          </NavLink>
        </div>

        <Slider {...sliderSettings}>
          {jokes.map((joke) => (
            <div key={joke.id} className='px-2 md:mx-0 '>
              <div className="card bg-secondary p-3 rounded-lg md:w-64 w-full h-72 flex flex-col  items-center overflow-hidden">
                <div className='flex'>
                  <p className='text-sm'>category: &nbsp;</p>
                  <h4 className='font-semibold'>{joke.category}</h4>
                </div>
                <div className='text-sm md:mt-10 mt-7 '>
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

        {/* Quotes Container */}
        <div className='flex justify-between md:mb-5 mb-3 mt-10 md:px-4 px-2'>
          <h5>Random Quotes</h5>
          <NavLink className='viewMore' to='/quotes'>
            view more
            <FontAwesomeIcon className='ms-2 arrRt transition-all duration-300' icon={faArrowRight} />
          </NavLink>
        </div>

        <Slider {...sliderSettings}>
          {quotes.map((quotes, index) => (
            <div key={index} className='px-2 md:mx-0'>
              <div className="card bg-secondary p-3 rounded-lg md:w-64 w-full h-72 flex flex-col items-center overflow-hidden">
                <h2>{quotes.a}</h2>
                <div className='text-sm md:mt-10 mt-7'>
                  <p className='font-semibold'>{quotes.q}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Facts Container */}
        <div className='flex w-xl justify-between md:mb-5 mt-10 mb-3 md:px-4 px-2'>
          <h5>Random Facts</h5>
          <NavLink className='viewMore' to='/facts'>
            view more
            <FontAwesomeIcon className='ms-2 arrRt transition-all duration-300' icon={faArrowRight} />
          </NavLink>
        </div>

        <Slider {...sliderSettings}>
          {facts && facts.map((fact) => (
            <div key={fact.id} className='px-2 md:mx-0 '>
              <div className="card bg-secondary p-3 rounded-lg md:w-64 w-full h-72 flex flex-col  items-center overflow-hidden">
                <div className='flex'>
                  <p className='text-sm'>source: &nbsp;</p>
                  <h4 className='font-semibold'>{fact.source}</h4>
                </div>
                <div className='text-sm md:mt-10 mt-7 '>
                  <p className='font-semibold'>{fact.text}</p>
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