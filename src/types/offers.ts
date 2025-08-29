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
    previewImage: string;
    city: TCity;
    location: TLocation;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
};

export type TDetailOffer = Omit<TOffer, 'previewImage'> & {
    description: string;
    bedrooms: number;
    goods: string[];
    host: THost;
    images: string[];
    maxAdults: number;
};

export type TMapPin = {
    iconUrl: string;
    iconSize: number[];
    iconAnchor: number[];
}

export type TOffers = TOffer[];
export type TDetailOffers = TDetailOffer[];
export type TCities = TCity[];
