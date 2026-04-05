
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { PageHeader } from "@primer/react/drafts";
import { Box, Button } from "@primer/react";
import "../auth/auth.css";



 const Signup = () => {
  console.log("signup");
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [repository, setRepository] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleIssue = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/issue/create", {
        
        tittle:tittle,
        description:description,
        repository:repository,
      
      });
    //   console.log(res);
    res.json(res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("isssue Failed!");
      setLoading(false);
    }
  };

  return (
    
    <div className="login-wrapper">
      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title sx={{color:"white", fontWeight:"bold"}}>Create issues</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
            
          </Box>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Tittle</label>
            <input
              autoComplete="off"
              name="Tittle"
              id="Tittle"
              className="input"
              type="text"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Description</label>
            <input
              autoComplete="off"
              name="Description"
              id="Description"
              className="input"
              type="email"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Repository</label>
            <input
              autoComplete="off"
              name="Repository"
              id="Repository"
              className="input"
              type="Schema.Types.ObjectId"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleIssue}
          >
            {loading ? "Loading..." : "handleIssue"}
          </Button>
        </div>

        
      </div>
    </div>
  );
 };

 export default Signup;