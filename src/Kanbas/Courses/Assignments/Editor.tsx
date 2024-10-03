export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="wd-main-content-offset body">
      <label className="mb-1" htmlFor="wd-name">Assignment Name</label>
      <input className="form-control" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <div className="form-group" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', whiteSpace: 'nowrap' }}>
        The assignment is <span style={{color: 'red'}}>available online</span><br></br><br></br>
        Submit a link to the landing page of your Web application running on Netlify<br></br><br></br>
        The landing page should include the:<br></br><br></br>
        <li>Your full Name and section </li>
        <li>Links to each of the lab assignments</li>
        <li>Links to each of the Kanbas application</li>
        <li>Links to all relevantsource code repositories</li><br></br>
        The Kanbas application should include a link to navigate back to the landing pages.

      </div>
      <br />
      <br></br>
      <table>
        <tr>
          <td align="right" valign="top">
            <label className="form-control" htmlFor="wd-points">Points</label>
          </td>
          <td colSpan={2}>
            <input className="form-control" id="wd-points" value={100} />
          </td>
        </tr><br></br>

        <tr>
          <td align="right" valign="top">
            <label className="form-control" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-group">Assignment Groups</label>
          </td>
          <td colSpan={2}>
            <select className="form-select" id="wd-group">
              <option value="Assignment">Assignment</option>
            </select>
          </td>
        </tr><br></br>

        <tr>
          <td align="right" valign="top">
            <label className="form-control" htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td colSpan={2}>
            <select className="form-select" style={{ width: '100%' }} id="wd-display-grade-asplay">
              <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr><br></br>

        
        <tr>
          <td align="right" valign="top">
            <label className="form-control" htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td colSpan={2}>
            <select className="form-select" id="wd-submission-type">
              <option value="Online">Online</option>
            </select>
          </td>
        </tr><br></br>

        <tr>
          <td></td>
          <td align="left" valign="top">
            <label className="form-control" style={{ whiteSpace: 'nowrap' }}><b>Online Entry Options</b></label>
          </td>
        </tr>

        <tr>
          <td></td>
          <td className="form-check mb-2" >
          
            <input className="form-check-input mb-4" type="checkbox" id="wd-text-entry" name="Text Entry" value="Text Entry" />
            <label className="form-check-label mb-4" htmlFor="Text Entry">Text Entry</label><br />
            <input className="form-check-input mb-4" type="checkbox" id="wd-website-url" name="Web" value="Web" />
            <label className="form-check-label mb-4" htmlFor="Web">Website URL</label><br />
            <input className="form-check-input mb-4" type="checkbox" id="wd-media-recordings" name="media" value="media" />
            <label className="form-check-label mb-4" htmlFor="media">Media Recordomgs</label><br />
            <input className="form-check-input mb-4" type="checkbox" id="wd-student-annotation" name="student" value="student" />
            <label className="form-check-label mb-4" htmlFor="student">Student Annotation</label><br />
            <input className="form-check-input mb-4" type="checkbox" id="wd-file-upload" name="file" value="file" />
            <label className="form-check-label mb-4" htmlFor="file">File Uploads</label><br />
            
          </td>
        </tr><br></br>

        <tr>
          <td  align="right" valign="top">
            <label className="form-control" htmlFor="wd-assign-to">Assign</label>

          </td>
          <td >
            <label className="form-control" htmlFor="wd-assign-to"><b>Assign to</b></label>
          </td>
        </tr>

        <tr>
          <td>
          </td>
          <td align="right" valign="top" colSpan={2}>
            <input className="form-control " id="wd-assign-to" value="Everyone" />
          </td>
        </tr><br></br>

        <tr>
          <td>
          </td>
          <td align="left" valign="top" >
            <label className="form-control" htmlFor="wd-due-date"><b>Due</b></label>
          </td>
        </tr>

        <tr>
          <td>
          </td>
          <td align="left" valign="top" colSpan={2}>
            <input className="custom-date-input" type="date" id="wd-due-date" name="due" value="2024-05-13" />
          </td>
        </tr> <br></br>

        <tr>
          <td>
          </td>
          <td align="left" valign="top" >
            <label htmlFor="wd-available-from" >Available from</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-util">Util</label>
          </td>
        </tr>

        <tr>
          <td>
          </td>
          <input className="custom-date-input" type="date" id="wd-available-from" name="from" value="2024-05-26" />
          <td align="left" valign="top">
            <input className="custom-date-input" type="date" id="wd-available-until" name="until" value="2024-05-28" />
          </td>
        </tr> <br></br>

        <tr>
          <td>
          </td>
          <td>
          </td>
          <td align="left" valign="top" >
          <div className="d-flex justify-content-between">
            <button className="form-control" id="wd-name" >Cancel</button>
            <button className="btn btn-danger w-100 mb-2">Save</button>
          </div>
          </td>
          
        </tr>

      </table>
    </div>
  );
}

