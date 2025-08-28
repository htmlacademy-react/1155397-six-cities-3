export type TUser = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
};

export type TReview = {
    id: string;
    date: string;
    user: TUser;
    comment: string;
    rating: number;
};

export type TReviewFormStatus = {
    loading: boolean;
    successMessage?: string;
    errorMessage?: string;
}

export type TReviews = TReview[];
