import {
  technicianLocationURL,
  TECHNICIAN_LOCATION_REQUEST,
  TECHNICIAN_LOCATION_SUCCESS,
  TECHNICIAN_LOCATION_FAILURE,
  TECHNICIAN_LOCATION_RESET
} from "../Constants/Constants";
import axios from "axios";

export const technicianLocationRequest = () => {
  return {
    type: TECHNICIAN_LOCATION_REQUEST,
  };
};

export const technicianLocationSuccess = data => {
    return {
        type: TECHNICIAN_LOCATION_SUCCESS,
        payload: data,
    };
  };

export const fetchTechnicianLocation = ({solar_farm_id}) => {
    return function(dispatch) {
        dispatch(technicianLocationRequest());
        return axios.get(technicianLocationURL + `/${solar_farm_id}/technicians`)
          .then(({ data }) => {
            dispatch(technicianLocationSuccess(data));
        }).catch(() => {
            dispatch(technicianLocationFailure());
        });
    };
};

export const technicianLocationFailure = () => {
  return {
    type: TECHNICIAN_LOCATION_FAILURE,
  };
};

export const resetTechnicianLocation = () => {
  return {
    type: TECHNICIAN_LOCATION_RESET,
  };
};
