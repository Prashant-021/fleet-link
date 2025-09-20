import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = ({ toHome = false }) => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-end">
            <Button
                type="primary"
                onClick={() => (toHome ? navigate("/") : navigate(-1))}
                style={{ marginBottom: "16px" }}
            >
                Back
            </Button>
        </div>
    );
};

export default BackButton;