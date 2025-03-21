import React from "react";
import Card from "./Card";
import UserAvatar from "./UserAvatar";

const allStatuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
const priorityLabels = ["No priority", "Low", "Medium", "High", "Urgent"];
const statusIcons = [
    "/assets/Backlog.svg",
    "/assets/To-do.svg",
    "/assets/in-progress.svg",
    "/assets/Done.svg",
    "/assets/Cancelled.svg",
];
const priorityIcons = [
    "/assets/No-priority.svg",
    "/assets/Img - Low Priority.svg",
    "/assets/Img - Medium Priority.svg",
    "/assets/Img - High Priority.svg",
    "/assets/SVG - Urgent Priority colour.svg",
];

const groupTickets = (tickets, grouping, users) => {
    const grouped = {};

    if (grouping === "status") {
        allStatuses.forEach((status) => {
            grouped[status] = [];
        });
    } else if (grouping === "priority") {
        priorityLabels.forEach((_, index) => {
            grouped[index] = [];
        });
    } else if (grouping === "user") {
        users.forEach((user) => {
            grouped[user.name] = [];
        });
    }
    
    tickets.forEach((ticket) => {
        let key;
        if (grouping === "user") {
            const user = users.find((u) => u.id === ticket.userId);
            key = user.name;
        } else if (grouping === "priority") {
            key = ticket.priority;
        } else {
            key = ticket[grouping];
        }
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(ticket);
    });
    return grouped;
};

const sortTickets = (tickets, ordering) => {
    return tickets.sort((a, b) => {
        if (ordering === "priority") return b.priority - a.priority;
        if (ordering === "title") return a.title.localeCompare(b.title);
        return 0;
    });
    // group.sort((a, b) =>
    //     ordering === "priority" ? b.priority - a.priority
    //     : a.title.localeCompare(b.title)
};

const KanbanBoard = ({ tickets, users, viewState }) => {
    const groupedTickets = groupTickets(tickets, viewState.grouping, users);

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map((group, index) => (
                <div key={group} className="kanban-column">
                        {viewState.grouping === "status" && (
                            <div className="column-header3">
                                <div className="column-header4">
                                    <img src={statusIcons[index]} alt=" " />
                                    <span>{group}</span>
                                    <span className="no-of-tickets">{groupedTickets[group].length}</span>
                                </div>
                                <div className="column-header4">
                                    <img src="/assets/add.svg" alt=" " />
                                    <img src="/assets/3 dot menu.svg" alt=" " />
                                </div>
                            </div>
                        )}
                        {viewState.grouping === "user" && (
                            <UserAvatar 
                                user={users.find((u) => u.name === group)}
                                index={index}
                                group={group}
                                groupedTickets={groupedTickets}
                            />
                        )}
                        {viewState.grouping === "priority" && (
                            <div className="column-header3">
                                <div className="column-header4">
                                    <img src={priorityIcons[index]} alt=" " />
                                    <span>{priorityLabels[index]}</span>
                                    <span className="no-of-tickets">{groupedTickets[group].length}</span>
                                </div>
                                <div className="column-header4">
                                    <img src="/assets/add.svg" alt=" " />
                                    <img src="/assets/3 dot menu.svg" alt=" " />
                                </div>
                            </div>
                        )}
                    {sortTickets(groupedTickets[group], viewState.ordering).map((ticket) => (
                        <Card key={ticket.id} ticket={ticket} users={users} viewState={viewState} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;