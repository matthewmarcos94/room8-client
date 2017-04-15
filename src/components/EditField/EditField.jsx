import React, { PropTypes } from 'react';
import EditList from './EditList/EditList';
import EditString from './EditString';
import EditTextarea from './EditTextarea';
import EditDropdown from './EditDropdown';


const EditField = (props) => {
    const { value, label, handler, text } = props;

    function defineType(value) {
        if(typeof value === 'string') {
            return 'string';
        }
        else if(typeof value === 'number') {
            return 'number';
        }
        else if(value.constructor === Array) {
            return 'array';
        }
        else if(typeof value === 'boolean') {
            return 'boolean';
        }

        return 'DefaultType';
    }

    function displayProperlyByType(value) {

        if((props.options &&
            props.options.type &&
            props.options.type === 'text') ||
            props.type === 'text') {

            return (<EditTextarea { ...props }/>);
        }

        if((props.options &&
            props.options.type &&
            props.options.type === 'dropdown') ||
            props.type === 'dropdown') {

            return (<EditDropdown { ...props }/>);
            // return <div>yeah</div>;
        }

        // Kung walang nakadefine sa taas
        switch(defineType(value)) {
            case 'string': {
                return (<EditString { ...props }/>);
            }

            case 'array': {
                return null;
            }

            case 'number': {
                return null;
            }

            default: {
                return null;
            }
        }
    }

    return displayProperlyByType(value);
};

EditField.propTypes = {
    label: PropTypes.string.isRequired, // What will be shown as label
    value: PropTypes.any.isRequired, // value in state
    currentValue: PropTypes.any.isRequired, // Will not be changed. Only to compare changes.
    handler: PropTypes.func.isRequired, // event handler, must have 2 parameters (event and fieldName to edit)
    type: PropTypes.string,
    options: PropTypes.shape({
        type: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string)
    })
};

EditField.defaultProps = {
    type: null 
    /*
     * text === textarea
     * email === email
     * dropdown === dropdown
     */
};

export default EditField;
