import Roaster from "./roaster";

type Review = {
    id: string,
    name: string,
    year: number,
    origin: string,
    rating: number,
    notes: string,
    roaster: Roaster,
    owner: string
}

export default Review;