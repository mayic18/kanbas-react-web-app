import { Link, useParams, useLocation } from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation(); 
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "People"]; 

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      
      {links.map((link) => {
        const lowerCaseLink = link.toLowerCase();
        const linkPath = `/Kanbas/Courses/${cid}/${lowerCaseLink}`; 
        const isActive = pathname.includes(lowerCaseLink); 
        return (
          <Link
            key={link}
            to={linkPath}
            className={`list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`} 
            id={`wd-course-${lowerCaseLink}-link`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}

