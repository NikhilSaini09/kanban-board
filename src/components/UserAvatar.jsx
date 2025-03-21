import React from "react";

const profileIcons = [
    "/assets/profileIcons/profile1.svg",
    "/assets/profileIcons/profile2.svg",
    "/assets/profileIcons/profile3.svg",
    "/assets/profileIcons/profile4.svg",
    "/assets/profileIcons/profile5.svg",
];

const UserAvatar = ({ user, index, group, groupedTickets }) => {
    if (!user) return null;

    return (
        <div className="column-header1">
            <div className="column-header2">
                <div className="column-header3">
                    <div className="column-header4">
                        <img
                            src={user.avatar || profileIcons[index]}
                            alt={user.name}
                            className="avatar-image"
                        />
                        <p>{user.name}</p>
                        <p className="no-of-tickets">{groupedTickets[group].length}</p>
                    </div>
                    <div className="column-header4">
                        <img src="/assets/add.svg" alt=" " />
                        <img src="/assets/3 dot menu.svg" alt=" " />
                    </div>
                </div>
            </div>
            
            <div className={`availability-indicator-app ${user.available ? "available" : "not-available"}`}>
                {user.available ? "✔" : ""}
            </div>
        </div>
        // <div className="user-avatar">
        //     <img
        //         src={user.avatar || profileIcons[index]}
        //         alt={user.name}
        //         className="avatar-image"
        //     />
        //     <span className="avatar-name">{user.name}</span>
        // </div>
    );
};

export default UserAvatar;