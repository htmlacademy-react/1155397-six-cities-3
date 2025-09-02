// import { TOffers } from '../../types/offers';
// import { Helmet } from 'react-helmet-async';
// import PlacesList from '../../components/places-list/places-list';
// import { useAppSelector } from '../../store/hooks';

// function Favorites() {
//   const offers = useAppSelector((state)=> state.offers);
//   const favoriteOffers = offers.filter((offer) => offer.isFavorite);
//   const cities = [...new Set(favoriteOffers.map(({ city }) => city.name))];

//   return (
//     <main className="page__main page__main--favorites">
//       <Helmet>
//         <title>6 cities: Favorites</title>
//       </Helmet>
//       <div className="page__favorites-container container">
//         <section className="favorites">
//           <h1 className="favorites__title">Saved listing</h1>
//           <ul className="favorites__list">
//             {
//               cities.map((city) => {
//                 const offerOfCity = favoriteOffers.filter((offer) => offer.city.name === city);
//                 return (
//                   <li className="favorites__locations-items" key={city}>
//                     <div className="favorites__locations locations locations--current">
//                       <div className="locations__item">
//                         <a className="locations__item-link" href="#">
//                           <span>{city}</span>
//                         </a>
//                       </div>
//                     </div>
//                     <div className="favorites__places">
//                       <PlacesList offers={offerOfCity} cardVariant='favorite'/>
//                     </div>
//                   </li>
//                 );
//               })
//             }
//           </ul>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default Favorites;
