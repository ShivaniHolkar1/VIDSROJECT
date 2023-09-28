

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Search from "../Assets/Search.png";
import Background from "../Assets/Background.png";
import { Card } from "primereact/card";
import { Dialog } from 'primereact/dialog';
import axios from "axios";



const DocumentSearch = () => {
  const [data, setData] = useState([]);
  const [secId, setSecId] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [docView, setDocViewData] = useState();
  const [documentName, setDocumentName] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [isInputActive, setInputActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [createdBy, setLoginUser] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchExecuted, setSearchExecuted] = useState(false);



  useEffect(() => {

    setLoginUser(sessionStorage.getItem('userName'));

  }, []);




  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    setInputActive(value !== '');
 


    axios
      .get(`${process.env.REACT_APP_API_KEY}/sample/getSuggestions/${value}`)
      .then((res) => {
        console.log("All keyword data", res.data);
        setUsers(res.data)
        setSuggestions(res.data);


      });


    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/sample/getStringSuggestion/${value}`); // Replace with the actual URL or path to your JSON data
      const data = response.data;
       setUsers(data)

      // console.log(data.Suggestion,"/?????????")
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);

  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const displayedSuggestions = filteredSuggestions.slice(-4); // Limit the displayed suggestions to 2 keywords

  // const usersSuggestions = users.slice(-5);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,


  }

  const onClick = (name, position) => {
    setSecId(position.secId);
    console.log(position.secId, "/////www")



    dialogFuncMap[`${name}`](true);

    if (position) {


      console.log(position)



      axios
        .get(`${process.env.REACT_APP_API_KEY}/document/getHtmlContains/${position.id}`)
        .then((res) => {
          console.log("All tree-sections", res.data);
          setDocViewData(res.data.data);
          setDocumentName(res.data.docName)
        });




    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }



  // DOWNLOAD
  const downloadFileAtURL = (rowData) => {
    const url = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${rowData.id}/${createdBy}`;
    console.log(rowData, " file to be download");
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };






  //SEARCH SECTION
  

  async function search(key) {
    // console.log( key.target.value,"????")
    // console.log("key:",key);
    // let outputText='';
    // let text;
    // const field=key.target.value;
    // if (field.includes('"')) {
    //   outputText = field.replace(/\\/g, "").replace(/"/g, '');
    //   console.log("output_text:", outputText);
    //   text = `${outputText}`;
    // }
    // else{
    //   outputText=field;
    //   console.log("output_text: without phrase", outputText);
    //   text = `${outputText}`;
    // }
    

    setSuggestions([]);

    
    
    if (key.keyCode===13  && key.target.value.length > 1) {
      let text = key.target.value;
      // console.log("text to search: ",text);
      const encoded = encodeURIComponent(text);
      // console.log(encoded, "????")
     
     
const data={
  value:encoded
}
      fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          console.log(result,"result");
          result.json().then((result) => {
            console.warn("resp", result);

            setData(result);
          setSearchResults(result);
          if(result.length>0){
            setSuggestions([]);
    
            setSearchExecuted(false);
          }else{
            setSearchExecuted(true);
          }
    
          setCustomers(result);
       
          setLoading(false);
          console.log(customer, "/////////////////////////////////////****");
    
          });
          
        })
     


   
    }else{
      console.log("press enter");
      setSearchResults([])
    }
    //
  }



  async function searchOnClick(e,key) {
    console.log(e,"key:",key);


    // console.log("key:",key);
  
    setSuggestions([]);

 

    if (e.type==='click' && key.length> 1) {
      console.log(key,"????????")
      let text = key.target.value;
      console.log("text to search: ",text);
      let encoded = encodeURIComponent(text);
      console.log(encoded, "????")
     
const data={
  value:encoded
}
      fetch(`${process.env.REACT_APP_API_KEY}/sample/getSectionHighlightedValue`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(
        (result) => {
          console.log(result,"result");
          result.json().then((result) => {
            console.warn("resp", result);

            setData(result);
          setSearchResults(result);
          if(result.length>0){
            setSuggestions([]);
    
            setSearchExecuted(false);
          }else{
            setSearchExecuted(true);
          }
    
          setCustomers(result);
       
          setLoading(false);
          console.log(customer, "/////////////////////////////////////****");
    
          });
          
        })
     


   
    }else{
      console.log("press enter");
      setSearchResults([])
    }
    //
  }


  console.log(users, "??????ppppp")



  const customBody = (rowData, column) => {
    return <span dangerouslySetInnerHTML={{ __html: rowData[column.field] }} />;
  };


  const handleClearInput = () => {
    setQuery('');
    setSearchExecuted(false);
  };




  // const secDownload = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Section Download Successfully",
  //     detail: "Section Download",
  //     life: 1000,
  //   });
  // };



  const actionbodyTemplate = (rowData) => {
    console.log(rowData.id, "///docid");


    setSecId(rowData.id);
    
    return (

      < >
        <div style={{ display: "flex" }}>

          <Button
            icon="pi pi-file"

            className="p-button-raised  p-button-text"
            // onMouseDown={() => onClickHeader(rowData)}

            tooltip="View Section"
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            onClick={() => onClick('displayBasic', rowData)}
            style={{
              backgroundColor: "white",
              height: "30px",
              width: "30px",
              color: "#203570",
              marginRight: "10%"
            }}
          />





          <Button
            style={{
              backgroundColor: "white",
              height: "30px",
              width: "30px",
              color: "#203570",
            }}
            icon="pi pi-download"

            onClick={() => {
              downloadFileAtURL(rowData);
            }}
            // onMouseDown={secDownload}
            tooltip="Download "
            tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
            className="p-button-raised  p-button-text"

          />
        </div>
      </>
    );
  };

  const header = () => {
    return (<> {documentName}</>)

  }

  return (

    <div >


      <Button
        style={{ backgroundColor: "white", color: "black", height: "35px" }}
        className="p-button-raised  p-button p-button-secondary p-button-text"
      >
        <img
          style={{ width: "15px", marginRight: "10px", height: "17px" }}
          src={Search}
          alt=" Search "
        />
        <b> Search Document</b>
      </Button>
      <img
        style={{ height: "53px", float: "right" }}
        src={Background}
        alt=" Background "
      />

      <br />
      <br />



      <Card style={{ height: "80vh" }}>
        <Toast ref={toast} />
        <div className="autocomplete">

          <div className="card-container">
         
            <span
              className="p-input-icon-left"
               style={{ marginLeft: "23%", width: "57%" }}
              // className="inputfound"
  >    <div className={`input-container ${isInputActive ? 'Active' : ''}`}>


                <div class="layout-sidebar-filter-content p-input-icon-left p-fluid p-input-icon-right">
                  <i class="pi pi-search"></i>

                  <InputText
                  
                    style={{ borderRadius: "2px",width:"660px"}}
                    type="text"
                    value={query}
                    placeholder='Search...'
                    onChange={handleInputChange}
                    onKeyDown={(e) => search(e)}
                    class="p-inputtext  p-component p-filled" 
                   
                    />


                  <i class="clear-icon pi pi-times"
                    onClick={handleClearInput}
                  ></i>

                </div>





              </div>
            </span>



            {displayedSuggestions.length > 0 && (
              <ul className="suggestions">
                {displayedSuggestions.map((item) => (
                  <li
                    key={item}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(item)}
                  >
                   <span onClick={(e)=>searchOnClick(e,query)}> {item}</span>
                  </li>
                ))}
              </ul>
            )}




          </div>
        </div>

        {/* {searchResults.length === 0 && (
        <p style={{display:"flex", alignItems: "center",justifyContent:"center"}}>No results found.</p>
      )} */}

        {searchExecuted && searchResults.length === 0 && (
          <b className='notfound'>No results found.</b>
        )}
        <br />

        {data.length > 0 ? (
          // <Card>





          <div>
            {/* <b style={{ color: "black" }}>You may also be interested in........</b>
            <br /> */}
            {/* 
{usersSuggestions.map((item) => (
        <Tag style={{ backgroundColor: "#D2D7E2",color:"#2D2D2D"}} className="mr-2" > {item.Suggestion}</Tag>
        ))} */}




            {/* {usersSuggestions.length > 0 && (
              <>
                {usersSuggestions.map((item) => (


                  <Tag style={{ backgroundColor: "#D2D7E2", color: "#2D2D2D" }} className="mr-2" >

                    <div dangerouslySetInnerHTML={{ __html: item }}></div>
                  </Tag>

                ))}
              </>
            )}

            <br /> */}

            <Dialog header={header}
              visible={displayBasic} style={{ width: '80vw' }} onHide={() => onHide('displayBasic')}>
              {/* <>{uploadedDate}</> */}



              {/* <span className="tocview" dangerouslySetInnerHTML={{ __html: docView }} /> */}
              <span style={{whiteSpace:'pre-line'}} className="tocview"  dangerouslySetInnerHTML={{ __html: docView }} />
              {/* <p dangerouslySetInnerHTML={{ __html: docView }}> </p> */}

              {/* <>{docView}</> */}
            </Dialog>

            {/* <br />
           */}


            <DataTable
              value={data}
              paginator
              rowHover
              loading={loading}
              stripedRows
              scrollable
              scrollHeight="70vh"

              paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
              rows={5}
              p-datatable-wrapper
              emptyMessage="No documents found."
          
            >
              <Column field="name"
                style={{
                  maxWidth: "210px",
                  minWidth: "8rem",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                header="Section Name" />

              <Column
                field="content"
                body={customBody}
                header="Description"
              />


              <Column header="Action" body={actionbodyTemplate} />


            </DataTable>

            {/* ) : (
        <div>No documents found after the search.</div>
      )} */}
          </div>





        ) : (

          <>
            {/* <p>No result Found</p> */}
          </>




        )}








      </Card>

    </div>


  );
};

export default DocumentSearch;




