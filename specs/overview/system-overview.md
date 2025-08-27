## CRM System
## Authentication & Security

Login / Logout

* Secure user authentication (email/password, SSO via Azure AD)  
* Password reset & account recovery  
* Support for account lockout after failed attempts

Role-Based Access Control (RBAC)

* Role-Based Access Control (RBAC)  
* Create, edit, and assign roles  
* Define permission sets for modules, actions, and records  
* Role inheritance and hierarchy  
* Restrict data access based on role and ownershipV

Session & Security Management

* Session timeout & auto-logout  
* Multi-factor authentication (MFA)  
* Audit logging for login and data changes

Role Management

* Role creation, editing, and deletion  
* Assign roles to users  
* Define role-based access for modules, records, and actions  
* Hierarchical roles & inheritance

Details requirements:

At the base level we need to have a number of different permissions in the system. We dont want to dive into permissions on the database level, but instead design a generic concept that not only deals with:

1. Relevant entity (company, contact, vessel, course, country) etc  
2. Action (Create,Read,Update,Delete)

But also deals with a "scope".

Reason for the scope is that the permissions/permission-sets used for the CRM-UI should also be reused for other systems that will directly be accessing the new CRM-API. Systems would include:

1. MyAccount  
   1. Authenticated calls where a user is signed in  
   2. Anonymus calls with no user (registration-system)  
2. SmartCon  
   1. Authenticated calls where a user is signed in  
   2. Anonymus calls with no user (registration-system)  
3. NetAxept  
   1. Anonymous calls for storing payment callbacks  
4. (Other similar systems)

For MyAccount/Smartcon we would always require an ApiKey for each request. And we would also implement a new concept where a custom "x-contactnumber-id" header must be added from external systems such as SmartCon and MyAccount, to inform the CRM-API who the logged in user

This means we need to design a number of different policies that can be applied to different controllers in the CRM-API that both deals with:

1. JWT tokens (for direct users of the CRM UI)  
2. ApiKeys (for MyAccount/SmartCon/ShipPI)  
3. ApiKey \+ "x-contactidentifier" header (for MyAccount/SmartCon when the user is logged in)

We then need to map/build a claims-principal based on incoming policies, that we can feed into the business-logic and answer questions such as:

1. Is the claims-user allowed to view all companies?  
2. Is the claims-user allowed to view a specific company?  
3. Is the claims-user allowed to edit a specific company?  
4. Is the claims-user allowed to delete a contact?

So \- in essence map the incoming claims-user to a number of our permissions, either on a "global" scope or on a pr. company scope. The pr. company scope will usually be a single company (company of the requesting contact), but it could also be an "Enterprise updater", where the scope would then be multiple companies

