import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { PageHeader } from "@primer/react/drafts";
import { Box, Button } from "@primer/react";

import "../auth/auth.css";
 const Createrepository = () => {
  console.log("signup");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [owner, setOwner] = useState("");
  const [content, setContent] = useState("");
  const [issues, setIssues] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleCreaterepository = async (e) => {
    e.preventDefault();
    

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/repo/create", {
      name:name,
      description:description,
      visibility:visibility,
      owner: owner,
      content:content,
      issues:issues,
        
      });
      console.log(res);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      setCurrentUser(res.data.userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("repository ctreation Failed!");
      setLoading(false);
    }
  };

  return (
    <h>kj</h>,
    <div className="login-wrapper">
      <div className="login-box-wrapper">
        <div className="login-heading">
          <Box sx={{ padding: 1 }}>
            <PageHeader>
              <PageHeader.TitleArea variant="large">
                <PageHeader.Title sx={{color:"white",fontWeight:"bold"}}>Create repository</PageHeader.Title>
              </PageHeader.TitleArea>
            </PageHeader>
            
          </Box>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Name</label>
            <input
              autoComplete="off"
              name="name"
              id="name"
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Description</label>
            <input
              autoComplete="off"
              name="description"
              id="description"
              className="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Visibility</label>
            <input
              autoComplete="off"
              name="Visibility"
              id="Visibility"
              className="input"
              type="boolean"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Owner</label>
            <input
              autoComplete="off"
              name="owner"
              id="owner"
              className="input"
              type="password"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </div>
          <div>
            <label className="label">content</label>
            <input
              autoComplete="off"
              name="content"
              id="content"
              className="input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="label">issues</label>
            <input
              autoComplete="off"
              name="issues"
              id="issues"
              className="input"
              type="text"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            className="login-btn"
            disabled={loading}
            onClick={handleCreaterepository}
          >
            {loading ? "Loading..." : "CreateRepository"}
          </Button>
        </div>

        
      </div>
    </div>
  );
 };

 export default Createrepository;