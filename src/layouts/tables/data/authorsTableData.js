/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Team", accessor: "Team", align: "left" },
      { Header: "Rank", accessor: "Rank", align: "center" },
      { Header: "Reward", accessor: "Reward", align: "center" },
      { Header: "Status", accessor: "Status", align: "center" },
    ],

    rows: [
      {
        Team: <Job description="30/30" />,
        Rank: <Job description="1 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            E-Files
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Active" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Team: <Job description="100/100" />,
        Rank: <Job description="2 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Trainer certifcat
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Achieved" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Team: <Job description="200/200" />,
        Rank: <Job description="3 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            5000
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Upcoming" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Team: <Job description="500/500" />,
        Rank: <Job description="4 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            20000
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Non-Active" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Team: <Job description="1100/1100" />,
        Rank: <Job description="5 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            30000
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Non-Active" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        Team: <Job description="2700/2700" />,
        Rank: <Job description="6 Star" />,
        Reward: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            55000
          </MDTypography>
        ),
        Status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="Non-Active" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
    ],
  };
}
