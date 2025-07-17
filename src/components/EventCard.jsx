import React from 'react';
import styled from 'styled-components';

const EventCard = ({ event, isAdmin, onEdit, onDelete, onClick }) => {
  const { title, date, description } = event || {};
  return (
    <StyledWrapper onClick={onClick}>
      <div className="card">
        <div className="content">
          <div className="date">{date}</div>
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className='flex justify-between gap-2.5'>
        {isAdmin && (new Date(date)>new Date) && (
          <div className="actions">
            <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit && onEdit(e); }}>
              Edit
            </button>
            </div>
          )}
          { isAdmin &&(
            <div className="actions">
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete && onDelete(e); }}>
              Delete
            </button>
          </div>
        )}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-width: 260px;
    min-height: 320px;
    padding: 20px 1px;
    margin: 10px 0;
    text-align: center;
    position: relative;
    cursor: pointer;
    box-shadow: 0 10px 15px -3px rgba(33,150,243,.4),0 4px 6px -4px rgba(33,150,243,.4);
    border-radius: 10px;
    background-color: #6B6ECC;
    background: linear-gradient(45deg, #04051dea 0%, #2b566e 100%);
  }

  .content {
    padding: 20px;
  }

  .content .title {
    color: white;
    font-weight: 800;
    font-size: 30px;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.42);
  }

  .content .description {
    color: rgba(255, 255, 255, 0.6);
    margin-top: 10px;
    font-size: 14px;
  }

  .content .date {
    font-weight: 800;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.64);
    margin-top: 10px;
    font-size: 25px;
    letter-spacing: 1px;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    width: 90%;
    justify-content: center;
  }

  button {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    border: none;
    outline: none;
    color: rgb(255 255 255);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    text-shadow: 0px 4px 18px #2c3442;
  }

  .edit-btn {
    background-color: rgb(33 150 243);
  }

  .edit-btn:hover {
    background-color: rgb(25 118 210);
  }

  .delete-btn {
    background-color: rgb(220 38 38);
  }

  .delete-btn:hover {
    background-color: rgb(185 28 28);
  }
`;

export default EventCard;
