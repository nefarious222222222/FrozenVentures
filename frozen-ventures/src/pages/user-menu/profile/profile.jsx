import React from "react";
import "../../../assets/styles/profile.css";
import CoverImg from "../../../assets/images/0.jpg";
import UserImg from "../../../assets/images/1.jpg";
import { Camera } from "phosphor-react";
import { easeInOut, motion as m } from "framer-motion";

export const Profile = () => {
  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: easeInOut }}
      className="container profile"
    >
      <div className="header">
        <div className="cover">
          <img src={CoverImg} />

          <div className="change-cover">
            <Camera size={30} />
            <p>Change Cover</p>
          </div>
        </div>

        <div className="user">
          <div className="change-user">
            <img src={UserImg} alt="" />

            <div className="buttons">
              <button>Change</button>
              <button>Delete</button>
            </div>
          </div>

          <div className="name-role">
            <p className="name">Vince Jeremy Canaria</p>
            <p className="role">Customer</p>
          </div>
        </div>
      </div>

      <div className="informations">
        <div className="name">
          <h2>Name:</h2>
          <div className="information">
            <p className="field">First Name</p>
            <p className="field-value">Vince Jeremy</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Last Name</p>
            <p className="field-value">Canaria</p>
            <button>Edit</button>
          </div>
        </div>

        <div className="contacts">
          <h2>Contacts:</h2>
          <div className="information">
            <p className="field">Email</p>
            <p className="field-value">sdnask@gmail.com</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Phone</p>
            <p className="field-value">09123123123</p>
            <button>Edit</button>
          </div>
        </div>

        <div className="other-info">
          <h2>Other Information:</h2>
          <div className="information">
            <p className="field">Birthdate</p>
            <p className="field-value">April 4, 1973</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Gender</p>
            <p className="field-value">Male</p>
            <button>Edit</button>
          </div>
        </div>

        <div className="address">
          <h2>Address:</h2>
          <div className="information">
            <p className="field">Street</p>
            <p className="field-value">#420 Top Street</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Barangay</p>
            <p className="field-value">Radiant</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">City</p>
            <p className="field-value">Dota City</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Province</p>
            <p className="field-value">Valve</p>
            <button>Edit</button>
          </div>

          <div className="information">
            <p className="field">Zip Code</p>
            <p className="field-value">9110</p>
            <button>Edit</button>
          </div>
        </div>
      </div>
    </m.div>
  );
};
