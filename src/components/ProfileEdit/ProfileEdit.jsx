import React, { Component } from 'react';
import EditField from '../EditField/EditField';
import _ from 'lodash';
import { userReducerInitialState } from '../../redux/reducers/UserReducer';
import { updateUserProfile, updateArray } from '../../actions/UserActions';
import { Grid, Row, Col, Button } from 'react-bootstrap';


class ProfileEdit extends Component {

    constructor(props) {
        super(props);
        const batchCount = 20;
        const batchLastYear = new Date().getFullYear(); //End year of the batches

        const { user } = this.props;
        const {
            fullName,
            status, // => Dropdown
            cleanliness,
            sex,
            smoker,
            gender,
            course,
            batch,
            birthday,
            contactNumber,
            bio,
            hasOrg,
            nickname,
            email
        } = user;

        this.state = {
            tempUser: {
                fullName,
                nickname,
                status, // => Dropdown
                contactNumber,
                email,
                cleanliness,
                sex,
                smoker,
                gender,
                course,
                batch,
                bio,
                birthday,
                hasOrg
            },
            tempHobbies: [ ...user.hobbies ],
            tempOrganizations: [ ...user.organizations ],
            tempInterests: [ ...user.interests ],

            batchCount,
            batchLastYear,
            yearsOptions: _.times(batchCount, (x) => {
                return `${ x + (batchLastYear - batchCount) + 1 }`;
            }).reverse()
        };
    }


    updateUserProfile() {
        const { dispatch } = this.props;
        let batch = Number(this.state.tempUser.batch); // Convert initial string value to a Number.
        if(isNaN(batch)) {
            batch = null;
        }

        let formData = {
            ...this.state.tempUser,
            batch
        };

        dispatch(updateUserProfile(formData));
    }


    updateArray(keyState, keyBody, e) {
        const { dispatch } = this.props;
        let formData = {};
        formData[keyBody] = [
            ...this.state[keyState]
        ];

        dispatch(updateArray(keyBody)(formData));
    }


    componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        const {
            fullName,
            status, // => Dropdown
            cleanliness,
            sex,
            smoker,
            gender,
            course,
            batch,
            birthday,
            contactNumber,
            bio,
            hasOrg,
            nickname,
            email
        } = user;

