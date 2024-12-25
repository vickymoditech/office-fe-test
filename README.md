
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Node Version is 18 

---

# Offices Management Page

This project provides a simple **Offices Management** page built with **React**, **React Hook Form**, and **Zod**. It demonstrates how to:

1. **Display a list of Office locations**  
2. **Add a new location**  
3. **Edit an existing location**  
4. **Remove a location**  
5. **Validate form input** in real-time using **Zod** and **React Hook Form**

---

## Key Features

- **Add or Edit Locations**: Users can create new office locations or update existing ones.  
- **Remove Locations**: Users can remove any existing location from the list.  
- **Real-Time Validation**: Utilizes **Zod** and **React Hook Form** for immediate user feedback.  
- **Disabled Submission**: The form’s “Submit” button is disabled if the user hasn’t changed anything or if fields are empty.  
- **Accordions for Display**: Each location is displayed in an accordion, showing location and employee details.

---


## Components

### 1. `OfficesPage`

- **State Management**:
  - `isAddingLocation` – Toggles between showing the “Add” form and the location list.  
  - `isEditingLocation` – Toggles between showing the “Edit” form and the location list.  
  - `locations` – An array of all office locations.  
  - `editLocation` – Stores the location data currently being edited.

- **Key Functions**:
  - **`handleAddOrEditLocation(data)`**:
    - If `isEditingLocation` is `true`, updates the existing location.
    - Otherwise, creates a new location with a unique ID and adds it to `locations`.
  - **`handleRemoveLocation(id)`**: Removes a location by filtering it out from the `locations` array.

- **Conditional Rendering**:
  - If **adding** or **editing**, renders the `AddLocationForm`.  
  - Otherwise, displays a list of `OfficeLocationCard` components.



- **Footer**: A simple footer with author information and a link.

### 2. `AddLocationForm`

- **Form Setup**:
  - Uses **React Hook Form** (`useForm`) in conjunction with **Zod** (`zodResolver`).
  - Default values are pre-populated if `locations` is passed in (for editing).

- **Validation**:
  - `title` – at least 2 characters.  
  - `address` – at least 5 characters.  
  - `employee` fields – each at least 2 characters long, valid email, etc.

- **Functions**:
  - `handleOnChange(e)`:
    - Sets the form value for the changed field.  
    - Clears the error for that specific field.
  - `isFormEmpty()`:
    - Checks if all fields are empty. Used to disable the submit button.
  - `isFormUnchanged()`:
    - Compares current form values to the original `locations` data. If unchanged, the submit button is disabled.

- **UI**:
  - Renders input fields (Title, Address, Employee Name, Position, Email, and Phone).
  - Shows validation errors beneath each field if present.
  - Provides “Cancel” and “Submit” buttons; the latter is disabled until all fields are valid and changed.

### 3. `OfficeLocationCard`

- **Props**:
  - `title`, `address`, `employee` (object containing `name`, `position`, `email`, `phone`).
  - `onEdit` – callback to trigger editing state in `OfficesPage`.  
  - `onRemove` – callback to remove the location.

- **Display**:
  - Wrapped in an **Accordion**:
    - Accordion trigger displays `title` and `address`.  
    - Accordion content displays employee details (`name`, `position`, `email`, `phone`) and “Edit”/“Remove” buttons.

---


## Form Validation Details

- **Zod** schema is defined so each field has strict rules:
  - **Title**: Must be at least 2 characters long.  
  - **Address**: Must be at least 5 characters long.  
  - **Employee Name**: Must be at least 2 characters.  
  - **Position**: Must be at least 2 characters.  
  - **Email**: Must be a valid email format.  
  - **Phone**: Must be at least 10 characters (or your chosen phone validation).  

The form is validated **onChange**, meaning each input is validated immediately as the user types or modifies fields.

---

## License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, or distribute it as you see fit.

---

**Author**:  
[Vicky Modi](https://vickymoditech.github.io/)