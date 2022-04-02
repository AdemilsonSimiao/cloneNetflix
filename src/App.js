import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRows from './components/movieRows';
import FeatureMovie from './components/featureMovie';
import Header from './components/header';


// eslint-disable-next-line import/no-anonymous-default-export
export default  () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState([null]);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    };
    loadAll();
  }, []);
  useEffect(() => {
    const scrollListiner = () => {
        if(window.scrollY > 70){
          setBlackHeader(true)
        }else{
          setBlackHeader(false)
        }
    }
    window.addEventListener('scroll', scrollListiner);
    return () => {
      window.removeEventListener('scroll', scrollListiner);
    }
  }, []);
  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featureData &&
        <FeatureMovie item={featureData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        direitos de imagens Netflix<br/>
        direitos de uso de dados Tmdb3      
      </footer>
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif' alt='Carregando'/>
        </div>
      }
    </div>
  );
}