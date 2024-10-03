import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className='me-2'style={{ transform: 'scaleX(0.8)', color: 'gray' }}></FaPlus>
      <IoEllipsisVertical className="fs-5 me-2" />
    </div>
);}
