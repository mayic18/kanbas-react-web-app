import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-course col" style={{  width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
                <img src="/images/reactjs.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="wd-dashboard-course col " style={{  width: "300px" }}>
          <div className="card rounded-3 overflow-hidden ">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark "
                to="/Kanbas/Courses/5008/Home">
                <img src="/images/blue.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5008
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                  Data structures, algos, Comp Systems Merged Spring 2024 Boston
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>

          <div className="wd-dashboard-course col" style={{  width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5002/Home">
                <img src="/images/purple.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5002 12130
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                  12130 Discrete Structures SEC 01 Fall 2023 [BOS-2-TR]Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
              </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5005/Home">
                <img src="/images/orange.webp" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5005 39601
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                  Recitation for CS 5004 SEC 33 Spring 2024 [BOS-2-TR]
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
              </div>
          </div>

          <div className="wd-dashboard-course col" style={{  width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5009/Home">
                <img src="/images/blue.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    CS5009 39609
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate ">
                  Recitation for CS 5008 SEC 33 Spring 2024 [BOS-2-TR]
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
              </div>
          </div>

          <div className="wd-dashboard-course col" style={{  width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5200/Home">
                <img src="/images/purple.png" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title ">
                    CS5200
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                  Merged Fall 2024
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
              </div>
          </div>

          <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5610/Home">
                <img src="/images/orange.webp" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title ">
                    CS5610 20593
                  </h5>
                  <p className="wd-dashboard-course-title card-text text-truncate">
                  Web Development SEC 01 Fall 2024 [VTL-2-OL]
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}

