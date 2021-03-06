import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';

import DisplayField from '../DisplayField/DisplayField';


const PreferencesIndex = (props) => {
    const { pref, status } = props;
    const isLookingForRoom = status === 'I am looking for a room';
    const shouldIncludeUtilities = pref.shouldIncludeUtilities === 'Yes';
    const utilitiesPriceRange = (
        <div>
            {/* Utilities Price Range */}
            <DisplayField label="Utilities Mininum" value={pref.utilitiesPriceRangeStart}/>
            <DisplayField label="Utilities Maximum" value={pref.utilitiesPriceRangeEnd}/>
        </div>
    );

    return (
        <Grid fluid>
            <Row>
                <h1>Preferences - Summary</h1>
            </Row>

            <Row>
                <h3>When</h3>
                <DisplayField type="date" label="Start Date" value={pref.startDate}/>
                <DisplayField label="Duration" value={pref.duration}/>

                <h3>Cost</h3>
                <DisplayField label={ isLookingForRoom ? "Rent Mininum" : "Rent" } value={pref.rentPriceRangeStart}/>
                { isLookingForRoom ? ( <DisplayField label="Rent Maximum" value={pref.rentPriceRangeEnd}/>) : null }
                <DisplayField label="Should Include Utilities" value={pref.shouldIncludeUtilities}/>
                { (shouldIncludeUtilities) ? utilitiesPriceRange : null }

                <h3>Location</h3>
                <DisplayField label="Travel Time to UPLB" value={pref.travelTimeToUplb}/>
                <DisplayField label="General Location" value={pref.generalLocation}/>
                <DisplayField label="There are nearby restaurants" value={pref.nearbyRestaurants}/>


                <h3>Utilities</h3>
                <DisplayField label="Can do laundry" value={pref.laundry}/>
                <DisplayField label="Can cook" value={pref.cooking}/>
                <h4>Cooking Utilities</h4>
                <DisplayField label="Has gas stove" value={pref.gasStove}/>
                <DisplayField label="Has an electric stove" value={pref.electricStove}/>
                <DisplayField label="Has a microwave" value={pref.microwave}/>
                <DisplayField label="Can bring water kettles" value={pref.waterKettle}/>
                <DisplayField label="Has airconditioning" value={pref.aircon}/>
                <DisplayField label="Internet" value={pref.internet}/>
                <DisplayField label="Internet speed requirement" value={pref.speedRequirement}/>
                <DisplayField label="Can Torrent" value={pref.torrent}/>

                <h3>Lifestyle</h3>
                <DisplayField label="It is okay for my roommate to drink alcohol" value={pref.alcohol}/>
                <DisplayField label="Smoking is okay" value={pref.smokers}/>
                <DisplayField label="My preferred roommate's cleanliness level is" value={pref.cleanliness}/>
                <DisplayField label="It is okay if my roommate is affiliated with an organization" value={pref.org}/>
                <DisplayField label="It is okay for my roommate to bring guests in the room" value={pref.guestsInRoom}/>
                <DisplayField label="There is a study area for guests" value={pref.guestsStudyArea}/>
                <DisplayField label="Studying is best done in the" value={pref.studyTime}/>
                <DisplayField label="Pets are allowed" value={pref.pets}/>

                <h3>Sex</h3>
                <DisplayField label="Sex Preference" value={pref.sex}/>
                <h3>Misc</h3>
                <DisplayField label="Has Curfew" value={pref.curfew}/>
                { (pref.curfew === 'No') ? null : (<DisplayField label="Curfew Time" value={pref.curfewTime}/>) }
            </Row>
        </Grid>
    );
};

export default connect((store) => {
    return {
        status: store.user.status,
        pref: store.preferences
    };
})(PreferencesIndex);
