import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { RootState } from "../../store";
import { createAssignment, updateAssignment as updateAssignmentAPI } from "./client"; 

type Assignment = {
    _id: string;
    course: string;
    title: string;
    description: string;
    points: number;
    availableDate: string;
    dueDate: string;
    availableUntil: string;
  };

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  const assignment = useSelector((state: RootState) =>
    state.assignmentReducer.assignments.find((a : Assignment) => a._id === aid && a.course === cid)
  );

  const [formData, setFormData] = useState({
    _id: aid || new Date().getTime().toString(),
    course: cid || "",
    title: "",
    description: "",
    points: 0,
    availableDate: "",
    dueDate: "",
    availableUntil: "",
  });


  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    }
  }, [assignment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  
  const handleSave = async () => {
    if (assignment) {
      await updateAssignmentAPI(formData);
      dispatch(updateAssignment(formData))
    } else {
      await createAssignment(cid as string, formData);
      dispatch(addAssignment(formData))
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-assignments-editor">
      <h2>{assignment ? "Edit Assignment" : "New Assignment"}</h2>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Assignment Name</label>
        <input
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          readOnly={!isFaculty}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          readOnly={!isFaculty}
        ></textarea>
      </div>

      <div className="row mb-3 align-items-center">
        <label htmlFor="points" className="col-sm-2 form-label text-end">Points</label>
        <div className="col-md-10">
          <input
            id="points"
            type="number"
            value={formData.points}
            onChange={handleChange}
            className="form-control"
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="availableDate" className="col-sm-2 form-label text-end">Available From</label>
        <div className="col-md-4">
          <input
            id="availableDate"
            type="date"
            value={formData.availableDate}
            onChange={handleChange}
            className="form-control"
            readOnly={!isFaculty}
          />
        </div>
        <label htmlFor="dueDate" className="col-sm-2 form-label text-end">Due Date</label>
        <div className="col-md-4">
          <input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-control"
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="availableUntil" className="col-sm-2 form-label text-end">Available Until</label>
        <div className="col-md-4">
          <input
            id="availableUntil"
            type="date"
            value={formData.availableUntil}
            onChange={handleChange}
            className="form-control"
            readOnly={!isFaculty}
          />
        </div>
      </div>

      <div className="text-end">
        {isFaculty && (
            <button onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)} className="btn btn-secondary me-3">Cancel</button>
        )}
        {isFaculty && (
            <button onClick={handleSave} className="btn btn-danger">Save</button>
        )}    
      </div>
    </div>
  );
}