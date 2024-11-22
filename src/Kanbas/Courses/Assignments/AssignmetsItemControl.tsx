import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { useSelector, useDispatch } from "react-redux";
export default function AssignmentsItemControl({ assignmentId, deleteAssignment }: { assignmentId: string; deleteAssignment: (assignmentId: string) => void; }) {

  return (
    <div className="float-end">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}