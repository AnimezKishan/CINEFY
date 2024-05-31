export { removeTV } from "../reducers/tvSlice";
import axios from "../../utils/Axios";
import { loadTV } from "../reducers/tvSlice";

export const loadTvAction = (id) => async(dispatch) => {
    try {
        const { data:detail } = await axios.get(`/tv/${id}`);
        const { data:externalId } = await axios.get(`/tv/${id}/external_ids`);
        const { data:recommendations } = await axios.get(`/tv/${id}/recommendations`);
        const { data:similar } = await axios.get(`/tv/${id}/similar`);
        const { data:images } = await axios.get(`/tv/${id}/images`);
        const { data:videos } = await axios.get(`/tv/${id}/videos`);
        const { data:watchProviders } = await axios.get(`/tv/${id}/watch/providers`);
        const { data:credits } = await axios.get(`/tv/${id}/credits`);

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

        dispatch(loadTV(ultimateData));
    } 
    catch (error) {
        console.log(error);    
    }
}