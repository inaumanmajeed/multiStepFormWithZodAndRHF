# SparkoSol

## Overview
SparkoSol is a React-based application designed to streamline the process of collecting and managing business information. It provides a step-by-step form interface for users to input details about their business, contact information, linked accounts, and operating hours. The application ensures data validation and offers a clean, user-friendly experience.

## Features
- **Multi-Step Form**: A stepper-based form to collect business details in an organized manner.
- **Business Information Management**: Collects and validates business details such as name, company number, VAT number, and address.
- **Contact Details**: Captures primary contact information, including email and phone numbers.
- **Linked Accounts**: Allows users to link external accounts with profile and web address details.
- **Business Hours**: Enables users to set regular and special business hours with time pickers.
- **Data Validation**: Uses Zod for schema-based validation to ensure data integrity.
- **Popup for Submitted Data**: Displays submitted data in a console popup for review.

## Tech Stack
- **Frontend**: React, React Hook Form, Zod
- **Styling**: Tailwind CSS
- **Date & Time Pickers**: `react-time-picker`, `react-datepicker`
- **State Management**: React's `useState` and `useFormContext` from React Hook Form

## Installation and Setup
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/inaumanmajeed/multiStepFormWithZodAndRHF.git
   ```
2. Navigate to the project directory:
   ```bash
   cd sparkoSol
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

## How It Works
1. **Multi-Step Form**: The application uses a stepper component to guide users through four steps:
   - **Step 1**: Business Information
   - **Step 2**: Contact Details
   - **Step 3**: Linked Accounts
   - **Step 4**: Business Hours
2. **Form Validation**: The form uses `react-hook-form` with Zod for schema-based validation. Errors are mapped to specific steps, ensuring users can easily correct mistakes.
3. **Business Hours Management**: Users can toggle business hours for each day, set start and end times, and add special hours for specific dates.
4. **Data Submission**: On form submission, the data is cleaned and displayed in a popup for review. The form resets after submission.

## File Structure
- **`App.js`**: The main application file that manages the stepper, form submission, and popup display.
- **`BusinessHours.js`**: Handles the business hours and special hours functionality, including toggles and time pickers.
- **`schema.js`**: Defines the Zod schema for form validation.
- **`Stepper.js`**: A shared component for navigating between form steps.
- **`commonFunctions.js`**: Contains utility functions like cleaning submitted values.
- **`staticValues.js`**: Maps form fields to specific steps for error handling.

## Procedures
1. **Step 1**: Enter business details such as name, company number, and VAT number.
2. **Step 2**: Provide contact details, including primary contact name, email, and phone number.
3. **Step 3**: Link external accounts by adding profile and web address details.
4. **Step 4**: Configure business hours for each day and add special hours for specific dates.
5. **Submit**: Review the data in a popup and reset the form for new entries.

## Contact
For any inquiries, please contact:
- **Name**: Nauman M.
- **Email**: inaumanmajeed@gmail.com
- **GitHub**: https://github.com/inaumanmajeed