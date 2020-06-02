import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CHECK_CONDITIONS } from '../../schema';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

export default function ({ setIsComplete, values, setValues, diagnosis, triage }) {

    const [conditions, setConditions] = useState([]);

    const [seriousConditions, setSeriousConditions] = useState([]);

    const [selectedId, setSelectedId] = useState(null);

    const [rows, setRows] = useState([]);

    const { loading, error, data } = useQuery(CHECK_CONDITIONS, {
        variables: {
            id: selectedId
        }
    });

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
    const handleClick = (prop, idx) => {
        const newConditions = [...conditions];
        switch (prop) {
            case 'condition':
                for (let i in newConditions) {
                    if (Number(i) !== idx)
                        newConditions[i].selected = false;
                    else if (newConditions[i].selected == true)
                        newConditions[i].selected = false;
                    else
                        newConditions[i].selected = true;
                }
                break;
            case 'seriousCondition':
                for (let i in newConditions) {
                    newConditions[i].selected = false;
                }
                break;
        }
        setConditions(newConditions);
    }

    return (
        <div className="page-content diagnosis">
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
                            <p className="search">Search on <a href={`https://www.mayoclinic.org/search/search-results?q=${data.checkCondition.name}`} target="_blank">Mayo Clinic</a></p>
                            <div className="table-container" >
                                <TableContainer component={Paper} className="table">
                                    <Table aria-label="simple table">
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow key={row.name}>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="left">{row.value}</TableCell>
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
                <div className="desc">
                    <p className="hint">We recommend: <p className="name">{triage.triage_level ? triage.triage_level : `----`}</p></p>
                    <hr></hr>
                    <p className="hint">Consult with a doctor online at <a href={`https://www.halodoc.com/tanya-dokter`} target="_blank">halodoc</a></p>
                    <p className="hint">Find the nearest <Link to="/map">hospital</Link></p>
                    <br></br>
                    <p className="search">Click on the left hand side for more information</p>
                </div>
            }
            {loading &&
                <div className="desc loading">
                    <div class="lds-heart"><div></div></div>
                </div>
            }
            <div className="list">
                {seriousConditions && seriousConditions.map((condition, idx) => {
                    return (
                        <a key={condition.id} className={`item important ${condition.is_emergency ? 'emergency' : ''}`} onClick={() => { handleClick('seriousCondition', idx) }} >
                            <div className="alert" >
                                <img alt="alert" src={require('../../assets/alert.svg')} />
                            </div>
                            <p className="title">{condition.common_name}</p>
                            {condition.common_name !== condition.name &&
                                <p className="desc">{condition.name}</p>
                            }
                        </a>
                    )
                })}
                {conditions && conditions.map((condition, idx) => {
                    return (
                        <a key={condition.id} className={`item ${condition.selected ? 'selected' : ''}`} onClick={() => { handleClick('condition', idx) }} >
                            {/* <p>{JSON.stringify(conditions)}</p> */}
                            <p className="title">{condition.common_name}</p>
                            {idx < 3 &&
                                <p className="num">{getNum(idx + 1)}</p>
                            }
                            {condition.common_name !== condition.name &&
                                <p className="desc">{condition.name}</p>
                            }
                        </a>
                    )
                })}
            </div>
        </div>
    );
}