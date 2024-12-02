import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { RootState } from "../../store";
import { Assignment } from "./types";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector((state: RootState) => state.assignments.assignments);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    course:"",
    description: "",
    points: 0,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (aid && assignments.length > 0) {
      const existingAssignment = assignments.find(
        (assignment) => assignment._id === aid
      ) as Assignment | undefined; 
      
      if (existingAssignment) {
        setFormData({
        _id: existingAssignment._id,
        title: existingAssignment.title || "",
        course: existingAssignment.course,
        description: existingAssignment.description || "",
        points: existingAssignment.points || 0,
        dueDate: existingAssignment.dueDate || "",
        availableFrom: existingAssignment.availableFrom || "",
        availableUntil: existingAssignment.availableUntil || ""}) 
        }
    }
  }, [aid, assignments]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    if (aid) {
      dispatch(updateAssignment(formData));
    } else {
      dispatch(addAssignment({ ...formData, course: cid || "", _id: new Date().getTime().toString() } as Assignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-container" className="wd-main-content-offset">
      <h4>{"New Assignment"}</h4>
      <div className="row mb-4 me-3">
        <input
          className="form-control"
          style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px', marginRight: '30px' }}
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Assignment Name"
        />
      </div>

      <div className="row mb-4 me-3">
        <textarea
          className="form-control"
          style={{ borderColor: '#ccc', borderRadius: '8px', padding: '10px', marginRight: '30px' }}
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Assignment Description"
        />
      </div>

      <div className="row mb-3">
        <label className="col-md-3 text-end" htmlFor="points">Points</label>
        <div className="col-md-8">
          <input
            type="number"
            className="form-control"
            id="points"
            value={formData.points}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="mt-2 text-end" htmlFor="dueDate"><b>Due</b></label>
        <input
          className="custom-date-input"
          type="date"
          id="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="availableFrom">Available from</label>
          <input
            className="custom-date-input"
            type="date"
            id="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="availableUntil">Until</label>
          <input
            className="custom-date-input"
            type="date"
            id="availableUntil"
            value={formData.availableUntil}
            onChange={handleChange}
          />
        </div>

        
        <div className="row mt-3">
        <div className="col-md-8"></div>
        <div className="col-md-2">
          <button onClick={handleCancel} className="btn btn-secondary w-100">Cancel</button>
        </div>
        <div className="col-md-2">
          <button onClick={handleSave} className="btn btn-danger w-100">Save</button>
        </div>
      </div>
      
      </div>
      
      
    </div>
  );
}