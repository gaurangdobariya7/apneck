import axios from "axios"; // Import Axios for making HTTP requests
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:3000/contactUs",
        formData
      );

      console.log(response.data); // Log the response from the server
      // Clear the form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      // You can add further actions like showing a success message or redirecting the user
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Handle error scenarios
    }
  };

  return (
    <>
      {/* Your existing JSX code */}
      <div className="contact-message p-5">
        {/* Your existing JSX code */}
        <form onSubmit={handleSubmit}>
          <div className="container-xxl">
            {/* Your existing JSX code */}
            <div className="col-lg-8 col-md-10 col-sm-12 m-auto">
              <div className="card p-5">
                <h2 className="text-center mb-4">Leave Us A message</h2>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label mb-3"
                      >
                        Enter Your Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-12">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Type in your message
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-12 text-center gap-2">
                      <button id="button-link" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
