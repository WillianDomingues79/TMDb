import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'

import MovieCard from '../components/MovieCard'
import './Movie.css'

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

//Função de converter moeda da orçamento e receita
const formatCurrency = (number) => {
  return number.toLocaleString('en-US', {
    style:'currency',
    currency: 'USD'
  })
}

const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async(url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovie(data)
  }

  useEffect(() => {
    const movieUrl = `${moviesUrl}${id}?${apiKey}`
    getMovie(movieUrl)
  }, [])

  return (
    <div className='movie-page'>
      {movie && (
      <>
      <MovieCard movie={movie} showLink={false} />
      <p className='tagline'>"{movie.tagline}"</p>
      <div className='info'>
        <h3>
          <BsWallet2 /> Orçamento:
        </h3>
        <p><li>{formatCurrency(movie.budget)}</li></p>
      </div>
      <div className='info'>
        <h3>
          <BsGraphUp /> Receita:
        </h3>
        <p><li>{formatCurrency(movie.revenue)}</li></p>
      </div>
      <div className='info'>
        <h3>
          <BsHourglassSplit /> Duração:
        </h3>
        <p><li>{movie.runtime} minutos</li></p>
      </div>
      <div className='info description'>
        <h3>
          <BsFillFileEarmarkTextFill /> Descrição:
        </h3>
        <p>{movie.overview}</p>
      </div>
      </>
    )}</div>
  )
}

export default Movie