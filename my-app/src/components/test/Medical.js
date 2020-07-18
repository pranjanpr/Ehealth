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
import axios from 'axios'; 
import { Document, Page, pdfjs } from "react-pdf";
import Carousel from 'react-images';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

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

export default function Medical({info_of_patient}) {
  const classes = useStyles();
  const [fetched, setFetched] = useState(false)
  const [titles, setTitles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [filess, setFiless] = useState(null)
  const [shower, setFileShower] = useState(0)
  const [imgshower, setImageShower] = useState(0)
  const [imagesrc, setImageSrc] = useState("")
  const [numPages, setnumpages] = useState(0)
  const [pageNumber, setpagenumber] = useState(1)

  const images = [{ source: imagesrc }]

  const onFileChange = event => {  
    setSelectedFile(event.target.files[0]); 
   };
   
   

  const onFileUpload = () => {     
    try{
    const formData = new FormData(); 
    formData.append( 
      "myFile", 
      selectedFile, 
      selectedFile.name 
    );
    formData.append(
        "for_patient",
        info_of_patient[0].email
        
    );
   console.log(selectedFile); 
   axios.post("http://localhost:8000/upload/", formData)
   .then(res => res)
   .then(res=> console.log(res.data.status))
   .catch(error=>console.error(error)); 
    }
    catch{
      console.log("redo")
    }
};  





  useEffectOnce(() => {
    if(fetched === false)
      getrecords();
  }, [fetched]);







  const getrecords = async () => {
    let url = "http://localhost:8000/get_records/" + info_of_patient[0].email
    const test =  await fetch(url, {
      method: "GET",
      headers: headers,
      cache: "default"
    })
    const testJson = await test.json();
    setTitles(testJson.status)
    setFetched(true);  
  }





  const fileshow = (title) => {
    let type_of_file = title.substring(title.lastIndexOf('.')+1, title.length) || title
    let url = "http://localhost:8000/upload/" + info_of_patient[0].email + "/" + title
    fetch(url,
        {
          method: 'GET',
          headers: headers,
          cache: "default"
        }
        )
        .then(res=>{
                  console.log(res);
                  setFiless(res.url);
                  setImageSrc(res.url)})
        .catch(error => console.log(error))

    if(type_of_file == 'pdf'){
      setFileShower(1)    
      setImageShower(0)
    }
    else
    {
      setFileShower(0)    
      setImageShower(1)
    }
  }




  const onDocumentLoadSuccess = ({numPages}) => {
    setnumpages(numPages);
  }




  const nextPage = () => {
    const currentPageNumber = pageNumber;
    let nextPageNumber;
    if (currentPageNumber + 1 > numPages) {
      nextPageNumber = 1;
    } else {
      nextPageNumber = currentPageNumber + 1;
    }
    setpagenumber(nextPageNumber);
  }
  
  
  return (
    <React.Fragment>
      {fetched && (
       <div> 
        {console.log(titles[0])}
      <Title>Medical Documents</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {titles.map((row, index) => (
            <TableRow key={index}>
              <TableCell onClick = {()=>fileshow(row.title)}>{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Data
        </Link>
      </div>
      <div> 
                <input type="file" onChange={onFileChange} accept=".pdf,.png,.jpg" /> 
                <button onClick={onFileUpload}> 
                  Upload! 
                </button> 
            </div> 
            
      </div>
      )}
      {shower &&
      <div>
      <div onClick={nextPage}>
      
                  <Document file={filess} onLoadSuccess={onDocumentLoadSuccess} noData={<h4>Please select a file</h4>}>
                  <Page pageNumber={pageNumber} />
                  </Document>
                  
                  {filess ? <p>Page {pageNumber} of {numPages}</p> : null}
      </div>
      </div>
}
{imgshower &&
      <Carousel views={images} />
}
    </React.Fragment>
  );
}