export { removePerson } from '../reducers/personSlice';
import axios from "../../utils/Axios";
import { loadPerson } from '../reducers/personSlice';

export const loadPersonAction = (id) => async(dispatch) => {
    try {
        const { data:detail } = await axios.get(`/person/${id}`);
        const { data:externalId } = await axios.get(`/person/${id}/external_ids`);
        const { data:credits } = await axios.get(`/person/${id}/combined_credits`);

        let ultimateData = {
            detail:detail,
            externalId: externalId,
            credits:credits,
        }

        dispatch(loadPerson(ultimateData));
    } 
    catch (error) {
        console.log(error);
    }
}