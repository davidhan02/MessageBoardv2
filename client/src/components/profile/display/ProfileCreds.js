import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const ProfileCreds = ({ experience, education }) => {
  let eduList, expList;
  eduList = expList = (
    <ListGroup.Item className="text-center">None Listed Yet</ListGroup.Item>
  );
  if (experience.length > 0) {
    expList = experience.map(exp => {
      const { _id, company, from, to, title, location, description } = exp;
      return (
        <ListGroup.Item key={_id}>
          <div className="float-right">
            <Link to={`/edit-exp/${_id}`} className="btn btn-outline-info mr-1">
              Edit
            </Link>
            <Link to={`/delete-exp/${_id}`} className="btn btn-outline-danger">
              X
            </Link>
          </div>
          <h4>{company}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{from}</Moment>
            {' - '}
            {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
          </p>
          <p>
            <strong>Position:</strong> {title}
          </p>
          <p>
            <span>
              <strong>Location: </strong> {location || ''}
            </span>
          </p>
          <p>
            <span>
              <strong>Description: </strong> {description || ''}
            </span>
          </p>
        </ListGroup.Item>
      );
    });
  }
  if (education.length > 0) {
    eduList = education.map(edu => {
      const { _id, school, from, to, degree, major, description } = edu;
      return (
        <ListGroup.Item key={_id}>
          <div className="float-right">
            <Link to={`/edit-edu/${_id}`} className="btn btn-outline-info mr-1">
              Edit
            </Link>
            <Link to={`/delete-edu/${_id}`} className="btn btn-outline-danger">
              X
            </Link>
          </div>
          <h4>{school}</h4>
          <p>
            <Moment format="YYYY/MM/DD">{from}</Moment>
            {' - '}
            {to ? <Moment format="YYYY/MM/DD">{to}</Moment> : 'Now'}
          </p>
          <p>
            <strong>Degree:</strong> {degree}
          </p>
          <p>
            <span>
              <strong>Major: </strong> {major || ''}
            </span>
          </p>
          <p>
            <span>
              <strong>Description: </strong> {description || ''}
            </span>
          </p>
        </ListGroup.Item>
      );
    });
  }
  return (
    <Row>
      <Col md={6}>
        <h3 className="text-center text-info">Experience</h3>
        <ListGroup>{expList}</ListGroup>
      </Col>
      <Col md={6}>
        <h3 className="text-center text-info">Education</h3>
        <ListGroup>{eduList}</ListGroup>
      </Col>
    </Row>
  );
};

export default ProfileCreds;
