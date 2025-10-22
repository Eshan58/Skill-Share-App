import React from "react";
import { Link } from "react-router";

const Booking = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="name"
                className="input"
                placeholder="Name"
                required
              />
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                required
              />

              <Link>
                <button className="btn btn-neutral mt-4">Login</button>
              </Link>
              <Link to="/" className="btn mt-2 ">
                <button>← Back to Home</button>
              </Link>
              {/* <Link to="/skill">
                <button className="btn btn-neutral mt-4">
                  Back to Details
                </button>
              </Link> */}
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
