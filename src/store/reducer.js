import * as actionTypes from './actions';

const initialState = {
    temperatures: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD:
            return {
                ...state,
                temperatures: state.temperatures.concat({id: action.weather.id, value: action.weather.temperature, date: new Date()})
            }
        case actionTypes.DELETE:
            const updatedTemperature = state.temperatures.filter(result => result.id !== action.id);
            return {
                ...state,
                temperatures: updatedTemperature
            }
    }
    return state;
};

export default reducer;