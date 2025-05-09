import React, { Component } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create a wrapper for functional hooks inside a class component
function GoBackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/dashboard')}  // Navigate to the /dashboard route
      style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
    >
      Go Back to Dashboard
    </button>
  );
}

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error details to console or send to error tracking service
    console.error("Error caught in ErrorBoundary:", error, info);

    // Show toast notification with error message
    toast.error("Something went wrong! Please try again later.");
    
    // Store error message (optional)
    this.setState({ errorMessage: error.message || "An unexpected error occurred." });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error is caught
      return (
        <div style={{ padding: "20px", backgroundColor: "#f8d7da", color: "#721c24", border: "1px solid #f5c6cb" }}>
          <h2>Oops! Something went wrong.</h2>
          <p>{this.state.errorMessage || "We're sorry for the inconvenience. Please try again later."}</p>
          
          {/* Display Go Back button */}
          <GoBackButton />
        </div>
      );
    }

    // If no error, render the children components
    return this.props.children;
  }
}

export default ErrorBoundary;