        this.setState({
            tempUser: {
                fullName,
                nickname,
                status, // => Dropdown
                contactNumber,
                email,
                cleanliness,
                sex,
                smoker,
                gender,
                course,
                batch,
                bio,
                birthday,
                hasOrg
            },
            tempHobbies: [ ...user.hobbies ],
            tempOrganizations: [ ...user.organizations ],
            tempInterests: [ ...user.interests ]
        });
    }


    handleUserChange(parameter, e) {
        let tempUserCopy = {
            ...this.state.tempUser
        };

        tempUserCopy[parameter] = e.target.value;
        this.setState({
            tempUser: tempUserCopy
        });
    }


    handleArrayChange(parameter, e) {
        let stateCopy = {
            ...this.state
        };

        stateCopy[parameter] = _.uniq([
            ...e.value
        ]);

        this.setState(stateCopy);
    }


    render() {
        if(!this.state.tempUser) {
            return null;
        }

        const marginBottom = {
            marginBottom: 330
        };

        return (
            <Grid style={ marginBottom }>
                <Row>
                    <h1>Edit Profile</h1>
                </Row>
                <Row>
                    <Col xs={8}>
                        <EditField
                            label="Full Name"
                            value={this.state.tempUser.fullName}
                            currentValue={this.props.user.fullName}
                            handler={this.handleUserChange.bind(this, 'fullName')}/>
                        <EditField
                            label="Nickname"
                            value={this.state.tempUser.nickname}
                            currentValue={this.props.user.nickname}
                            handler={this.handleUserChange.bind(this, 'nickname')}/>
                        <EditField 
                            options={{
                                type: 'dropdown',
                                    values: ['I am looking for a room', 'I have a room']
                            }}
                            label="Status"
                            value={this.state.tempUser.status}
                            currentValue={this.props.user.status}
                            handler={this.handleUserChange.bind(this, 'status')}/>
                        <EditField
                            options={{
                                type: 'dropdown',
                                    values: ['Male', 'Female', 'Do not know']
                            }}
                            label="Sex"
                            value={this.state.tempUser.sex}
                            currentValue={this.props.user.sex}
                            handler={this.handleUserChange.bind(this, 'sex')}/>
                        <EditField
                            label="Gender"
                            value={this.state.tempUser.gender}
                            currentValue={this.props.user.gender}
                            handler={this.handleUserChange.bind(this, 'gender')}/>
                        <EditField 
                            options={{
                                type: 'dropdown',
                                    values: ['Yes', 'No', 'Do not care']
                            }}
                            label="Smoker"
                            value={this.state.tempUser.smoker}
                            currentValue={this.props.user.smoker}
                            handler={this.handleUserChange.bind(this, 'smoker')}/>
                        <EditField
                            label="Course"
                            value={this.state.tempUser.course}
                            currentValue={this.props.user.course}
                            handler={this.handleUserChange.bind(this, 'course')}/>
                        <EditField 
                            options={{
                                type: 'dropdown',
                                    values: [ ...this.state.yearsOptions ]
                            }}
                            label="Batch"
                            value={this.state.tempUser.batch}
                            currentValue={this.props.user.batch}
                            handler={this.handleUserChange.bind(this, 'batch')}/>
                        {/* cleanliness - slider */}
                        <EditField
                            label="Cleanliness"
                            value={this.state.tempUser.cleanliness}
                            currentValue={this.props.user.cleanliness}
                            handler={this.handleUserChange.bind(this, 'cleanliness')}/>
                        <EditField
                            label="Contact Number"
                            value={this.state.tempUser.contactNumber}
                            currentValue={this.props.user.contactNumber}
                            handler={this.handleUserChange.bind(this, 'contactNumber')}/>
                        <EditField
                            label="Email"
                            value={this.state.tempUser.email}
                            currentValue={this.props.user.email}
                            handler={this.handleUserChange.bind(this, 'email')}/>
                        <EditField
                            label="Birthday"
                            options={{
                                type: 'date'
                            }}
                            value={this.state.tempUser.birthday}
                            currentValue={this.props.user.birthday}
                            handler={this.handleUserChange.bind(this, 'birthday')}/>
                        <EditField
                            type="text"
                            label="Bio"
                            value={this.state.tempUser.bio}
                            currentValue={this.props.user.bio}
                            handler={this.handleUserChange.bind(this, 'bio')}/>
                        <Row>
                            <Button
                                block
                                bsStyle="primary"
                                bsSize="large"
                                onClick={this.updateUserProfile.bind(this)}>
                                Submit
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col xs={11}>
                        <EditField
                            label="Organizations"
                            value={this.state.tempOrganizations}
                            currentValue={this.props.user.organizations}
                            handler={this.handleArrayChange.bind(this, 'tempOrganizations')}/>
                            <Row>
                                <Button
                                    block
                                    bsStyle="primary"
                                    bsSize="large"
                                    onClick={this.updateArray.bind(this, 'tempOrganizations', 'organizations')}>
                                    Submit
                                </Button>
                            </Row>
                        <EditField
                            label="Hobbies"
                            value={this.state.tempHobbies}
                            currentValue={this.props.user.hobbies}
                            handler={this.handleArrayChange.bind(this, 'tempHobbies')}/>
                            <Row>
                                <Button
                                    block
                                    bsStyle="primary"
                                    bsSize="large"
                                    onClick={this.updateArray.bind(this, 'tempHobbies', 'hobbies')}>
                                    Submit
                                </Button>
                            </Row>
                        <EditField
                            label="Interests"
                            value={this.state.tempInterests}
                            currentValue={this.props.user.interests}
                            handler={this.handleArrayChange.bind(this, 'tempInterests')}/>
                            <Row>
                                <Button
                                    block
                                    bsStyle="primary"
                                    bsSize="large"
                                    onClick={this.updateArray.bind(this, 'tempInterests', 'interests')}>
                                    Submit
                                </Button>
                            </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
};


export default ProfileEdit;

