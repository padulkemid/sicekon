import React, { useState, useEffect, useCallback, useConstant } from 'react';
import debounce from "lodash.debounce";
import Autosuggest from 'react-autosuggest';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { SEARCH_OBSERVATIONS } from '../../schema';
import '../../styles/Search.scss';

export default function ({ values, addSymptom }) {
    const [searchVal, setSearchVal] = useState('');
    const [searchSymptoms, setSearchSymptoms] = useState([]);
    const [searchDebounced, setSearchDebounced] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [debSearch] = useState({
        fun: debounce((e) => {
            setSearchDebounced(e);
        }, 500)
    });

    const { loading, error, data } = useQuery(SEARCH_OBSERVATIONS, {
        variables: {
            params: {
                "phrase": searchDebounced,
                "sex": values.sex,
                "age": Number(values.age),
                "max_results": 12,
                "type": "symptom"
            }
        }
    });

    useEffect(() => {
        const searchSymptoms = [];
        if (data)
            for (let i in data.searchObservations) {
                data.searchObservations[i].name = data.searchObservations[i].label;
                searchSymptoms.push(data.searchObservations[i]);
            }
        console.log(JSON.stringify(searchSymptoms));
        setSearchSymptoms(searchSymptoms);
    }, [data])

    useEffect(() => {
        debSearch.fun(searchVal);
    }, [searchVal])

    function escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(value.trim());

        if (escapedValue === '') {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');

        return searchSymptoms.filter(language => regex.test(language.name));
    }

    function getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    function renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    const onChange = (event, { newValue, method }) => {
        setSearchVal(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (e, data) => {
        // console.log(data.suggestion);
        addSymptom(data.suggestion);
        setSearchVal('');
    };

    const inputProps = {
        placeholder: "Search for symptoms...",
        value: searchVal,
        onChange
    };

    return (
        <Autosuggest
            suggestions={searchSymptoms}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionSelected={onSuggestionSelected}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps} />
    );
}