"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Location } from "@/utils/types";
import { OfficeLocationCard } from "./office-location-card";
import { AddEditLocationForm } from "./add-location-form";

const OfficesPage = () => {
  const [isAddEditLocation, setIsAddEditLocation] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | null>(null);

  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      title: "Headquarters",
      address: "3763 W. Dallas St.",
      employee: {
        name: "Software Tester",
        position: "Software Engineer",
        email: "georgia.young@example.com",
        phone: "(808) 555-0111",
      },
    },
    {
      id: "2",
      title: "Headquarters Mumbai",
      address: "123 W. Dallas St.",
      employee: {
        name: "Software Developer",
        position: "Software Engineer",
        email: "admin@example.com",
        phone: "1234567890",
      },
    },
  ]);

  const handleAddOrEditLocation = (location: Location) => {
    // Check if we are editing an existing location
    if (editLocation) {
      // Edit an existing location
      setLocations((prevLocations) =>
        prevLocations.map((loc) =>
          loc.id === editLocation.id ? { ...loc, ...location } : loc
        )
      );
      // Reset the Edit form
      setEditLocation(null);
    } else {
      // Add a new location
      setLocations([
        ...locations,
        {
          ...location,
          // Generate a unique id, currently using the timestamp
          id: Date.now().toString(),
        },
      ]);
    }
    // Hide the form
    setIsAddEditLocation(false);
  };

  const handleRemoveLocation = (id: string) => {
    // Find the location by id
    const location = locations.find((location) => location.id === id);

    if (location) {
      // Remove the location from the list
      const findIndex = locations.indexOf(location);
      if (findIndex > -1) {
        locations.splice(findIndex, 1);
      }
      setLocations(locations);
    }
  };

  return (
    <div className="max-w-[350px] min-h-screen mx-auto py-16 space-y-6">
      <div className=" items-center">
        <h1 className="text-4xl font-normal text-[#41B9D1] text-center">
          Offices
        </h1>
      </div>

      <Button
        className="w-full bg-[#41B9D1] hover:bg-[#3AA8BE] text-white justify-between shadow-2xl"
        size="lg"
        onClick={() => setIsAddEditLocation(true)}
      >
        Add New Location
        <Plus className="mr-2 h-4 w-4" />
      </Button>

      {isAddEditLocation ? (
        // Show the form to add or edit location
        <AddEditLocationForm
          onSubmit={handleAddOrEditLocation}
          onCancel={() => {
            setIsAddEditLocation(false);
            setEditLocation(null);
          }}
          location={editLocation ? editLocation : undefined}
        />
      ) : (
        <div className="space-y-4">
          {/* Display all the locations */}
          {locations.map((location) => (
            <OfficeLocationCard
              key={location.id}
              location={location}
              onRemove={() => handleRemoveLocation(String(location.id))}
              onEdit={() => {
                setIsAddEditLocation(true);
                setEditLocation(location);
              }}
            />
          ))}
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground pt-8">
        This project was created by Vicky Modi
        <br />
        <Link
          href="https://vickymoditech.github.io/"
          className="text-primary hover:underline"
        >
          vickymoditech.github.io
        </Link>
      </p>
    </div>
  );
};

export default OfficesPage;
