import React, { useEffect } from "react";
import { connect } from "react-redux";

import MapBoxGL from "../Common/MapBoxGL";
import Spinner from "../Common/Spinner";

import { fetchTechnicianLocation } from '../../store/Actions/technicianLocationAction'

import { Container } from "../../Styles";

const TechnicianLocation = props => {
    const { technicianLocation } = props;
    console.log('technicianLocation', technicianLocation)
    useEffect(() => {
        if(technicianLocation && technicianLocation.data.length != 0) return null
        props.fetchTechnicianLocation({solar_farm_id: 16});
    }, [technicianLocation.data]);

    let renderHTML = [];
    if(technicianLocation.isLoading){
        renderHTML.push(<Spinner />)
    }else{
        renderHTML.push(<MapBoxGL markers={technicianLocation.markers} nearTechnician={technicianLocation.nearTechnician} lng="-115.5985" lat="32.6750" zm="14.59"/>)
    }

    return renderHTML;
}

const mapStateToProps = (state) => {
    return {
        technicianLocation: state.technicianLocation
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        fetchTechnicianLocation: solar_farm_id => dispatch(fetchTechnicianLocation(solar_farm_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicianLocation);