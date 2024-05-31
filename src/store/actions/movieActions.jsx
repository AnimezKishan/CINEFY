export { removeMovie } from '../reducers/movieSlice';
import axios from "../../utils/Axios";
import { loadMovie } from "../reducers/movieSlice";


export const loadMovieAction = (id) => async(dispatch) => {
    try {
        const { data:detail } = await axios.get(`/movie/${id}`);
        const { data:externalId } = await axios.get(`/movie/${id}/external_ids`);
        const { data:recommendations } = await axios.get(`/movie/${id}/recommendations`);
        const { data:similar } = await axios.get(`/movie/${id}/similar`);
        const { data:images } = await axios.get(`/movie/${id}/images`);
        const { data:videos } = await axios.get(`/movie/${id}/videos`);
        const { data:watchProviders } = await axios.get(`/movie/${id}/watch/providers`);
        const { data:credits } = await axios.get(`/movie/${id}/credits`);

        let ultimateData = {
            detail: detail,
            externalId: externalId,
            recommendations: recommendations.results,
            similar: similar.results,
            images: images.backdrops,
            videos: videos.results.find(vid=> vid.type === 'Trailer'),
            watchProviders: watchProviders.results.IN,
            credits: credits.cast,
        }

        dispatch(loadMovie(ultimateData));
        //console.log(ultimateData);
    } 
    catch (error) {
        console.log(error);    
    }
}

