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
  {
    id: '1adfasq1231-1111',
    title: 'Place Title 5',
    type: 'apartment',
    price: 500,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.4179,
      longitude: 4.8882,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 5,
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
    id: '1adfasq1231-2222',
    title: 'Place Title 6',
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
      latitude: 52.3433,
      longitude: 4.8663,
      zoom: 8
    },
    isFavorite: true,
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
    id: '1adfasq1231-33333',
    title: 'Place Title 7',
    type: 'apartment',
    price: 700,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3437,
      longitude: 4.8896,
      zoom: 8
    },
    isFavorite: true,
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
    id: '1adfasq1231-4444',
    title: 'Place Title 8',
    type: 'apartment',
    price: 800,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3496,
      longitude: 4.9281,
      zoom: 8
    },
    isFavorite: true,
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
    id: '1adfasq1231-5555',
    title: 'Place Title 9',
    type: 'apartment',
    price: 900,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3598,
      longitude: 4.9480,
      zoom: 8
    },
    isFavorite: true,
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
    id: '1adfasq1231-6666',
    title: 'Place Title 10',
    type: 'apartment',
    price: 999,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 13
      }
    },
    location: {
      latitude: 52.36365,
      longitude: 4.89389,
      zoom: 8
    },
    isFavorite: true,
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
  }
];

export default offers;
