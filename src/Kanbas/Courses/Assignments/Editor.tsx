export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label><br /><br />
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description"  rows={10} cols={50}>
        The assignment is available online Submit a link to the landing page of your Web
        application running on Netlify. The landing page should include the following: Your full Name and
        section Links to each of the lab assignments Link to the Kanbas application Links to all relevant
        source code repositories. The Kanbas application should include a link to navigate back to the landing pages.
        </textarea>
        <br />
        <br></br>
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr><br></br>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Groups</label>
            </td>
            <td>
            <select id="wd-group">
              <option value="Assignment">Assignment</option>
            </select>
            </td>
          </tr><br></br>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
            <select id="wd-display-grade-asplay">
              <option value="Percentage">Percentage</option>
            </select>
            </td>
          </tr><br></br>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
            </select>
            </td>
          </tr><br></br>

          <tr>
            <td></td>
            <td align="left" valign="top">
              <label>Online Entry Options</label>
            </td>
          </tr>

          <tr>     
          <td></td> 
            <td>
                <br></br>
              <input type = "checkbox" id= "wd-text-entry" name = "Text Entry" value = "Text Entry"/>
              <label htmlFor="Text Entry">Text Entry</label><br />
              <input type = "checkbox" id= "wd-website-url" name = "Web" value = "Web"/>
              <label htmlFor="Web">Website URL</label><br />
              <input type = "checkbox" id= "wd-media-recordings" name = "media" value = "media"/>
              <label htmlFor="media">Media Recordomgs</label><br />
              <input type = "checkbox" id= "wd-student-annotation" name = "student" value = "student"/>
              <label htmlFor="student">Student Annotation</label><br />
              <input type = "checkbox" id= "wd-file-upload" name = "file" value = "file"/>
              <label htmlFor="file">File Uploads</label><br />
            </td>
          </tr><br></br>

          <tr>
            <td>
            </td>
            <td align="left" valign="top">
              <label htmlFor="wd-assign-to">Assign Assign to</label>
            </td>  
          </tr>

          <tr>
           <td>
           </td>
            <td align="right" valign="top">
              <input id="wd-assign-to" value="Everyone" />
            </td>
           </tr><br></br>

          <tr>
            <td>
           </td>
            <td align="left" valign="top" >
              <label htmlFor="wd-due-date">Due</label>
            </td>
          </tr>

          <tr>
           <td>
           </td>
            <td align="left" valign="top">
            <input type = "date" id= "wd-due-date" name = "due" value = "2024-05-13"/>
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
            <input type = "date" id= "wd-available-from" name = "from" value = "2024-05-26"/>
            <td align="left" valign="top">
            <input type = "date" id= "wd-available-until" name = "until" value = "2024-05-28"/>
            </td>
          </tr> <br></br>

          <tr>
            <td>
            </td>
            <td>
            </td>
            <button id = "wd-name" >Cancel</button><button>Save</button>
          </tr>

        </table>
      </div>
  );}
  