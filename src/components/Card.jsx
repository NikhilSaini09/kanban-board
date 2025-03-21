import React from "react";
import profileImage from "../assets/profile.jpg";
import "./Card.css";
// import UserAvatar from "./UserAvatar";

const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
const priorityIcons = [
    "/assets/No-priority.svg",
    "/assets/Img - Low Priority.svg",
    "/assets/Img - Medium Priority.svg",
    "/assets/Img - High Priority.svg",
    "/assets/SVG - Urgent Priority grey.svg",
];
const profileIcons = [
    "/assets/profileIcons/profile1.svg",
    "/assets/profileIcons/profile2.svg",
    "/assets/profileIcons/profile3.svg",
    "/assets/profileIcons/profile4.svg",
    "/assets/profileIcons/profile5.svg",
];
const statusIcons = {
    "Backlog": "/assets/Backlog.svg",
    "Todo": "/assets/To-do.svg",
    "In progress": "/assets/in-progress.svg",
    "Done": "/assets/Done.svg",
    "Cancelled": "/assets/Cancelled.svg",
};

const getStatusIcon = (status) => statusIcons[status] || profileImage;

const Card = ({ ticket, users, viewState }) => {
    const user = users.find((u) => u.id === ticket.userId);
    const index = parseInt(user.id.split("-")[1], 10) - 1;

    const iconPath = getStatusIcon(ticket.status);

    return (
        <div className="card">
            <div className="card-header">
                <span className="card-id">{ticket.id}</span>
            </div>
            <div className="profile-icon">
                {user && viewState.grouping !== "user" && (
                    <img
                        src={user.avatar || profileIcons[index]}
                        alt={user.name}
                        className="card-avatar"
                    />
                )}
            </div>
            {user && viewState.grouping !== "user" && (
                <div className={`availability-indicator ${user.available ? "available" : "not-available"}`}>
                    {user.available ? "✔" : ""}
                </div>
            )}
            <div className="card-title">
                <div className="card-title2">
                    {viewState.grouping !== "status" && (
                        <img src={iconPath} alt={ticket.status} />
                    )}
                    <p>{ticket.title}</p>
                </div>
            </div>
            <div className="card-footer">
                <div className="card-footer2">
                    {viewState.grouping !== "priority" && (
                        <div className="priority-icon">
                            <img
                                src={priorityIcons[ticket.priority]}
                                alt={priorityLabels[ticket.priority]}
                            />
                        </div>
                    )}
                    {ticket.tag[0] === "Feature Request" && (
                        <div className="card-footer-part">
                            <img src={profileImage} alt=" " />
                            <span>Feature Request</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
        // <div className="card">
        //     <h4>{ticket.title}</h4>
        //     <p>ID: {ticket.id}</p>
        //     {user && <p>User: {user.name}</p>}
        //     {user && <UserAvatar user={user} />}
        //     <p>Priority: {priorityLabels[ticket.priority]}</p>
        //     <p>Status: {ticket.status}</p>
        // </div>
    );
};

export default Card;