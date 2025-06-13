export type TLocation = {
    latitude: number;
    longitude: number;
    zoom: number;
};

export type TCity = {
    name: string;
    location: TLocation;
};

export type THost = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
};

export type TOffer = {
    id: string;
    title: string;
    type: string;
    price: number;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    description: string;
    bedrooms: number;
    goods: string[];
    images: string[];
    maxAdults: number;
    location: TLocation;
    city: TCity;
    host: THost;
};

export type TMapPin = {
    iconUrl: string;
    iconSize: number[];
    iconAnchor: number[];
}

export type TOffers = TOffer[];
