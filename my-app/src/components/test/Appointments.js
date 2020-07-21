import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {useEffectOnce} from 'react-use'





function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json"
});

export default function Appointments({info_of_patient, is_patient, handle_User_Calling}) {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false)
  const [appoints, setAppoints] = useState([])
  





  useEffectOnce(() => {
    if(fetched === false)
      getrecords();
  }, [fetched]);






  const getrecords = async () => {
    let url = "";
    if(is_patient == 1)
    url = "http://localhost:8000/appointment/" + info_of_patient[0].email + "/1"

    else
    url = "http://localhost:8000/appointment/" + info_of_patient[0].email + "/0"

    const test =  await fetch(url, {
      method: "GET",
      headers: headers,
      cache: "default"
    })
    const testJson = await test.json();
    console.log(testJson);
    setAppoints(testJson);
    setFetched(true);  
  }




  return (
    <React.Fragment>
      {fetched &&
      <div>
      <Title>Appointments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            {is_patient ?
            <TableCell>Specialist_Email</TableCell> : <TableCell>Patient_Email</TableCell>}
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell align="right">Type of Call</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appoints.map((row, index) => (
            <TableRow key={index} onClick = {()=>handle_User_Calling(row.date, row.specialist_email_id, row.patient_email_id, row.time_start, row.time_end, row.type_of_call)}>
              <TableCell>{row.date}</TableCell>
              {is_patient ?
              <TableCell>{row.specialist_email_id}</TableCell> : <TableCell>{row.patient_email_id}</TableCell>}
              <TableCell>{row.time_start}</TableCell>
              <TableCell>{row.time_end}</TableCell>
              <TableCell align="right">{row.type_of_call}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Appointments
        </Link>
      </div>
    </div>
}
    </React.Fragment>
  );
}