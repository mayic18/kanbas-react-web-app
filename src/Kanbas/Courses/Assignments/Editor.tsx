export default function AssignmentEditor() {
  return (
    <div id="wd-container" className="wd-main-content-offset ">
      <h2>Assignment</h2>
      <div className="row mb-4 me-3">
        <input className="form-control" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px',  marginRight: '30px' }} id="wd-name" value="A1 - ENV + HTML" />
      </div>
      <div className="row">
      </div>

      <div className="form-group row mb-3 me-3" style={{ border: '1px solid #ccc', borderRadius: '8px', whiteSpace: 'nowrap' }}>
        <div className="col-sm-12 col-md-6 col-lg-4" >
        <p>The assignment is <span style={{color: 'red'}}>available online</span></p>
        Submit a link to the landing page of your Web application running on Netlify<br></br><br></br>
        The landing page should include the:<br></br><br></br>
        <li>Your full Name and section </li>
        <li>Links to each of the lab assignments</li>
        <li>Links to each of the Kanbas application</li>
        <li>Links to all relevantsource code repositories</li><br></br>
        The Kanbas application should include a link to navigate back to the landing pages.
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end ">
        <label className="mt-2" htmlFor="wd-points">Points</label>
        </div>
        <div className="col-md-8 ">
        <input className="form-control" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} id="wd-points" value={100} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-group">Assignment Groups</label>
        </div>
        <div className="col-md-8">
          <select className="form-select" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} id="wd-group">
            <option value="Assignment">Assignment</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
        <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-display-grade-as">Display Grade as</label>
        </div>
        <div className="col-md-8">
          <select className="form-select" style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px' }} id="wd-display-grade-asplay">
            <option value="Percentage">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3 text-end me-2">
          <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-submission-type">Submission Type</label>
        </div>
        <div className="col-md-8" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', whiteSpace: 'nowrap' }}>
          <div className="row mb-3">
          <select className="form-select" style={{ borderColor: '#ccc'}} id="wd-submission-type">
            <option value="Online">Online</option>
          </select>
          </div>

          <div className="row mb-3">
            <label className="mt-2 " style={{ whiteSpace: 'nowrap' }}><b>Online Entry Options</b></label>
          </div>

          <div className="row ">
            <div className="col-1">
              <input className="form-check-input mb-4" type="checkbox"  style={{ border: '1px solid #ccc' }} id="wd-text-entry" name="Text Entry" value="Text Entry" />
            </div>
            <div className="col-1">
              <label className=" " style={{ whiteSpace: 'nowrap' }} htmlFor="Text Entry">Text Entry</label>
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <input className="form-check-input mb-4" type="checkbox"  style={{ border: '1px solid #ccc' }} id="wd-website-url" name="Web" value="Web" />
            </div>
            <div className="col-1">
              <label className=" " style={{ whiteSpace: 'nowrap' }} htmlFor="Web">Website URL</label>
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <input className="form-check-input mb-4" type="checkbox"  style={{ border: '1px solid #ccc' }} id="wd-media-recordings" name="media" value="media" />
            </div>
            <div className="col-1">
              <label className=" " style={{ whiteSpace: 'nowrap' }} htmlFor="media">Media Recordomgs</label>
            </div>
          </div>
          
          <div className="row">
            <div className="col-1">
              <input className="form-check-input mb-4" type="checkbox"  style={{ border: '1px solid #ccc' }} id="wd-student-annotation" name="student" value="student" />
            </div>
            <div className="col-1">
              <label className=" " style={{ whiteSpace: 'nowrap' }} htmlFor="student">Student Annotation</label>
            </div>
          </div>

          <div className="row ">
            <div className="col-1">
              <input className="form-check-input mb-4" type="checkbox" style={{ border: '1px solid #ccc' }} id="wd-file-upload" name="file" value="file" />
            </div>
            <div className="col-1">
              <label className=" " style={{ whiteSpace: 'nowrap' }} htmlFor="file">File Uploads</label>
            </div>
          </div>
        </div>

        <div className="row mb-4 mt-4">
          <div className="col-md-3 text-end me-3">
            <label className="mt-2 text-end" style={{ whiteSpace: 'nowrap' }} htmlFor="wd-assign-to">Assign</label>
          </div>
          <div className="col-md-8 mb-3" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '25px', whiteSpace: 'nowrap' }}>
           <div className="row mb-3">
            <label className="mt-2 " style={{ whiteSpace: 'nowrap' }} htmlFor="wd-assign-to"><b>Assign to</b></label>
           </div>

           <div className="row mb-3" style={{ border: '1px solid #ccc', whiteSpace: 'nowrap' }}>
            <input className="form-control " id="wd-assign-to" value="Everyone     X" />
           </div>

           <div className="row">
            <label className="mt-2 " style={{ whiteSpace: 'nowrap' }} htmlFor="wd-assign-to"><b>Due</b></label>
           </div>

           <div className="row mb-3">
             <input className="custom-date-input" type="date" id="wd-due-date" name="due" value="2024-05-13" />
           </div>

           <div className="row">
            <div className="col-md-6">
              <label htmlFor="wd-available-from" >Available from</label>
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-util">Util</label>
            </div>
           </div>

           <div className="row mb-3">
            <div className="col-s-3 col-md-6 col-l-12">
              <input className="custom-date-input" type="date" id="wd-available-from" name="from" value="2024-05-26" />
            </div>
            <div className="col-md-6">
              <input className="custom-date-input" type="date" id="wd-available-until" name="until" value="2024-05-28" />            </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-2">
            <button className="form-control" id="wd-name" >Cancel</button>
            </div>
            <div className="col-md-2">
            <button className="btn btn-danger w-100 mb-2">Save</button>
            </div>
          </div>
          

        </div>
      </div>

      

    </div>
  );
}