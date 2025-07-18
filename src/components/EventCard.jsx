import React from 'react';
import styled from 'styled-components';

const EventCard = ({ event, isAdmin, onEdit, onDelete, onClick }) => {
  const { title, date, description } = event || {};
  const eventDate = new Date(date);

  return (
    <StyledWrapper onClick={onClick}>
      <div className="card">
        <div className="content">
          <div className="date">{eventDate.toDateString()}</div>
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>

        {isAdmin && (
          <div className="actions">
            {eventDate > new Date() && (
              <button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit?.(e); }}>
                Edit
              </button>
            )}
            <button className="delete-btn" onClick={(e) => { e.stopPropagation(); onDelete?.(e); }}>
              Delete
            </button>
          </div>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 280px;
    min-height: 260px;
    padding: 24px 20px;
    margin: 12px;
    border-radius: 16px;
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    box-shadow: 0 10px 20px rgba(0,0,0,0.25);
    color: white;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 12px 25px rgba(0,0,0,0.3);
    }
  }

  .content {
    flex: 1;
    padding-bottom: 20px;
    text-align: center;
  }

  .title {
    font-size: 28px;
    font-weight: 700;
    margin-top: 10px;
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.6);
  }

  .date {
    font-size: 18px;
    font-weight: 600;
    color: #b0d9ff;
    margin-bottom: 6px;
  }

  .description {
    font-size: 15px;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 10px;
    flex-wrap: wrap;
  }

  button {
    padding: 10px 20px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .edit-btn {
    background-color: #2196f3;
  }

  .edit-btn:hover {
    background-color: #1976d2;
  }

  .delete-btn {
    background-color: #dc2626;
  }

  .delete-btn:hover {
    background-color: #b91c1c;
  }
`;

export default EventCard;
