import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";


export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex flex-wrap-nowrap text-nowrap justify-content-end">
      <div id="wd-view-progress" className="text-nowrap">
        <button id="wd-view-progress-btn" className="btn btn-lg btn-secondary  me-1 float-end text-black" >
        View Progress</button>
      </div>
      <div id="wd-collapse-all" className="text-nowrap">
        <button id="wd-collapse-all-btn" className="btn btn-secondary btn-lg  me-1 float-end text-black">
        Collapse All</button>
      </div>
      <div className="dropdown d-inline me-1 float-end">
        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
          type="button" data-bs-toggle="dropdown">
          <GreenCheckmark />
          Publish All</button>
        <ul className="dropdown-menu">
          <li>
            <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish all modules and items</a>
          </li>
          <li>
            <a id="wd-publish-modules-only-button" className="dropdown-item" href="#">
              <GreenCheckmark />
              Publish modules only</a>
          </li>
          <li>
            <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href="#">
              <i className="fas fa-ban me-2"></i>
              Unpublish all modules</a>
          </li>
          <li>
            <a id="wd-unpublish-modules-only" className="dropdown-item" href="#">
              <i className="fas fa-ban me-2"></i>
              items and Unpublish modules only</a>
          </li>
        </ul>
       </div>

      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module</button>
    </div>
);}
