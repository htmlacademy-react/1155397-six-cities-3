import { TOffers } from '../types/offers';

const offers: TOffers = [
  {
    id: '1adfasq1231',
    title: 'Place title 1',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 1,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 1,
    goods: [ 'Kitchen','Dishwasher' ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    images: [ 'img/apartment-01.jpg'],
    maxAdults: 1
  },
  {
    id: '21adfasq1231',
    title: 'Place title 2',
    type: 'room',
    price: 200,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 2,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 2,
    goods: [ 'Wi-Fi', 'Washing machine','Towels','Heating','Coffee machine','Baby seat','Kitchen' ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [ 'img/room.jpg'],
    maxAdults: 2
  },
  {
    id: '31adfasq1231',
    title: 'Place title 3',
    type: 'apartment',
    price: 300,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 3,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    goods: [ 'Coffee machine','Baby seat','Kitchen','Dishwasher','Cabel TV','Fridge' ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [ 'img/apartment-01.jpg'],
    maxAdults: 3
  },
  {
    id: '41adfasq1231',
    title: 'Place title 4',
    type: 'apartment',
    price: 400,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 4,
    goods: [ 'Wi-Fi', 'Washing machine','Towels','Heating','Coffee machine','Baby seat','Kitchen','Dishwasher','Cabel TV','Fridge' ],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    images: [ 'img/apartment-01.jpg'],
    maxAdults: 4
  },
];

export default offers;
