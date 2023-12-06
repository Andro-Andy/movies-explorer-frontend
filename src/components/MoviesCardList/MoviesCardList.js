import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Words from '../../images/list/words_pic.png';
import Kinoalmanakh from '../../images/list/kinoalmanakh_pic.png';
import Benksy from '../../images/list/benksy_pic.png';
import Baskiya from '../../images/list/baskiya_pic.png';
import RunFreedom from '../../images/list/run-freedom_pic.png';
import Books from '../../images/list/books_pic.png';
import WhenThinking from '../../images/list/when-thinking.png';
import GimmeDanger from '../../images/list/gimme-danger_pic.png';
import Djenis from '../../images/list/djenis.png';
import BeforeJump from '../../images/list/before-jump_pic.png';
import JayKharvy from '../../images/list/jay-kharvy_pic.png';
import Povolnam from '../../images/list/povolnam_pic.png';
import './MoviesCardList.css';

function MoviesCardList() {
  const moviesData = [
    {
      title: '33 слова о дизайне',
      duration: '0ч 42м',
      imageUrl: Words,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 1'),
    },
    {
      title: 'В погоне за Бенкси',
      duration: '0ч 42м',
      imageUrl: Kinoalmanakh,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 2'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: Benksy,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: Baskiya,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: RunFreedom,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: Books,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: WhenThinking,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: GimmeDanger,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: Djenis,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: BeforeJump,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: JayKharvy,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
    {
      title: 'Movie Title 3',
      duration: '0ч 42м',
      imageUrl: Povolnam,
      isLiked: true,
      onLikeClick: () => console.log('Like button clicked for Movie Title 3'),
    },
  ];

  return (
    <div className="movies-cardlist">
      {moviesData.map((movie, index) => (
        <MoviesCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesCardList;
