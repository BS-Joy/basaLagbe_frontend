export const initialState = {
    title: '',
    description: '',
    division: '',
    district: '',
    area: '',
    flatData: {}
}

export const postAdsReducer = (state, action) => {
    switch(action.type) {
        case 'addTitle' : {
            return {...state, title: action.payload}
        }
        case 'addDescription' : {
            return {...state, description: action.payload}
        }
        case 'addDivision' : {
            return {...state, division: action.payload}
        }
        case 'addDistrict' : {
            return {...state, district: action.payload}
        }
        case 'addArea' : {
            return {...state, area: action.payload}
        }
        case 'addFlatData' : {
            return {...state, flatData: {...state.flatData, ...action.payload}}
        }
    }
}