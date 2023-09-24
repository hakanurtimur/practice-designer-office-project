import React from 'react';

function HomePage() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-primary-700 mb-4">Welcome to Designer App</h1>
            <p className="text-lg text-gray-800 max-w-md text-center">
                Designer App is your ultimate solution for efficiently managing design requests from your valued clients.
                Our platform simplifies the workflow as clients submit their design requests, which are then seamlessly
                routed to dedicated account managers. These account managers collaborate closely with our talented designers,
                ensuring that every project receives the utmost attention to detail and creativity.
            </p>
            <p className="text-lg text-gray-800 max-w-md text-center mt-4">
                Upon project completion, account managers have the authority to approve or decline the design work.
                In the case of approval, the finalized design is presented to the client for their consideration. Clients
                have the flexibility to either accept or decline the final design, guaranteeing that every step of the
                creative process aligns precisely with their vision and expectations.
            </p>
            <p className="text-lg text-gray-800 max-w-md text-center mt-4">
                To commence your journey with Designer App's capabilities, kindly proceed to the "Designer App" platform.
            </p>
        </div>
    );
}

export default HomePage;
