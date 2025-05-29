import { Offers } from '../types/offers';

const offers: Offers = [
  {
    id: '1adfasq1231',
    title: 'Place title 1',
    type: 'apartment',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
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
      name: 'Paris',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
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
      name: 'Cologne',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
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
      name: 'Brussels',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
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
    id: '61adfasq1231',
    title: 'Place title 5',
    type: 'room',
    price: 600,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      }
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 5,
    goods: [ 'Wi-Fi', 'Washing machine','Towels','Heating'],
    host: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false
    },
    images: [ 'img/room.jpg'],
    maxAdults: 5
  },
];

export default offers;
