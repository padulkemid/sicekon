import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_CONDITIONS } from '../../schema';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import wordFormatter from '../../helpers/wordFormatter';

export default function ({ diagnosis, triage, setInfoText }) {

    const history = useHistory();

    const [conditions, setConditions] = useState([]);

    const [firstRun, setFirstRun] = useState(true);

    const [seriousConditions, setSeriousConditions] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const [rows, setRows] = useState([]);

    const { loading, error, data } = useQuery(CHECK_CONDITIONS, {
        variables: {
            id: selectedId
        }
    });

    useEffect(() => {
        if (firstRun)
            setInfoText('Click the respective conditions to find out more.');
        else
            setInfoText('');
    }, [firstRun]);

    useEffect(() => {
        if (diagnosis.conditions)
            setConditions([...diagnosis.conditions]);
    }, [diagnosis]);

    useEffect(() => {
        if (triage.serious)
            setSeriousConditions([...triage.serious]);
    }, [triage]);

    useEffect(() => {
        let newSelectedId = null;
        for (let i in conditions)
            if (conditions[i].selected)
                if (conditions[i].id !== selectedId) {
                    newSelectedId = conditions[i].id;
                    setFirstRun(false);
                }
        setSelectedId(newSelectedId);
    }, [conditions]);

    useEffect(() => {
        if (data && data.checkCondition && data.checkCondition.prevalence)
            setRows([
                { name: 'Prevalence', value: data.checkCondition.prevalence },
                { name: 'Acuteness', value: data.checkCondition.acuteness },
                { name: 'Severity', value: data.checkCondition.severity },
            ])
    }, [data]);

    const getNum = (num) => {
        switch (num) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            default:
                return '';
        }
    }
    const handleClick = (prop, idx) => (e) => {
        e.stopPropagation();
        const newConditions = [...conditions];
        switch (prop) {
            case 'condition':
                for (let i in newConditions) {
                    if (Number(i) !== idx)
                        newConditions[i].selected = false;
                    else if (newConditions[i].selected === true)
                        newConditions[i].selected = false;
                    else
                        newConditions[i].selected = true;
                }
                break;
            case 'unfocus':
                for (let i in newConditions) {
                    newConditions[i].selected = false;
                }
                break;
            case 'map':
                history.push('/map');
                break;
            default:
                break;
        }
        setConditions(newConditions);
    }

    return (
        <div className="page-content diagnosis"
            onClick={handleClick('unfocus')}
        >
            {selectedId ?
                <>
                    {data && data.checkCondition &&
                        <div className="desc">
                            <p className="common_name">{data.checkCondition.common_name}</p>
                            {data.checkCondition.common_name !== data.checkCondition.name &&
                                <p className="name">{data.checkCondition.name}</p>
                            }
                            <div className="cat-list">
                                {data.checkCondition.categories && data.checkCondition.categories.map((cat, idx) => {
                                    return (<Chip key={idx} label={cat} color="primary" className="chip" />)
                                })}
                            </div>
                            <p className="search">
                                Search on <a
                                    href={`https://www.mayoclinic.org/search/search-results?q=${data.checkCondition.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer" >
                                    Mayo Clinic
                                </a>
                            </p>
                            <div className="table-container" >
                                <TableContainer component={Paper} className="table">
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {wordFormatter(row.name)}
                                                    </TableCell>
                                                    <TableCell align="left">{wordFormatter(row.value)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            {data.checkCondition.extras && data.checkCondition.extras.hint &&
                                <p className="hint">{`${data.checkCondition.extras.hint}`}</p>
                            }
                        </div>
                    }
                </> :
                <div className="desc" onClick={(e) => { e.stopPropagation() }}>
                    <p className="hint">Triage Level
                        <p className="triage">
                            {triage.triage_level ? wordFormatter(triage.triage_level) : `----`}
                        </p>
                    </p>
                    <hr></hr>
                    <div className="desc-content">
                        <p className="top">
                            Consult with a doctor online at:
                        </p>
                        <div className="link-group">
                            <a
                                href="https://www.halodoc.com/tanya-dokter"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="halodoc">
                                <div className="logo">
                                    <img src={require('../../assets/halodoc.png')} />
                                </div>
                                <p>halodoc</p>
                            </a>
                            <a
                                href="https://www.alodokter.com/landing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="alodokter">
                                <div className="logo">
                                    <img src={require('../../assets/Alodokter.png')} />
                                </div>
                                <p>Alodokter</p>
                            </a>
                            <a
                                href="https://www.practo.com/consult"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="practo">
                                <div className="logo">
                                    <img src={require('../../assets/practo.png')} />
                                </div>
                                <p>practo</p>
                            </a>
                        </div>
                        <div className="seperator">
                            <hr></hr>
                        </div>
                        <div className="seperator">
                            <p>Or</p>
                        </div>
                        <Button onClick={handleClick('map')} className="btn map-btn" variant="outlined" color="primary">
                            <img className="icon" src={require('../../assets/map.svg')} />
                            <p>Find the nearest hospital</p>
                        </Button>
                    </div>
                </div>
            }
            {loading &&
                <div className="desc loading">
                    <div className="lds-heart"><div></div></div>
                </div>
            }
            <div className="list">
                {seriousConditions && seriousConditions.map((condition, idx) => {
                    return (
                        <div key={condition.id} className={`item important ${condition.is_emergency ? 'emergency' : ''}`} onClick={handleClick('unfocus', idx)} >
                            <div className="alert" >
                                <img alt="alert" src={require('../../assets/alert.svg')} />
                            </div>
                            <p className="title">{condition.common_name}</p>
                            {condition.common_name !== condition.name &&
                                <p className="desc">{condition.name}</p>
                            }
                        </div>
                    )
                })}
                {conditions && conditions.map((condition, idx) => {
                    return (
                        <div key={condition.id} className={`item ${condition.selected ? 'selected' : ''}`} onClick={handleClick('condition', idx)} >
                            {/* <p>{JSON.stringify(conditions)}</p> */}
                            <p className="title">{condition.common_name}</p>
                            {idx < 3 &&
                                <p className="num">{getNum(idx + 1)}</p>
                            }
                            {condition.common_name !== condition.name &&
                                <p className="desc">{condition.name}</p>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}