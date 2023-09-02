import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/Profile.css'; // You can create your own CSS file for styling
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from './assets/profile.png';
const Profile = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([""]);


  useEffect(() => {
    // Make a GET request when the component mounts
    axios.get('http://localhost:8000/api/profile', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        console.log(response.data.user)
        setData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const onDelete = (e, data) => {
    e.preventDefault();
    var config = {
      method: 'delete',
    // maxBodyLength: Infinity,
      url: `http://localhost:8000/api/profile-delete/${data}`,
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data);
      if(response.data.status_code === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('Email');
      navigate('/Login')
      }
    })
    .catch(function (error) {
      console.log(error.data);
    });
  }
  return (
    <Container className="profile-container">
    <Row>
      <Col md={4} className="text-center">
        <Image src={image} className="profile-picture" roundedCircle />
      </Col>
      <Col md={8}>
        <h2>{data.name}</h2>
        <p>{data.email}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, justo eu tempus malesuada.</p>
       <div className='button'>
        <Button   key ={data.id} 
                    variant="danger" color="error"
                    className="col-sm col-md-3 col-lg-3 shadow-sm border-1 border rounded-2 border-secondary px-2 mx-3 py-2 d-flex gap-2 align-items-center my-3 justify-content-center"
                    onClick={(e) => onDelete(e, data.id)}>Delete Akun</Button>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Profile;