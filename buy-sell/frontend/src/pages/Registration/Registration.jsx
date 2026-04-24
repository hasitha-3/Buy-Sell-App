import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "../../MyContext";

const Registration = () => {
  const navigate = useNavigate();
  const { change_info } = useAppContext();

  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const [EmailAdress, setEmail] = useState("");
  const [age, setage] = useState("");
  const [number, setnumb] = useState("");
  const [password, setpassword] = useState("");

  const notifye = (message) => toast.error(message);
  const notifys = (message) => toast.success(message);

  const CreateAcc = async (e) => {
    e.preventDefault();

    if (!firstname.trim() || !lastname.trim() || !EmailAdress.trim()) {
      notifye("Please fill first name/last name/email");
      return;
    }

    if (!age || isNaN(age) || age <= 0) {
      notifye("Please enter a valid age");
      return;
    }

    if (String(number).length !== 10) {
      notifye("Please check the phone number");
      return;
    }

    if (!password.trim()) {
      notifye("Please enter a password");
      return;
    }

    const userdata = {
      firstname,
      lastname,
      Email: EmailAdress,
      contact_number: number,
      age,
      password,
    };

    try {
      const response = await axios.post("http://localhost:8000/Registration", {
        userdata,
      });

      console.log("Response Status:", response.status);

      if (response.status === 200) {
        notifys("Account created successfully");

        // Store the user info correctly in context
        const userInfo = {
          firstname,
          lastname,
          Email: EmailAdress,
          contact_number: number,
          age,
          userId: response.data.userId, // Getting userId from the response
        };
        
        // Update the info context
        change_info(userInfo);

        // Log the updated info after state change (optional)
        // console.log("Updated user info:", userInfo);

        // Navigate to the profile page
        navigate(`/profile/${response.data.userId}`);
      } else {
        notifye("Account creation failed. User may already exist.");
      }
    } catch (error) {
      console.error("Error sending data:", error);
      notifye("An error occurred while creating the account.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <form className="glass-card w-full max-w-xl p-8 rounded-2xl" onSubmit={CreateAcc}>
        <h1 className="hero-title text-3xl font-bold mb-1">Create Account</h1>
        <p className="text-sm text-slate-600 mb-6">Join the marketplace in less than a minute.</p>

        <div className="grid gap-1 mb-4">
          <p className="text-sm font-semibold">User Name</p>
          <input
            placeholder="First Name"
            type="text"
            className="field"
            value={firstname}
            onChange={(e) => setFirst(e.target.value)}
          />
          <input
            placeholder="Last Name"
            type="text"
            className="field mt-2"
            value={lastname}
            onChange={(e) => setLast(e.target.value)}
          />
        </div>

        <div className="grid gap-1 mb-4">
          <p className="text-sm font-semibold">Email</p>
          <input
            placeholder="Email address"
            type="text"
            className="field"
            value={EmailAdress}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid gap-1 mb-4">
          <p className="text-sm font-semibold">Age</p>
          <input
            className="field"
            type="number"
            min="1"
            value={age}
            onChange={(e) => setage(parseInt(e.target.value, 10) || "")}
          />
        </div>

        <div className="grid gap-1 mb-4">
          <p className="text-sm font-semibold">Contact No.</p>
          <input
            placeholder="Contact No."
            type="number"
            className="field"
            value={number}
            onChange={(e) => setnumb(e.target.value)}
          />
        </div>

        <div className="grid gap-1 mb-4">
          <p className="text-sm font-semibold">Password</p>
          <input
            placeholder="Enter Password"
            type="password"
            className="field"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-primary flex justify-center items-center text-center px-2 my-1 py-2 w-full rounded-xl font-semibold"
        >
          Create Account
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default Registration;