(Permissions here will then be derived from "ContactClassifications" assigned the contact and the "CompanyHierarchy" table that dictates relationships between companies (parent-child)

These same permissions/permission-sets would then also be applied to the modules we are going to build into the CRM UI

## Companies and Contacts Management

### Companies

* Create, view, edit, and deactivate companies  
* Company list view with filters and search  
* Company card for detailed company profile data (name, address, industry, registration info, etc.)  
* Link companies to contacts, fleets, events  
* Track and manage company status code (create, edit, delete predefined status codes and labels)   
* Manage company relationship and hierarchy  
* Metadata of Company:  
  * Registration Number (XXXXXX)  
  * Company Name  
  * Company Name 2  
  * Company Status (fill from master data, example: M0, M1, ...)  
  * Company Type (fill from master data, example: A1, A2, ...)  
  * Address  
  * Post Code  
  * Country/Country Code  
  * Email  
  * Number of Employees (Contacts will be described below)  
* Some screens we need:  
  * Company List View  
    * Purpose:  
      * Show a searchable & filterable list of companies. Clicking a row opens the Company Card.  
      * When will the companies list be shown. Only when search or default list then search or filter?  
      * User Roles with Access:  
        * Admin, Manager, and Staff can view the list, search, and filter.  
    * User Experience & Behavior  
      * Initial View:  
        * Loads with all companies displayed.  
        * Sorted by Registration Number (ascending) by default.     
      * Interactive Sorting:  
        * Each column header clickable.  
    * Small arrow icon shows sort direction.  
    * Multiple sorts allowed (e.g., by Country then Name).  
    * Search & Filter Logic:  
      * Search bar applies across all searchable fields.  
      * Filters refine the dataset in real time.  
      * Search applies only within currently filtered results.  
    * Empty State:  
      * If no results → replace table with: "No results found. Try adjusting your search criteria or filters.”  
    * Loading State:  
      * Show centered spinner overlay on table while fetching data.  
    * Export:  
      * Exports only current filtered dataset.   
      * User selects CSV or Excel.  
  * Company Card  
    * Purpose:  
      * Display and edit full company details in tabs.	  
      * User Roles with Access:  
        * Admin – full create, edit, save, and deactivate rights   
        * Manager – edit rights as per RBAC rules   
        * Staff – view-only unless granted edit permission via RBAC   
    * Tabs & Fields:  
      * General Tab  
        * Registration Number (read-only once created)  
        * Company Status (dropdown: Active, Prospect, Inactive, etc.)  
        * Company Type (dropdown: Member, Non-member, Supplier, etc.)  
        * Member Status Detail (text or predefined dropdown)  
        * Date Created (read-only)  
        * Last Updated (read-only)  
      * Address Tab  
        * Address Name (e.g., Headquarters, Branch Office)  
        * Address Line 1  
        * Address Line 2  
        * Address Line 3  
        * Post Code  
        * Country (dropdown – ISO country list)  
        * Country Code (auto-populated based on country)  
      * Associated Contacts Tab  
        * Contact Name (clickable link to Contact Card)  
        * Role (e.g., CEO, Manager, Sales)  
        * Email  
        * Phone  
        * Add Contact button (opens new contact form linked to company)  
        * Remove Contact action (confirmation required)
      * Contact Tab
        * Purpose: Manage company contacts (employees).  
        * Layout: 
          * Initial View: A searchable list of all contacts linked to the company. 
            * Fields: Contact Name (clickable), Role, Email, Phone. 
          * Actions: 
            * Add Contact: Opens new contact form linked to the company.  
            * Edit Contact: Opens contact detail card in edit mode.  
            * Remove Contact: Requires confirmation dialog.    
          * Contact Detail Card (upon click): 
            * Shows full contact profile (name, role, email, phone, etc.). 
            * Editable according to role permissions. 
      * Fleet Tab
        * Purpose: Manage company vessels (fleet).  
        * Layout: 
          * Initial View: A searchable list of all vessels linked to the company. 
            * Fields: BIMCO Registration Number, IMO Number, BIMCO DWT. 
          * Actions: 
            * Add Vessel: Opens new fleet entry form linked to the company.  
            * Edit Vessel: Opens vessel detail card in edit mode.  
            * Remove Vessel: Requires confirmation dialog.    
      * Organization Tab
        * Purpose: Manage company hierarchy (parent / child companies) with two list
          * Parent Company (if exists)  
          * Child Company (if exists)
        * Actions: Clicking on an item will redirect to the target company’s detail card
      * Membership Tab       
        * Member Start Date 
        * Formation Date 
        * Withdrew On Date 
        * Latest Member Interaction
      * Log Tab
        * Purpose: Provide a historical record of key changes made to the company.          
          * Status Change Log: Records all updates to the company’s status
          * Address Change Log: Records all modifications to company addresses.  
          * Update Log: Captures general edits across company details (e.g., name changes, type updates, contact/fleet edits)
      * Actions  
        * Edit – switch form fields from read-only to editable mode   
        * Save – validate and commit changes to database   
        * Deactivate – mark company as inactive (confirmation dialog required, available to Admin only)  
        * Cancel – revert unsaved changes  
        * Navigate Back – return to Company List View  
      * Behavior & Rules  
        * Tabs should persist in view mode and edit mode  
        * Switching tabs should not discard unsaved changes without confirmation  
        * Validation rules:  
          * Registration Number – required, unique  
          * Company Name – required  
          * Email – must be valid format  
          * Country – required  
        * Status changes trigger an audit log entry (User, Date, Change)
      * User / Staff Story
        * Staff will enter the Companies Module to view and manage companies
          * Within a specific company’s detail card, staff will: Manage contacts (employees) via the Contact Management Tab (Contact has been described below)
          * Manage fleet records (vessels) via the Fleet Management Tab (Fleet has been described below)
        * Each company has its own set of details and sub-tabs, allowing staff to drill down into company-specific operations.


### Contact

* Create, view, edit, and deactivate contacts  
* Contact, Orphaned contact list  
* Associate contacts with companies  
* Manage contact details (phone, email, role, department, etc.)  
* Track communication history (emails, calls, meetings)  
* Bulk import/export contacts  
* Metadata:  
  * Contact number (CompanyRegistrationNumber\_ContactNumber) (XXXXXX\_YYYY)  
  * Contact Name (First \+ Last)  
  * Contact Classification (fill from master data, example: BI-ADM,BIAS BI-ASIA, BI-BD, BI-BS, ...)  
  * Email  
  * Phone  
  * Associated Company (clickable link → Company Card)  
  * Status (Active / Inactive)  
  * Date Created  
  * Last Updated  
* Some screens we need:  
  * Contact List View  
    * Purpose  
      * Show a searchable, filterable list of all contacts. Clicking a row opens the Contact Card.  
    * User Roles with Access  
      * Admin, Manager, Staff → Can view list, search, filter.   
    * Display Fields  
      * Contact number (CompanyRegistrationNumber\_ContactNumber) (XXXXXX\_YYYY)  
    * Contact Name (First \+ Last)  
    * Contact Classification (fill from master data: BI-ADM,BIAS BI-ASIA, BI-BD, BI-BS, ...)  
    * Email  
    * Phone  
    * Associated Company (clickable link → Company Card)  
    * Status (Active / Inactive)  
    * Date Created  
    * Last Updated  
      * User Experience & Behavior  
    * Initial View: Loads with all contacts, sorted alphabetically by Contact number.   
    * Interactive Sorting: Column headers clickable with ascending/descending arrows.   
    * Search & Filter:  
      * Search applies across all searchable fields.  
      * Filters (Role, Status, Company).  
      * Search works within filtered dataset.  
    * Empty State: If no results then show: "No contacts found. Try adjusting your search or filters.”  
    * Loading State: Table overlay with spinner while fetching.   
    * Export: CSV/Excel export of currently filtered list.   
  * Contact Card  
    * Purpose  
      * Display and edit detailed information about a contact.  
    * User Roles with Access  
      * Admin → Create, Edit, Save, Deactivate.   
      * Manager → Edit rights as per RBAC.   
      * Staff → View-only unless granted edit permission.   
    * Display Fields  
      * General Info  
        * Contact Number  
        * First Name  
        * Last Name  
        * Role / Job Title  
        * Email  
        * Phone (Optional)  
        * Status → Dropdown (Active / Inactive).  
      * Company Associations  
        * Primary Company → Dropdown (searchable, auto-suggest from company list).  
        * Secondary Associations (optional) → Multi-select of other companies  
        * Clicking company name → Navigates to Company Card.   
      * Contact classification  
        * A list of code  
          * Code  
          * Description  
          * Date  
    * Notes / History (Optional)  
      * Free-text notes.  
      * Change log / audit trail (read-only).  
    * Actions  
      * Edit → Switches form to editable mode.   
      * Save → Validates fields and commits. Disabled until changes exist.   
      * Deactivate → Sets Status \= Inactive (Admin only, confirmation required).   
      * Cancel → Reverts unsaved changes.   
      * Navigate Back → Returns to Contact List View.  
  * Behavior & Rules  
    * Validation:  
      * First/Last Name → Required.  
        * Email → Required, valid format, unique within same company.  
        * Status → Required.  
      * Audit Log:  
        * Log changes in Status, Role, Company association.  
      * Unsaved Changes Warning: "You have unsaved changes. Do you want to save before leaving?”

## Courses and Events Management

* Create & schedule courses/events with date, time, location, and format (online/offline)  
* Define BIMCO legal entity as part of course creation (e.g., Training course = BIMCO Informatique; DC meeting = BIMCO) 
* Manage event registration & participant tracking 
* Prepare course information and marketing materials (image URL, Zoom link, ICS file, etc. — for Dotdigital templates) 
* Record attendance & generate reports 
* Link participants to contacts and companies (course line) 
* Collect post-event feedback and evaluation forms 
* Retrieve and display revenue data 
* Manage payment processes: ticket types, product codes, payment methods (credit card, invoice), discount codes, seat allocations 
* Facilitate invoice creation from BC product pricing 
* TBC by Kim Steensgaard - change approach to purchasing of seats, and naming of seats either at point of sale or a later date. Will require additional templates for unassigned seats.
* Manage event-related emails and notifications (enrolment confirmations, reminders, follow-ups) via mail queue with action-based and scheduled triggers
* Business Central synchronosation
  * Data Synchronisation 
    * Ensure all company and contact information in CRM is synchronised with Business Central (BC) 
    * Maintain consistency for invoicing processes, fleet totals, and related financial activities 
    * Manage BIMCO Clock information to keep it ready for Business Central integration 
  * Develop webhooks to listen for BC events (payment, registration, invoice, credit notes)
  * Process Readiness
    * Synchronisation workflows to ensure CRM data is “invoice-ready” before transfer to BC 
    * Handle reconciliation between CRM and BC (e.g., mismatched records, failed syncs, retries) 
* Some screens we need:  
  * Courses & Events List View  
    * Purpose  
      * Show a searchable & filterable list of all courses and events. Each row is clickable → opens the Course/Event Detail Card.  
    * User Roles with Access  
      * Admin, Manager, Staff (view access).   
      * Edit rights depend on RBAC.  
    * Display Fields (List Table)  
      * Event/Course ID (read-only, system-generated).  
      * Title (clickable → opens detail card).  
      * Category (Training, Webinar, Conference, Internal, etc.).  
      * Group (15 \+ 15, GM, EVENT, ...)  
      * Start Date – End Date.  
      * Location (City, Country or “Online”).  
      * Status (Upcoming, Ongoing, Completed, Cancelled).  
      * Number of Participants (linked to contacts).  
      * Finance  
  * User Experience (UX) & Behavior  
    * Initial View: Loads all upcoming events/courses first, sorted by Start Date (soonest first).   
    * Interactive Sorting: Columns sortable (Title, Type, Date, Status).  
    * Search & Filter Logic: Works like Company List (search bar \+ filters). Filters:  
      * Type (Course, Event, All).  
      * Date Range.  
      * Status.  
      * Location.  
    * Row Interaction: Clicking a row → opens Course/Event Card.   
    * Empty State: "No courses or events match your criteria.”  
    * Loading State: Spinner overlay while fetching data.   
    * Export: CSV/Excel export of filtered list.

  * Course & Event Detail (Card)  
    * Purpose  
      * Display and edit full details of a course or event in tabbed view.  
    * User Roles with Access  
      * Admin – Full create, edit, save, deactivate rights.   
      * Manager – Edit rights per RBAC rules.   
      * Staff – View-only unless granted edit via RBAC.  
    * Layout  
      * Header Section:  
        * Title  
        * Type (Course/Event)  
        * Status (Upcoming, Ongoing, Completed, Cancelled)  
        * Actions (Edit, Save, Deactivate, Cancel, Navigate Back)  
          * Tabs:  
            * General Info Tab  
              * ID (read-only).  
                * Title (required).  
                * Type (dropdown: Course, Event).  
                * Category (dropdown).  
                * Status (dropdown: Upcoming, Ongoing, Completed, Cancelled).  
                * Date Created (read-only).  
                * Last Updated (read-only).  
              * Schedule Tab  
                * Start Date / End Date.  
                * Time Zone.  
                * Recurrence (One-time / Weekly / Monthly).  
                * Location (dropdown: Online / Physical address).  
              * Content / Program Tab  
                * Agenda / Program (rich text or file upload).  
                * Materials (file upload list).  
                * Description (long text).  
              * Participants Tab  
                * Linked Contacts list:  
                  * Contact Name (clickable → Contact Card).  
                  * Role (Attendee, Instructor, Organizer).  
                  * Email, Phone.  
                * Add Participant button (search contacts).  
                * Remove Participant (confirmation required).  
              * Logistics Tab  
                * Venue details (if physical).  
                * Catering / Facilities (optional).  
                * Costs (optional).

## Search Management

* Quick Search
  * Free-text global search across all modules (companies, contacts, fleets, events, etc.)
  * Designed for fast access to specific records without complex filtering
* Advanced Search (Power Search)
  * Multiple filter options across modules (e.g., status, classification, event type, ownership) 
  * Save search queries for future reuse
  * Search access restricted by user role and permissions
  * Create segment from search list

## Segment Management

* Create segments from selected records from power search (e.g., contacts, companies, event participants)  
* Use segments to trigger actions, such as:
  * Create events from a segment 
  * Create interactions from a segment 
  * Remove records from "On Hold" status 
  * Set records as ready for invoicing
* Manage segment lifecycle, including creation, editing, reusing, and archiving
* Permission-controlled access to segments (e.g., private, team, or global lists)

## Email management

* Dotdigital Integration: 
  * Synchronize and fetch triggered email campaigns from Dotdigital and store in CRM
  * Replicate and display campaigns to CRM for visibility.
  * Setup and edit campain
  * Assign campaigns to relevant areas (MyAccount, SmartCon, Business Central, etc.).
  * Trigger-Based Notifications: Automatically send alerts for key events (e.g., event registration, invoice readiness).
* Mail Queue Management:
  * Store and process scheduled emails in a restricted area. 
  * Handle course registration notifications and enrollment confirmations emails.  (as a log) 
  * Deliver messages directly or via Dotdigital.

## Internal notifications (Inbox)

* Centralized notification inbox for CRM staff  for user or team/group related
* Role & department-based notification management
* System-generated notifications from integrated platforms (e.g., BC, MyAccount, SmartCon)
  * Example: new company membership registration 
  * Example: company updates number of ships 
  * Example: company registers for a course or event 
* CRM application reminders (e.g., pending tasks, follow-ups, expiring contracts, invoices due)
* Notification lifecycle management:  mark as read, assign, snooze, resolve, or archive
* Filtering & prioritization: filter by type, department, or urgency  
* Audit trail: log notification delivery, handling actions, and resolution


## SmartCon Management

* Create SmartCon company / delete / edit
* Manage seats and permissions (company profiles)
* Payment tier
* Prepare a deployment to work with new CRM data
* Authentication process

## Setup

* Centralize configuration of master data and system codes that are used across CRM modules (e.g., Companies, Contacts, Fleets, Events). This ensures consistency and reusability of data values.
* Some screens we need:
  * Country tab
    * Purpose: Manage the list of countries that can be assigned to companies, contacts, fleets, and events.
    * User Roles with Access:
      * Admin → Full CRUD (create, edit, deactivate, audit)  
      * Manager → Add/edit countries, cannot deactivate if in use  
      * Staff → View/search country list only  
    * Layout
      * Country List View (table): 
        * Columns: Country Code, Country Name, Status (Active/Inactive), Last Modified, Modified By  
        * Search & filter by name/code/status
      * Country Form (create/edit): 
        * Fields: 
          * Country Code 
          * Country Name 
          * Status (Active/Inactive) 
        * Features:
          * Validation: No duplicate codes, must follow ISO format 
          * Cannot delete if country is in use → only deactivate 
          * Audit log for create/edit/deactivate actions 
        * Action
          * View country details  
          * Edit country information  
          * Deactivate country (if not in use)  
          * Audit Trail – view history of changes
  * Region tab
    * Purpose: Manage regional groupings of countries (e.g., “Asia-Pacific”, “Northern Europe”), used for reporting, segmentation, and company assignments.
    * User Roles with Access:
      * Admin → Full CRUD (create, edit, deactivate, audit)  
      * Manager → Add/edit regions  
      * Staff → View/search region list only  
      * Layout:
        * Region List View (table): 
          * Columns: 
            * Region Code
            * Region Name
            * Countries Assigned
            * Status
            * Last Modified
            * Modified By          
          * Search & filter by name/code/status 
        * Region Form (create/edit): 
          * Fields: 
            * Region Code (unique short code) 
            * Region Name 
            * Assigned Countries (multi-select from Country List) 
            * Status (Active/Inactive) 
        * Features:
          * Validation: unique region codes, must contain at least 1 country
          * Cannot delete if region is in use by companies → only deactivate 
          * Audit log for all changes
        * Action
          * View region details  
          * Edit region information  
          * Deactivate country (if not in use)  
          * Audit Trail – view history of changes







## Landing page

* Purpose  
  * Provide a central dashboard where users can quickly access key modules (Companies, Contacts, Courses, Events, SmartCon, ShipPI, etc.), view high-level statistics, and manage notifications  
* User Roles with Access  
  * Admin, Manager, Staff → All roles land here after login.   
  * Content & actions within widgets (charts, quick actions, notifications) adapt to RBAC rules  
* Layout Overview  
  * Top Bar (Header)  
    * User profile dropdown (Profile, Settings, Logout).  
  * Side Menu (Navigation)  
    * Main Sections (as expandable dropdowns or main tabs):  
      * Companies  
      * Contacts  
      * Courses & Events  
      * Notifications Management  
      * SmartCon Management  
      * ShipPI Management  
    * Main Content (Dashboard)  
      * Statistics Area (cards & charts):  
      * Total Companies (active/prospect/inactive split).  
      * Total Contacts (active/inactive).  
      * BIMCO Clock  
    * Charts (examples):  
      * Company distribution by country (pie chart).  
      * Contact roles distribution (bar chart).  
      * Event attendance trends (line chart).  
      * Active vs inactive members (donut chart).  
    * Favorites Quick Access  
      * Grid/list of starred Companies/Contacts/Events.  
      * Click → direct to Company/Contact/Event Card.  
    * Recent Activity Feed  
      * Last 10 updates (e.g., “John Doe updated Company ABC”, “New Event added: Safety Training”)  
* User Experience & Behavior  
  * Widgets are modular (can be rearranged by drag-and-drop in future phase).  
  * Each widget has a header with: title, refresh icon, and expand-to-fullscreen option.  
  * Loading state → spinner overlay until data loads  
* Favorites  
  * Each Company/Contact/Event has a ⭐ icon.  
  * Clicking it adds/removes from the Favorites menu.   
  * Favorites appear both in the Side Menu and on Dashboard cards.  
* Search  
  * Search Button in top bar → opens full-page or side panel search interface.   
  * Search panel supports cross-entity search (Companies, Contacts, Events, Courses).   
  * Results show grouped by category, with filters and pagination.  
  * Close button returns to dashboard.  
* Menu Behavior  
  * Side Menu can be collapsible (icons only vs. expanded).   
  * Modules with sub-tabs (e.g., SmartCon, Notifications) → show expandable dropdowns.  
  * RBAC applies → hidden modules/tabs for unauthorized roles.  
* Notifications  
  * Bell icon in header shows unread count.  
  * Clicking → dropdown with recent notifications (type: system, event reminder, action required).  
  * Option to “Mark all as read”.  
  * Link to Notifications Management page.  
* Actions  
  * Navigate to Modules via Side Menu.   
  * Click on Chart → drill-down to relevant module (e.g., pie slice “Germany” → opens filtered Company list).   
  * Mark Favorite → star/unstar from any Company/Contact/Event page.   
  * Export Chart Data → CSV/Excel (for Admin, Manager).   
* Behavior & Rules  
  * Default Landing:  
    * Dashboard loads with role-appropriate charts and widgets.  
    * Charts show last 12 months unless filtered.     
  * Responsive Design:  
    * Desktop → 2–3 column grid layout.  
    * Tablet → 2 columns.  
    * Mobile → stacked single column.  
  * Data Refresh:  
    * Charts auto-refresh every 5 minutes (or manual refresh per widget).  
  * Performance:  
    * Dashboard loads within 3 seconds for normal dataset.  
    * Heavy queries (SmartCon, ShipPI) are async with loading states.

