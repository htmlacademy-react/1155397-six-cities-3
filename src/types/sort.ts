import { TOffer } from './offers';

export type TSortBy = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type TSortDictItem = {
    name: TSortBy;
    handler: (a:TOffer, b:TOffer) => number;
};


export type TSortDictionary =
Record<Exclude<TSortBy, 'Popular'>, (a:TOffer, b:TOffer) => number>
&
Record<Extract<TSortBy, 'Popular'>, null>;