/*
/**
      <textarea className="form-control" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} id="wd-description"  rows={10} cols={50}>
        <br></br>
      The assignment is available online Submit a link to the landing page of your Web
      application running on Netlify. The landing page should include the following: Your full Name and
      section Links to each of the lab assignments Link to the Kanbas application Links to all relevant
      source code repositories. The Kanbas application should include a link to navigate back to the landing pages.
      </textarea> 
      
export default function AssignmentEditor() {
return (
  <div id="wd-assignments-editor" className="wd-main-content-offset body">
    <h3 className="mb-1" style={{}}>Assignment Name</h3>
    <form>
      <div className="col-sm-10 mb-4 ">
        <input id="wd-name" className="form-control" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" className="form-control" rows={10} cols={50} style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} >
          The assignment is available online
          Submit a link to the landing page of your Web
          application running on Netlify. The landing page should include the following: Your full Name and
          section Links to each of the lab assignments Link to the Kanbas application Links to all relevant
          source code repositories. The Kanbas application should include a link to navigate back to the landing pages.
        </textarea>
      </div>
      

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row mt-5">
        <div className="col-sm-3 mb-4 text-end pe-3" >
          <label htmlFor="wd-points">Points</label>
        </div>
        <div className="col-sm-5 mb-4">
          <input id="wd-points" className="custom-select" value={100} style={{ textIndent: '10px' }} />
        </div>
      </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-4 text-end pe-3">
          <label style={{ whiteSpace: 'nowrap' }} htmlFor="wd-group">Assignment Groups</label>
        </div>
        <div className="col-sm-5 mb-4" >
        <select id="wd-group" className="custom-select">
          <option value="Assignment" className="custom-select">&nbsp;&nbsp;Assignment</option>
        </select>
        </div>
      </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-4 text-end pe-3">
        <label style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as" className="me-3">Display Grade as</label>
        </div>
        <div className="col-sm-5 mb-4" >
        <select id="wd-display-grade-asplay" className="custom-select">
              <option value="Percentage">&nbsp;&nbsp;Percentage</option>
            </select>
        </div>
      </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-4 text-end pe-3">
        <label style={{ whiteSpace: 'nowrap' }} htmlFor="wd-submission-type" className="me-3">&nbsp;&nbsp;Submission Type</label></div>
        <div className="col-sm-5 mb-4" >
        <select id="wd-submission-type" className="custom-select">
              <option value="Online">Online</option>
            </select>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-4 mb-2 text-end pe-3" style={{ fontSize: '18px' }}>
        <label style={{ whiteSpace: 'nowrap' }}><b>Online Entry Options</b></label></div>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <input className="form-check-input me-2 custom-spacing custom-checkbox" type="checkbox" id="wd-text-entry" name="Text-Entry" value="Text Entry" /></div>
        <div className="col-sm-5 mb-4" >
        <label className="form-check-label" htmlFor="Text-Entry">Text Entry</label><br />
        </div>
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <input className="form-check-input me-2 custom-spacing custom-checkbox" type="checkbox" id="wd-website-url" name="Web" value="Web" />
        </div>
        <div className="col-sm-5 mb-4" >
        <label className="form-check-label" htmlFor="Web">Website URL</label><br />
        </div>
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <input className="form-check-input me-2 custom-spacing custom-checkbox" type="checkbox" id="wd-media-recordings" name="media" value="media" />
        </div>
        <div className="col-sm-5 mb-4" >
        <label className="form-check-label" htmlFor="media">Media Recordomgs</label><br />
        </div>
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <input className="form-check-input me-2 custom-spacing custom-checkbox" type="checkbox" id="wd-student-annotation" name="student" value="student" />
        </div>
        <div className="col-sm-5 mb-4" >
        <label className="form-check-label" htmlFor="student">Student Annotation</label><br />
        </div>
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <input className="form-check-input me-2 custom-spacing custom-checkbox" type="checkbox" id="wd-file-upload" name="file" value="file" />
        </div>
        <div className="col-sm-5 mb-4" >
        <label className="form-check-label" htmlFor="file">File Uploads</label><br />
        </div>  
        </div>        
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        <label style={{ whiteSpace: 'nowrap' }} className="me-3" htmlFor="wd-assign-to">Assign </label>
        </div>
        <div className="col-sm-5 mb-2" style={{ fontSize: '20px' }} >
        <label htmlFor="wd-assign-to"><b>Assign to</b> </label>
        </div>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3">
        </div>
        <div className="col-sm-5 mb-4" >
        <input className="custom-select " id="wd-assign-to" value="Everyone      X" style={{ textIndent: '10px' }} />
        </div>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3" >
        </div>
        <div className="col-sm-5 mb-2" style={{ fontSize: '18px' }}>
        <label className="me-3" htmlFor="wd-due-date"><b>Due</b></label>
        </div>
        </div>
      </div>
      
      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3" >
        </div>
        <div className="col-sm-5 mb-4" style={{ fontSize: '18px' }}>
          <input className="custom-date-input" type="date" id="wd-due-date" name="due" value="2024-05-13" />
        </div>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3" >
        </div>
        <div className="col-sm-5 mb-4 d-flex" style={{ whiteSpace: 'nowrap' }} >
          <label htmlFor="wd-available-from"><b>Available from</b></label>
          <span className="me-4 d-flex"></span> 
          <label htmlFor="wd-available-until"><b>Until</b></label>
        </div>
        </div>


      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-1 mb-2 text-end pe-3"  >
        </div>
        <div className="col-sm-5 mb-4 " style={{ whiteSpace: 'nowrap', width:'48%'}}>
        <input className="custom-date-input" type="date" id="wd-available-from" name="from" value="2024-05-26"  />
        <input className="custom-date-input" type="date" id="wd-available-until" name="until" value="2024-05-28" />
        </div>
        </div>
      </div>

      <div className="container" style={{ paddingRight: '60px' }}>
      <div className="row">
        <div className="col-sm-3 offset-sm-2 mb-2 text-end pe-3"  >
        </div>
        <div className="col-sm-6 mb-4 offset-sm-1" style={{ whiteSpace: 'nowrap', width:'48%'}}>
        <button className="btn btn-primary me-3" id="wd-name" >Cancel</button>
        <button className="btn bg-danger text-white " >Save</button>
 
        </div>
        </div>
      </div>
    </div>
    </form>
  </div>
);
}


 */
