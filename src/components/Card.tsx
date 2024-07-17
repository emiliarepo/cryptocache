// components/ui/Card.js
import React from 'react';

const Card = ({ title, description, latitude, longitude, buttonText }: {title: string, description: string, latitude?: string, longitude?: string, buttonText?: string}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
      <div className="border-b pb-2 mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-50">
        <p className="text-gray-500 dark:text-gray-100">{description}</p>
        { latitude && longitude && (
          <p className="mt-2">
            <strong>Coordinates:</strong>
            <p className="font-medium"><strong>Lat.</strong> {latitude}</p>
            <p className="font-medium"><strong>Long.</strong> {longitude}</p>
          </p>
        )}
      </div>
      { buttonText && (
        <div className="mt-4">
          <button className="bg-emerald-500 dark:bg-emerald-700 text-white py-2 px-4 rounded hover:bg-emerald-600">
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
