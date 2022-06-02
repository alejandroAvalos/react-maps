import { initialState } from "../Constants/InitialState";
import { TECHNICIAN_LOCATION_REQUEST, TECHNICIAN_LOCATION_SUCCESS, TECHNICIAN_LOCATION_FAILURE, TECHNICIAN_LOCATION_RESET } from "../Constants/Constants";
import { distanceTwoPoints } from '../../Utilities/functions'

const technicianLocationReducer = (state = initialState.technicianLocation, action) => {
    switch(action.type){
        case TECHNICIAN_LOCATION_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        break;
        case TECHNICIAN_LOCATION_SUCCESS:
            const technicianLocation = proccessMapMarkers(action.payload);
            const nearTechnician = proccessDistCoordinates(technicianLocation.coordinates);
            return{
                ...state,
                data: action.payload,
                markers: technicianLocation.markers,
                coordinates: technicianLocation.coordinates,
                nearTechnician: nearTechnician,
                isLoading: false
            }
        break;
        case TECHNICIAN_LOCATION_FAILURE:
            return{
                ...state,
                error: 'Failure: Fetch Technician Location',
                isLoading: false,
                data: [],
                markers: [],
                coordinates: [],
                nearTechnician: [],
            }
        break;
        case TECHNICIAN_LOCATION_RESET:
            return{
                ...state,
                data: [],
                markers: [],
                coordinates: [],
                nearTechnician: [],
                isLoading: false
            }
        break;
        default:
            return {
                ...state
            }
    }
}

const proccessMapMarkers = (data) => {
    if(data && data.length === 0) return []
    const markers = []
    const coordinates = []
    data.map(location => {
        if(!location.features) return null;
        markers.push(...location.features);
        let coordinatesByGroup = [];
        location.features.forEach(feature => {
            coordinatesByGroup.push({
                name: feature.properties.name,
                lng:feature.geometry.coordinates[0],
                lat: feature.geometry.coordinates[1]
            })
        })
        coordinates.push(coordinatesByGroup)
    })
    return {markers, coordinates};
}

const proccessDistCoordinates = (data) => {
    if(data && data.length === 0) return []
    let nearTechnician = [];
    data.forEach(coordinates => {
        coordinates.forEach((coordinate, index) => {
            if(coordinates[index] && coordinates[index + 1]){
                const distance = distanceTwoPoints(coordinates[index].lat, coordinates[index].lng, coordinates[index + 1].lat, coordinates[index + 1].lng)
                if(0.3048 > distance){
                    nearTechnician.push({
                        from: coordinates[index].name,
                        to: coordinates[index + 1].name,
                        distance: distance
                    })
                }
            }
        })
    })
    return nearTechnician;
}

export default technicianLocationReducer;