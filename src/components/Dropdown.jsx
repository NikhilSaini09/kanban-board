import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";

const Dropdown = ({ viewState, setViewState }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleGroupingChange = (e) => {
        setViewState((prevState) => ({ ...prevState, grouping: e.target.value }));
    };

    const handleOrderingChange = (e) => {
        setViewState((prevState) => ({ ...prevState, ordering: e.target.value }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="display-button">
                <img src="assets/Display.svg" alt=" " />
                Display
                <img src="assets/down.svg" alt=" " />
            </button>

            {isOpen && (
                <div className="popup">
                    <label className="label">
                        Group by
                        <select
                            value={viewState.grouping}
                            onChange={handleGroupingChange}
                            className="dropdown2"
                        >
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </label>

                    <label className="label">
                        Order by
                        <select
                            value={viewState.ordering}
                            onChange={handleOrderingChange}
                            className="dropdown2"
                        >
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </label>
                </div>
            )}
        </div>
        // <div className="dropdown">
        //     <label>
        //         Group by:
        //         <select value={viewState.grouping} onChange={handleGroupingChange}>
        //             <option value="status">Status</option>
        //             <option value="user">User</option>
        //             <option value="priority">Priority</option>
        //         </select>
        //     </label>
        //     <label>
        //         Order by:
        //         <select value={viewState.ordering} onChange={handleOrderingChange}>
        //             <option value="priority">Priority</option>
        //             <option value="title">Title</option>
        //         </select>
        //     </label>
        // </div>
        // <div className="dropdown">
        //     <label>
        //         Grouping:
        //         <select onChange={(e) => setGrouping(e.target.value)}>
        //             <option value="status">Status</option>
        //             <option value="user">User</option>
        //             <option value="priority">Priority</option>
        //         </select>
        //     </label>
        //     <label>
        //         Ordering:
        //         <select onChange={(e) => setOrdering(e.target.value)}>
        //             <option value="priority">Priority</option>
        //             <option value="title">Title</option>
        //         </select>
        //     </label>
        // </div>
    );
};

export default Dropdown;